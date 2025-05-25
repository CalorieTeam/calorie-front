"use client";

import React from "react";
import { handleLogout } from "@/app/utils/logout"; // 로그아웃 함수
import { useRouter } from "next/navigation";

export default function LogoutButton() {
  const router = useRouter();
  
  return (
    <button onClick={() => handleLogout(router)}>
      로그아웃
    </button>
  );
}
