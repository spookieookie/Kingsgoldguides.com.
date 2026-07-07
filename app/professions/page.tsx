import { HubPage, hubMetadata } from '@/components/hub/HubPage';

export const metadata = hubMetadata('professions');

export default function ProfessionsHubPage() {
  return <HubPage hubKey="professions" />;
}
