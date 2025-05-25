export async function fetchUserInfo(token: string) {
  console.log(token+"?");
  
  const response = await fetch("http://localhost:8080/auth/me", {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${token}`,  // 서버 요구 형식에 따라 다름
    }
  });

  if (!response.ok) {
    throw new Error("사용자 정보를 가져오는 데 실패했습니다.");
  }
  // const data = await response.json();
  // console.log("서버에서 받은 데이터:", data);
  // return data;
  
  return response.json();
}
