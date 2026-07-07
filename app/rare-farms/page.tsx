import { HubPage, hubMetadata } from '@/components/hub/HubPage';

export const metadata = hubMetadata('rare-farms');

export default function RareFarmsHubPage() {
  return <HubPage hubKey="rare-farms" />;
}
