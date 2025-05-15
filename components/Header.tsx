'use client';

import React from 'react'; 
import { useRouter } from "next/navigation";

type HeaderProps = { 
  title?: string; 
  showBackButton?: boolean;
};
export default function Header({ title, showBackButton }: HeaderProps) {
  const router = useRouter();
  return (
    <header> 
      {showBackButton && (
        <button className='back' onClick={() => router.back()} style={{ marginRight: 8 }}>
          <img src="/chevron_left_24dp_1F1F1F_FILL0_wght400_GRAD0_opsz24.svg" alt="" />
        </button>
      )}
      <h1>{title}</h1>
    </header>
  );
}

