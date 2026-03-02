import React from 'react';
import {
  AbsoluteFill,
  Easing,
  Sequence,
  interpolate,
  spring,
  useCurrentFrame,
  useVideoConfig,
} from 'remotion';

export type ReelProps = {
  brandName: string;
  url: string;
  hook: string;
  categories: string[];
  cta: string;
  accentColor: string;
};

const AmbientBackground: React.FC<{accentColor: string}> = ({accentColor}) => {
  const frame = useCurrentFrame();
  const driftA = Math.sin(frame / 34) * 70;
  const driftB = Math.cos(frame / 45) * 60;

  return (
    <AbsoluteFill style={{background: 'radial-gradient(120% 100% at 50% 0%, #1c1c1f 0%, #050507 68%)'}}>
      <div
        style={{
          position: 'absolute',
          top: -260 + driftA,
          left: -160,
          width: 720,
          height: 720,
          borderRadius: 999,
          background: `${accentColor}30`,
          filter: 'blur(120px)',
        }}
      />
      <div
        style={{
          position: 'absolute',
          bottom: -280 + driftB,
          right: -120,
          width: 780,
          height: 780,
          borderRadius: 999,
          background: '#3b82f620',
          filter: 'blur(130px)',
        }}
      />
      <AbsoluteFill style={{background: 'linear-gradient(180deg, rgba(0,0,0,0.22), rgba(0,0,0,0.72))'}} />
    </AbsoluteFill>
  );
};

const GlassCard: React.FC<{title: string; subtitle?: string; accentColor: string}> = ({title, subtitle, accentColor}) => {
  const frame = useCurrentFrame();
  const {fps} = useVideoConfig();

  const inSpring = spring({frame, fps, config: {damping: 140, stiffness: 120}});
  const y = interpolate(inSpring, [0, 1], [40, 0]);
  const opacity = interpolate(frame, [0, 16], [0, 1], {extrapolateRight: 'clamp'});

  return (
    <AbsoluteFill style={{justifyContent: 'center', alignItems: 'center', padding: 72, opacity, transform: `translateY(${y}px)`}}>
      <div
        style={{
          width: '100%',
          maxWidth: 940,
          borderRadius: 36,
          border: `1.5px solid ${accentColor}66`,
          background: 'linear-gradient(145deg, rgba(255,255,255,0.14), rgba(255,255,255,0.03))',
          boxShadow: '0 30px 90px rgba(0,0,0,0.42), inset 0 1px 0 rgba(255,255,255,0.35)',
          backdropFilter: 'blur(16px)',
          padding: '66px 58px',
          textAlign: 'center',
          color: '#f9fafb',
          fontFamily: 'SF Pro Display, Inter, Arial, sans-serif',
          letterSpacing: '-0.02em',
        }}
      >
        <div style={{fontSize: 74, fontWeight: 700, lineHeight: 1.06}}>{title}</div>
        {subtitle ? <div style={{marginTop: 22, fontSize: 34, opacity: 0.88, fontWeight: 500}}>{subtitle}</div> : null}
      </div>
    </AbsoluteFill>
  );
};

const DeviceStrip: React.FC<{items: string[]; accentColor: string}> = ({items, accentColor}) => {
  const frame = useCurrentFrame();
  const x = interpolate(frame, [0, 140], [240, -220], {
    extrapolateRight: 'clamp',
    easing: Easing.out(Easing.cubic),
  });

  return (
    <AbsoluteFill style={{justifyContent: 'flex-end', paddingBottom: 240, overflow: 'hidden'}}>
      <div style={{display: 'flex', gap: 22, transform: `translateX(${x}px)`, paddingLeft: 120}}>
        {items.map((item) => (
          <div
            key={item}
            style={{
              minWidth: 250,
              height: 130,
              borderRadius: 28,
              border: `1px solid ${accentColor}55`,
              background: 'linear-gradient(160deg, rgba(255,255,255,0.22), rgba(255,255,255,0.05))',
              color: 'white',
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              fontFamily: 'SF Pro Text, Inter, sans-serif',
              fontSize: 32,
              fontWeight: 600,
              boxShadow: '0 20px 50px rgba(0,0,0,0.35)',
            }}
          >
            {item}
          </div>
        ))}
      </div>
    </AbsoluteFill>
  );
};

export const Reel15: React.FC<ReelProps> = ({brandName, url, hook, categories, cta, accentColor}) => {
  return (
    <AbsoluteFill>
      <AmbientBackground accentColor={accentColor} />

      <Sequence from={0} durationInFrames={85}>
        <GlassCard title={hook} subtitle={brandName} accentColor={accentColor} />
      </Sequence>

      <Sequence from={85} durationInFrames={130}>
        <GlassCard title="Campus picks in motion" subtitle="Textbooks • Furniture • Tech • Bikes" accentColor={accentColor} />
        <DeviceStrip items={categories} accentColor={accentColor} />
      </Sequence>

      <Sequence from={215} durationInFrames={120}>
        <GlassCard title="List in under 60 seconds" subtitle="Photo → Price → Post" accentColor={accentColor} />
      </Sequence>

      <Sequence from={335} durationInFrames={115}>
        <GlassCard title={cta} subtitle={url} accentColor={accentColor} />
      </Sequence>
    </AbsoluteFill>
  );
};
