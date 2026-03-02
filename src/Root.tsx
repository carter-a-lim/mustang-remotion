import React from 'react';
import {Composition} from 'remotion';
import {Reel15, ReelProps} from './comps/Reel15';
import {Demo30, DemoProps} from './comps/Demo30';

const reelDefaults: ReelProps = {
  brandName: 'Mustang Market',
  url: 'mustag-market.com',
  hook: "Cal Poly's Marketplace is here",
  categories: ['Textbooks', 'Furniture', 'Bikes', 'Electronics'],
  cta: 'Buy. Sell. Repeat.',
  accentColor: '#00C853',
};

const demoDefaults: DemoProps = {
  url: 'mustag-market.com',
  steps: ['Upload photo', 'Set price', 'Post listing'],
  benefits: ['Student-focused', 'Quick listing', 'Campus local'],
  cta: 'Start browsing today',
  accentColor: '#00C853',
};

export const Root: React.FC = () => {
  return (
    <>
      <Composition
        id="Reel15"
        component={Reel15}
        durationInFrames={15 * 30}
        fps={30}
        width={1080}
        height={1920}
        defaultProps={reelDefaults}
      />
      <Composition
        id="Demo30"
        component={Demo30}
        durationInFrames={30 * 30}
        fps={30}
        width={1080}
        height={1920}
        defaultProps={demoDefaults}
      />
    </>
  );
};
