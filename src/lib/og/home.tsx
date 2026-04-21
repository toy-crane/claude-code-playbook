export function HomeOG({
  kicker,
  brandLines,
  tagline,
}: {
  kicker: string;
  brandLines: [string, string];
  tagline: string;
}) {
  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        width: '100%',
        height: '100%',
        backgroundColor: '#0c0c0c',
        color: '#ffffff',
        fontFamily: 'Noto Sans KR',
        padding: '72px 80px',
        justifyContent: 'center',
        alignItems: 'flex-start',
      }}
    >
      <p
        style={{
          fontSize: 20,
          fontWeight: 600,
          color: 'rgba(240,240,240,0.45)',
          letterSpacing: '0.18em',
          margin: 0,
          marginBottom: 14,
        }}
      >
        {kicker}
      </p>
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          marginBottom: 56,
          fontSize: 88,
          fontWeight: 800,
          lineHeight: 1.08,
          letterSpacing: '-0.02em',
        }}
      >
        <span>{brandLines[0]}</span>
        <span>{brandLines[1]}</span>
      </div>
      <p
        style={{
          fontSize: 30,
          fontWeight: 400,
          color: 'rgba(240,240,240,0.7)',
          margin: 0,
          lineHeight: 1.35,
        }}
      >
        {tagline}
      </p>
    </div>
  );
}
