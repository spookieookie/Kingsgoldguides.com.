import { HubPage, hubMetadata } from '@/components/hub/HubPage';

export const metadata = hubMetadata('farming');

export default function FarmingHubPage() {
  return <HubPage hubKey="farming" />;
}
