"use client";

import dynamic from 'next/dynamic';
import { ReactNode } from 'react';

interface NoSSRProps {
  children: ReactNode;
}

const NoSSR = ({ children }: NoSSRProps) => {
  return <>{children}</>;
};

export default dynamic(() => Promise.resolve(NoSSR), {
  ssr: false,
  loading: () => (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center">
      <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
    </div>
  )
}); 