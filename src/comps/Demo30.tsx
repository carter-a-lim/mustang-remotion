import React from 'react';
import {
  AbsoluteFill,
  Sequence,
  interpolate,
  spring,
  useCurrentFrame,
  useVideoConfig,
} from 'remotion';

export type DemoProps = {
  url: string;
  steps: string[];
  benefits: string[];
  cta: string;
  accentColor: string;
};

const Background: React.FC<{accentColor: string}> = ({accentColor}) => {
  const frame = useCurrentFrame();
  const pulse = 0.6 + Math.sin(frame / 20) * 0.08;

  return (
    <AbsoluteFill style={{background: 'linear-gradient(160deg, #030304 0%, #0a0a0d 45%, #111118 100%)'}}>
      <div
        style={{
          position: 'absolute',
          inset: 0,
          backgroundImage:
            'repeating-linear-gradient(0deg, rgba(255,255,255,0.012) 0px, rgba(255,255,255,0.012) 1px, transparent 1px, transparent 3px)',
          mixBlendMode: 'soft-light',
        }}
      />
      <div
        style={{
          position: 'absolute',
          top: -180,
          left: -90,
          width: 540,
          height: 540,
          borderRadius: 999,
          background: `${accentColor}26`,
          filter: 'blur(90px)',
          opacity: pulse,
        }}
      />
      <div
        style={{
          position: 'absolute',
          right: -160,
          bottom: -220,
          width: 700,
          height: 700,
          borderRadius: 999,
          background: '#60a5fa22',
          filter: 'blur(110px)',
        }}
      />
    </AbsoluteFill>
  );
};

const DeviceMock: React.FC<{accentColor: string}> = ({accentColor}) => {
  const frame = useCurrentFrame();
  const {fps} = useVideoConfig();
  const pop = spring({frame, fps, config: {damping: 200}});
  const y = interpolate(pop, [0, 1], [40, 0]);

  return (
    <div
      style={{
        width: 440,
        height: 880,
        borderRadius: 56,
        background: 'linear-gradient(180deg, #141419 0%, #0a0a0d 100%)',
        border: '1px solid rgba(255,255,255,0.18)',
        boxShadow: '0 35px 100px rgba(0,0,0,0.5), inset 0 1px 0 rgba(255,255,255,0.2)',
        padding: 24,
        transform: `translateY(${y}px)` ,
      }}
    >
      <div
        style={{
          width: '100%',
          height: '100%',
          borderRadius: 40,
          background: 'linear-gradient(165deg, #16161b 0%, #0c0d12 100%)',
          border: `1px solid ${accentColor}66`,
          padding: 30,
          color: 'white',
          fontFamily: 'SF Pro Text, Inter, sans-serif',
        }}
      >
        <div style={{fontSize: 24, opacity: 0.7, marginBottom: 22}}>mustang-market.com</div>
        <div style={{fontSize: 34, fontWeight: 700, marginBottom: 20}}>Featured Listings</div>
        {["iClicker + Case — $35", 'Mini Fridge — $80', 'Road Bike — $240'].map((x) => (
          <div
            key={x}
            style={{
              marginBottom: 12,
              padding: '14px 16px',
              borderRadius: 16,
              background: 'rgba(255,255,255,0.06)',
              border: '1px solid rgba(255,255,255,0.12)',
              fontSize: 22,
            }}
          >
            {x}
          </div>
        ))}
      </div>
    </div>
  );
};

const MessageCard: React.FC<{title: string; lines: string[]; accentColor: string}> = ({title, lines, accentColor}) => {
  const frame = useCurrentFrame();
  const {fps} = useVideoConfig();
  const rise = spring({frame, fps, config: {damping: 180, stiffness: 120}});
  const y = interpolate(rise, [0, 1], [34, 0]);
  const op = interpolate(frame, [0, 14], [0, 1], {extrapolateRight: 'clamp'});

  return (
    <div
      style={{
        width: 560,
        borderRadius: 34,
        border: `1.5px solid ${accentColor}66`,
        background: 'linear-gradient(145deg, rgba(255,255,255,0.14), rgba(255,255,255,0.03))',
        boxShadow: '0 28px 90px rgba(0,0,0,0.45), inset 0 1px 0 rgba(255,255,255,0.32)',
        padding: '42px 36px',
        color: 'white',
        transform: `translateY(${y}px)`,
        opacity: op,
        fontFamily: 'SF Pro Display, Inter, Arial, sans-serif',
      }}
    >
      <div style={{fontSize: 56, lineHeight: 1.04, fontWeight: 700, marginBottom: 16, letterSpacing: '-0.02em'}}>{title}</div>
      {lines.map((line) => (
        <div key={line} style={{fontSize: 30, marginBottom: 8, opacity: 0.92, fontWeight: 500}}>
          {line}
        </div>
      ))}
    </div>
  );
};

const SplitScene: React.FC<{title: string; lines: string[]; accentColor: string}> = ({title, lines, accentColor}) => {
  return (
    <AbsoluteFill style={{padding: '140px 74px', display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between'}}>
      <DeviceMock accentColor={accentColor} />
      <MessageCard title={title} lines={lines} accentColor={accentColor} />
    </AbsoluteFill>
  );
};

export const Demo30: React.FC<DemoProps> = ({url, steps, benefits, cta, accentColor}) => {
  const frame = useCurrentFrame();
  const topBar = interpolate(frame, [0, 20], [-120, 0], {extrapolateRight: 'clamp'});
  const bottomBar = interpolate(frame, [0, 20], [120, 0], {extrapolateRight: 'clamp'});

  return (
    <AbsoluteFill>
      <Background accentColor={accentColor} />
      <div style={{position: 'absolute', top: topBar, left: 0, right: 0, height: 90, background: '#000'}} />
      <div style={{position: 'absolute', bottom: bottomBar, left: 0, right: 0, height: 90, background: '#000'}} />

      <Sequence from={0} durationInFrames={180}>
        <SplitScene
          title="Find what you need. Fast."
          lines={['Built for students', 'Local campus listings', 'No clutter, just deals']}
          accentColor={accentColor}
        />
      </Sequence>

      <Sequence from={180} durationInFrames={220}>
        <SplitScene title="How listing works" lines={steps} accentColor={accentColor} />
      </Sequence>

      <Sequence from={400} durationInFrames={220}>
        <SplitScene title="Why it converts" lines={benefits} accentColor={accentColor} />
      </Sequence>

      <Sequence from={620} durationInFrames={280}>
        <SplitScene title={cta} lines={[url, 'Buy. Sell. Repeat.']} accentColor={accentColor} />
      </Sequence>
    </AbsoluteFill>
  );
};
