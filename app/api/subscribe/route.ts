import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { email, source } = body;

    // Validate email
    if (!email || !email.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)) {
      return NextResponse.json(
        { error: 'Invalid email address' },
        { status: 400 }
      );
    }

    // Check if Kit API is configured
    if (!process.env.KIT_API_KEY || !process.env.KIT_FORM_ID) {
      // In demo mode without Kit, just return success
      console.log('[v0] Email subscription (demo mode):', { email, source });
      return NextResponse.json({
        success: true,
        message: 'Subscription request received (demo mode)',
      });
    }

    // Send to Kit
    const formId = process.env.KIT_FORM_ID;
    const response = await fetch(
      `https://api.kit.com/forms/${formId}/subscriptions`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email,
          fields: {
            subscription_source: source || 'website',
          },
        }),
      }
    );

    if (!response.ok) {
      console.error('[v0] Kit subscription error:', response.statusText);
      return NextResponse.json(
        { error: 'Subscription failed' },
        { status: response.status }
      );
    }

    return NextResponse.json({
      success: true,
      message: 'Successfully subscribed to newsletter',
    });
  } catch (error) {
    console.error('[v0] Subscribe route error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
