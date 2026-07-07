import { Download } from 'lucide-react';

interface DownloadCardProps {
  href: string;
  fileName: string;
  description: string;
}

export function DownloadCard({
  href,
  fileName,
  description,
}: DownloadCardProps) {
  return (
    <a
      href={href}
      download
      className="flex items-center gap-4 p-4 bg-secondary border border-border rounded-lg hover:bg-secondary/80 hover:border-primary transition-all group cursor-pointer"
    >
      <div className="flex-shrink-0 p-3 bg-primary rounded-lg group-hover:scale-110 transition-transform">
        <Download size={24} className="text-background" />
      </div>
      <div className="flex-1">
        <p className="font-semibold text-foreground">{fileName}</p>
        <p className="text-sm text-muted-foreground">{description}</p>
      </div>
    </a>
  );
}
