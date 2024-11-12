'use client';

import { FC } from 'react';

interface SpaceProps {
  readonly x?: number;
  readonly y?: number;
}

export const Space: FC<SpaceProps> = ({ x, y }) => {
  return (
    <div
      style={{
        marginBottom: `${y}px` ?? 0,
        marginRight: `${x}px` ?? 0
      }}
    />
  );
};
