// Fetches Noto Sans KR from Google Fonts at build time.
// `text` restricts the font subset to only glyphs present in the OG image.

async function fetchWeight(weight: 400 | 600 | 800, text: string): Promise<ArrayBuffer> {
  // No User-Agent → Google Fonts returns truetype (Satori requires TTF/OTF/WOFF, not WOFF2).
  const url = `https://fonts.googleapis.com/css2?family=Noto+Sans+KR:wght@${weight}&text=${encodeURIComponent(text)}`;
  const css = await fetch(url).then((r) => r.text());

  const match = css.match(/src:\s*url\(([^)]+)\)\s*format\('truetype'\)/);
  if (!match) throw new Error(`Noto Sans KR ${weight} TTF URL not found in CSS:\n${css}`);

  const res = await fetch(match[1]);
  if (!res.ok) throw new Error(`Failed to fetch Noto Sans KR ${weight}`);
  return res.arrayBuffer();
}

export async function loadOGFonts(text: string) {
  const [regular, semibold, extrabold] = await Promise.all([
    fetchWeight(400, text),
    fetchWeight(600, text),
    fetchWeight(800, text),
  ]);
  return [
    { name: 'Noto Sans KR', data: regular, weight: 400 as const },
    { name: 'Noto Sans KR', data: semibold, weight: 600 as const },
    { name: 'Noto Sans KR', data: extrabold, weight: 800 as const },
  ];
}
