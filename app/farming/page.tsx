import { permanentRedirect } from 'next/navigation';

export default function LegacyPage() {
  permanentRedirect('/guides#farming');
}
