'use client';
import { useEffect } from 'react';
import { useRouter } from 'next/navigation'; 


export default function Home() { 
  const router = useRouter();

  useEffect(() => {
    const accessToken = localStorage.getItem('accessToken');
    if(accessToken) {
      alert('로그인 성공!');
      router.replace('/main'); 
    }else {
      alert('로그인 실패!');
      router.replace('/login'); 
    }
  }, [router]);  
  return  <div>Loading ...</div>
}
