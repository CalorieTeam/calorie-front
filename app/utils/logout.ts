import { AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime";

export function handleLogout(router: AppRouterInstance) { 
    localStorage.removeItem("accessToken"); 
    localStorage.removeItem("refreshToken");    
    // TODO: 서버에 로그아웃 API 호출 구현 필요
    fetch("http://localhost:8080/auth/logout", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${localStorage.getItem("accessToken")}`
      }
     });    
    router.replace("/login"); 
}
  