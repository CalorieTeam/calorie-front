"use client";
import { useEffect } from "react";
import Header from "@/components/Header"; 
import Footer from "@/components/Footer";


export default function Main() { 
  function checkLogin() {
    const token = localStorage.getItem("token") || sessionStorage.getItem("token");
    if (!token) {
      // 로그인 정보 없으면 로그인 페이지로 이동
      window.location.href = "/login";
    } else {
      // 토큰이 있으면 메인 페이지 유지
      console.log("로그인 상태 유지 중", token);
    }
  }
  useEffect(() => {
    checkLogin();
  }, []);
  return (
    <>
      <Header title="메인" />
      <button onClick={() => {localStorage.removeItem('token');window.location.href = "/login";}}>토큰 삭제</button>
      <Footer />
    </>
  );
}