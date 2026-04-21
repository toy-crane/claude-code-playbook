export function LessonOG({
  brand,
  title,
  description,
}: {
  brand: string;
  title: string;
  description: string;
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
      }}
    >
      <p
        style={{
          fontSize: 40,
          fontWeight: 600,
          color: 'rgba(240,240,240,0.7)',
          margin: 0,
          marginBottom: 'auto',
          letterSpacing: '-0.01em',
        }}
      >
        {brand}
      </p>
      <p
        style={{
          fontSize: 88,
          fontWeight: 800,
          lineHeight: 1.05,
          margin: 0,
          marginBottom: 24,
          letterSpacing: '-0.02em',
        }}
      >
        {title}
      </p>
      <p
        style={{
          fontSize: 36,
          fontWeight: 400,
          color: 'rgba(240,240,240,0.7)',
          margin: 0,
          lineHeight: 1.3,
        }}
      >
        {description}
      </p>
    </div>
  );
}
