'use client';
import { useEffect } from 'react';
import { useRouter } from 'next/navigation'; 


export default function Home() { 
  const router = useRouter();
  useEffect(() => { 
    const token = localStorage.getItem('accessToken');
    if (!token) {
      router.replace('/login');
    } else {
      router.replace('/main'); // 토큰이 있으면 메인 페이지로 이동
    }
  }, [router]);  
  return <div>Loading ...</div>
}
