import Image from 'next/image';

interface RouteMapImageProps {
  src: string;
  alt: string;
  zone: string;
}

export function RouteMapImage({ src, alt, zone }: RouteMapImageProps) {
  return (
    <div className="mb-8">
      <h3 className="text-2xl font-bold text-foreground mb-4">Route Map: {zone}</h3>
      <div className="relative w-full h-96 bg-secondary rounded-lg overflow-hidden">
        <Image
          src={src}
          alt={alt}
          fill
          className="object-cover"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 90vw, 1000px"
        />
      </div>
    </div>
  );
}
