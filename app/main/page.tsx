"use client"; 
import { useEffect, useState } from "react";
import Header from "@/components/Header"; 
import Footer from "@/components/Footer";
import { useRouter } from "next/navigation";
import { checkAccessToken } from "@/app/utils/auth"; // 토큰 검사
import { fetchUserInfo } from "@/app/utils/me"; // 사용자 정보를 가져오는 API 함수
import  LogoutButton from "@/components/auth/LogoutButton";
export default function Main() { 
  const router = useRouter(); 
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const init = async () => {
      const validToken = await checkAccessToken();
      if (!validToken) {
        alert('로그인 후 이용해주세요.');
        router.replace('/login');
        return;
      } 
      try {
        const user = await fetchUserInfo(validToken); 
        // setUserInfo(user);
        console.log("메인", validToken, user);
        
      } catch (error) {
        console.error("사용자 정보 가져오기 실패:", error);
        alert('사용자 정보를 가져오는 데 실패했습니다.');
        router.push('/login');
      } finally {
        setLoading(false); // 정보 가져오기 완료 후 렌더링
      }
    };

    init();
  }, []);

  return (
    <>
      <Header title="메인" />
      <LogoutButton /> 
      <Footer />
    </>
  );
}