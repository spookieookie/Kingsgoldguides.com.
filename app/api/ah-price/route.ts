import { NextRequest, NextResponse } from 'next/server';

interface BlizzardAccessToken {
  access_token: string;
  token_type: string;
  expires_in: number;
}

interface BlizzardPrice {
  lastModified: number;
  quantity: number;
  unitPrice: number;
}

interface AHResponse {
  realm: string;
  lastModified: number;
  commodities: BlizzardPrice[];
}

export const revalidate = 43200; // 12 hours

async function getBlizzardAccessToken(): Promise<string | null> {
  if (!process.env.BLIZZARD_CLIENT_ID || !process.env.BLIZZARD_CLIENT_SECRET) {
    return null;
  }

  try {
    const clientId = process.env.BLIZZARD_CLIENT_ID;
    const clientSecret = process.env.BLIZZARD_CLIENT_SECRET;
    const credentials = Buffer.from(`${clientId}:${clientSecret}`).toString(
      'base64'
    );

    const response = await fetch(
      'https://us.battle.net/oauth/token',
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
          Authorization: `Basic ${credentials}`,
        },
        body: 'grant_type=client_credentials',
      }
    );

    if (!response.ok) {
      console.error('[v0] Blizzard token error:', response.statusText);
      return null;
    }

    const data = (await response.json()) as BlizzardAccessToken;
    return data.access_token;
  } catch (error) {
    console.error('[v0] Blizzard token error:', error);
    return null;
  }
}

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const itemId = searchParams.get('itemId');
    const region = process.env.BLIZZARD_REGION || 'us';

    if (!itemId) {
      return NextResponse.json(
        { error: 'itemId parameter required' },
        { status: 400 }
      );
    }

    // Check if Blizzard API is configured
    if (!process.env.BLIZZARD_CLIENT_ID) {
      return NextResponse.json(
        {
          success: false,
          message: 'Blizzard API not configured',
          price: null,
          demo: true,
        },
        { status: 200, headers: { 'Cache-Control': 'max-age=43200' } }
      );
    }

    // Get access token
    const accessToken = await getBlizzardAccessToken();
    if (!accessToken) {
      return NextResponse.json(
        { error: 'Failed to authenticate with Blizzard API' },
        { status: 503 }
      );
    }

    // Get commodity price
    const priceUrl = `https://${region}.api.blizzard.com/data/wow/search/auctionhouse/commodities?namespace=dynamic-${region}&criteria=itemId:${itemId}&locale=en_US&access_token=${accessToken}`;

    const priceResponse = await fetch(priceUrl);
    if (!priceResponse.ok) {
      return NextResponse.json(
        { error: 'Failed to fetch commodity price' },
        { status: 503 }
      );
    }

    const priceData = (await priceResponse.json()) as AHResponse;

    if (!priceData.commodities || priceData.commodities.length === 0) {
      return NextResponse.json(
        { price: null, message: 'No price data available' },
        { status: 200, headers: { 'Cache-Control': 'max-age=43200' } }
      );
    }

    const avgPrice = priceData.commodities[0].unitPrice / 10000; // Convert to gold

    return NextResponse.json(
      {
        itemId,
        price: avgPrice,
        lastModified: priceData.lastModified,
        region,
      },
      { status: 200, headers: { 'Cache-Control': 'max-age=43200' } }
    );
  } catch (error) {
    console.error('[v0] AH price error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
