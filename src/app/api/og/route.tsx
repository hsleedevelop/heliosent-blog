import { ImageResponse } from 'next/og';

export const runtime = 'edge';

const modeColors: Record<string, { accent: string; text: string }> = {
  essays: { accent: '#3b82f6', text: '#1d4ed8' },
  labs: { accent: '#f59e0b', text: '#b45309' },
  architecture: { accent: '#64748b', text: '#334155' },
  apps: { accent: '#10b981', text: '#047857' },
  blog: { accent: '#71717a', text: '#3f3f46' },
};

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const title = searchParams.get('title') || 'HelioSent';
    const mode = searchParams.get('mode') || '';
    const section = searchParams.get('section') || 'blog';

    const colors = modeColors[section] || modeColors.blog;

    return new ImageResponse(
      (
        <div
          style={{
            width: '100%',
            height: '100%',
            display: 'flex',
            flexDirection: 'column',
            backgroundColor: '#fafafa',
            fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
          }}
        >
          {/* Top accent stripe */}
          <div
            style={{
              width: '100%',
              height: '4px',
              backgroundColor: colors.accent,
            }}
          />

          {/* Main content area */}
          <div
            style={{
              flex: 1,
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
              alignItems: 'flex-start',
              padding: '60px 80px',
              position: 'relative',
            }}
          >
            {/* Mode label badge - top right */}
            {mode && (
              <div
                style={{
                  position: 'absolute',
                  top: '40px',
                  right: '80px',
                  backgroundColor: colors.accent,
                  color: '#ffffff',
                  padding: '6px 12px',
                  borderRadius: '4px',
                  fontSize: '14px',
                  fontWeight: '500',
                }}
              >
                {mode}
              </div>
            )}

            {/* Title */}
            <h1
              style={{
                fontSize: '48px',
                fontWeight: '700',
                color: '#1a1a1a',
                margin: '0',
                lineHeight: '1.2',
                maxWidth: '900px',
                display: '-webkit-box',
                WebkitLineClamp: 3,
                WebkitBoxOrient: 'vertical',
                overflow: 'hidden',
              }}
            >
              {title}
            </h1>
          </div>

          {/* Footer - HelioSent brand */}
          <div
            style={{
              padding: '40px 80px',
              fontSize: '14px',
              color: '#999999',
              fontWeight: '500',
            }}
          >
            HelioSent
          </div>
        </div>
      ),
      {
        width: 1200,
        height: 630,
      }
    );
  } catch {
    return new Response('Failed to generate OG image', { status: 500 });
  }
}
