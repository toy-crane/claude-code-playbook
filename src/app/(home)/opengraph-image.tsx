import { ImageResponse } from 'next/og';
import { loadOGFonts } from '@/lib/og/font';
import { HomeOG } from '@/lib/og/home';
import { appName, brandName } from '@/lib/shared';

export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';
export const alt = `${appName} — 손으로 익히는 실전 가이드`;

const kicker = '2026';
const brandLines: [string, string] = [`${brandName},`, '제대로 배우기'];
const tagline = '손으로 익히는 실전 가이드';

export default async function Image() {
  const fonts = await loadOGFonts(`${kicker}${brandLines.join('')}${tagline}`);
  return new ImageResponse(
    <HomeOG kicker={kicker} brandLines={brandLines} tagline={tagline} />,
    { ...size, fonts },
  );
}
