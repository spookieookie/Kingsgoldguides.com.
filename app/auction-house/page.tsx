import { HubPage, hubMetadata } from '@/components/hub/HubPage';

export const metadata = hubMetadata('auction-house');

export default function AuctionHouseHubPage() {
  return <HubPage hubKey="auction-house" />;
}
