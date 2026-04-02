'use client';

import { useEffect } from 'react';

interface AdBannerProps {
  adSlot: string;
  adFormat?: string;
  fullWidthResponsive?: boolean;
}

export default function AdBanner({
  adSlot,
  adFormat = 'auto',
  fullWidthResponsive = true,
}: AdBannerProps) {
  useEffect(() => {
    try {
      (window as any).adsbygoogle = (window as any).adsbygoogle || [];
      (window as any).adsbygoogle.push({});
    } catch (e) {
      console.error('AdSense error:', e);
    }
  }, []);

  return (
    <ins
      className="adsbygoogle"
      style={{ display: 'block' }}
      data-ad-client="ca-pub-7966243121986483"
      data-ad-slot={adSlot}
      data-ad-format={adFormat}
      data-full-width-responsive={fullWidthResponsive.toString()}
    />
  );
}
