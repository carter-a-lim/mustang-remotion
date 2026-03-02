import React from 'react';
import {AbsoluteFill, Sequence, interpolate, spring, useCurrentFrame, useVideoConfig} from 'remotion';

export type ReelProps = {
  brandName: string;
  url: string;
  hook: string;
  categories: string[];
  cta: string;
  accentColor: string;
};

const Card: React.FC<{title: string; subtitle?: string; accentColor: string}> = ({title, subtitle, accentColor}) => {
  const frame = useCurrentFrame();
  const {fps} = useVideoConfig();
  const scale = spring({frame, fps, config: {damping: 200}});

  return (
    <AbsoluteFill
      style={{
        justifyContent: 'center',
        alignItems: 'center',
        padding: 80,
        transform: `scale(${scale})`,
      }}
    >
      <div
        style={{
          width: '100%',
          borderRadius: 28,
          background: 'rgba(0,0,0,0.7)',
          border: `3px solid ${accentColor}`,
          padding: 48,
          color: 'white',
          textAlign: 'center',
          fontFamily: 'Inter, Arial, sans-serif',
        }}
      >
        <div style={{fontSize: 68, fontWeight: 800, lineHeight: 1.1}}>{title}</div>
        {subtitle ? <div style={{fontSize: 38, marginTop: 18, opacity: 0.9}}>{subtitle}</div> : null}
      </div>
    </AbsoluteFill>
  );
};

export const Reel15: React.FC<ReelProps> = ({brandName, url, hook, categories, cta, accentColor}) => {
  const frame = useCurrentFrame();
  const darken = interpolate(frame, [0, 40], [0.35, 0.6], {extrapolateRight: 'clamp'});

  return (
    <AbsoluteFill style={{background: 'linear-gradient(135deg, #1f2937 0%, #111827 100%)'}}>
      <AbsoluteFill style={{backgroundColor: `rgba(0,0,0,${darken})`}} />

      <Sequence from={0} durationInFrames={60}>
        <Card title={hook} subtitle={brandName} accentColor={accentColor} />
      </Sequence>

      <Sequence from={60} durationInFrames={120}>
        <Card title={categories.join(' • ')} subtitle="Campus deals, fast" accentColor={accentColor} />
      </Sequence>

      <Sequence from={180} durationInFrames={90}>
        <Card title="List in under 60 seconds" subtitle="Upload • Price • Post" accentColor={accentColor} />
      </Sequence>

      <Sequence from={270} durationInFrames={90}>
        <Card title={cta} subtitle={url} accentColor={accentColor} />
      </Sequence>
    </AbsoluteFill>
  );
};
