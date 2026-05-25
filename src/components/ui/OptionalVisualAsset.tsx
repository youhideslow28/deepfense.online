import { useState } from 'react';

interface OptionalVisualAssetProps {
  src: string;
  alt: string;
  className?: string;
  imgClassName?: string;
}

export default function OptionalVisualAsset({
  src,
  alt,
  className = '',
  imgClassName = '',
}: OptionalVisualAssetProps) {
  const [failed, setFailed] = useState(false);

  if (failed) return null;

  return (
    <div className={className}>
      <img
        src={src}
        alt={alt}
        loading="lazy"
        decoding="async"
        onError={() => setFailed(true)}
        className={imgClassName}
      />
    </div>
  );
}
