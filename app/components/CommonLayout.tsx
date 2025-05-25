'use client';

import { useEffect } from 'react';

interface CommonLayoutProps {
  children: React.ReactNode;
}

export default function CommonLayout({ children }: CommonLayoutProps) {
  useEffect(() => {
    const token = localStorage.getItem('accessToken');
    console.log('토큰 존재 여부:', !!token);
    if (token) {
      console.log('현재 토큰:', token);
    }
  }, []);

  return <>{children}</>;
} 