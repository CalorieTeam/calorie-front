"use client";
import { useEffect } from "react";
import Header from "@/components/Header"; 
import Footer from "@/components/Footer";
import { useRouter } from "next/navigation";

export default function Main() { 
  const router = useRouter();
  function checkLogin() {
    const accessToken = localStorage.getItem("accessToken") || sessionStorage.getItem("accessToken");
    if (!accessToken) { 
      router.replace("/login"); 
    } else { 
      console.log("로그인 상태 유지 중", accessToken);
    }
  }
  useEffect(() => {
    checkLogin();
  }, []);

  function handleLogout() {
    localStorage.removeItem("accessToken"); 
    localStorage.removeItem("refreshToken");   
    router.replace("/login"); 
  }
  
  return (
    <>
      <Header title="메인" />
      <button onClick={handleLogout}>토큰 삭제</button>
      <Footer />
    </>
  );
}