import Link from 'next/link';

export default function Footer() {
  return (
    <footer>  
      <Link href="/">메인</Link>
      <Link href="/diet">식단</Link>
      <Link href="/record">기록</Link>
      <Link href="/mypage">마이페이지</Link> 
    </footer>
  );
}