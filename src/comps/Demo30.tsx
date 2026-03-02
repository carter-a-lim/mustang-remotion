import React from 'react';
import {AbsoluteFill, Sequence, spring, useCurrentFrame, useVideoConfig} from 'remotion';

export type DemoProps = {
  url: string;
  steps: string[];
  benefits: string[];
  cta: string;
  accentColor: string;
};

const Panel: React.FC<{title: string; lines: string[]; accentColor: string}> = ({title, lines, accentColor}) => {
  const frame = useCurrentFrame();
  const {fps} = useVideoConfig();
  const y = 60 - spring({frame, fps, config: {damping: 180}}) * 60;

  return (
    <AbsoluteFill style={{justifyContent: 'center', alignItems: 'center', padding: 70, transform: `translateY(${y}px)`}}>
      <div
        style={{
          width: '100%',
          background: 'rgba(17,24,39,0.88)',
          border: `3px solid ${accentColor}`,
          borderRadius: 26,
          padding: 46,
          color: 'white',
          fontFamily: 'Inter, Arial, sans-serif',
        }}
      >
        <div style={{fontSize: 62, fontWeight: 800, marginBottom: 18}}>{title}</div>
        {lines.map((line, i) => (
          <div key={i} style={{fontSize: 36, marginBottom: 10, opacity: 0.95}}>
            • {line}
          </div>
        ))}
      </div>
    </AbsoluteFill>
  );
};

export const Demo30: React.FC<DemoProps> = ({url, steps, benefits, cta, accentColor}) => {
  return (
    <AbsoluteFill style={{background: 'linear-gradient(160deg, #0f172a 0%, #1e293b 100%)'}}>
      <Sequence from={0} durationInFrames={120}>
        <Panel title="Need stuff for class?" lines={["Or need to sell old gear?", 'Mustang Market makes both easy.']} accentColor={accentColor} />
      </Sequence>

      <Sequence from={120} durationInFrames={180}>
        <Panel title="How it works" lines={steps} accentColor={accentColor} />
      </Sequence>

      <Sequence from={300} durationInFrames={210}>
        <Panel title="Why students use it" lines={benefits} accentColor={accentColor} />
      </Sequence>

      <Sequence from={510} durationInFrames={390}>
        <Panel title={cta} lines={[url, 'Buy. Sell. Repeat.']} accentColor={accentColor} />
      </Sequence>
    </AbsoluteFill>
  );
};
