'use client';

import { FC } from 'react';
import { Toaster as Sonner, ToasterProps } from 'sonner';

const Toaster: FC<ToasterProps> = ({ ...props }) => {
  return <Sonner className="toaster group" {...props} />;
};

export { Toaster };
