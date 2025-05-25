// 토큰 재발급
export async function refreshAccessToken() {
  const refreshToken = localStorage.getItem('refreshToken');
  if (!refreshToken) throw new Error('No refresh token. Please login again.');

  const res = await fetch('http://localhost:8080/api/refresh-token', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ refreshToken }),
  });

  if (!res.ok) {
    localStorage.removeItem('accessToken');
    localStorage.removeItem('refreshToken');
    window.location.href = '/login';
    throw new Error('Refresh token expired, please login again');
  }

  const data = await res.json();
  localStorage.setItem('accessToken', data.accessToken); 
  // 새 rtoken을 저장할 지 고민. ~~~
  return data.accessToken;
}

// 토큰 검사
export async function checkAccessToken(): Promise<string | false> {
  const accessToken = localStorage.getItem('accessToken');
  if (!accessToken) return false;

  const res = await fetch('http://localhost:8080/auth/me', {
    method: 'GET',
    headers: { "Authorization": `Bearer ${accessToken}` }
  });

  if (!res.ok) {
    const data = await res.json();
    if (res.status === 401 && data.message === "AccessTokenExpired") {
      const newToken = await refreshAccessToken(); 
      if (newToken) {
        localStorage.setItem('accessToken', newToken);  // 새 토큰 저장
        return newToken;  // 새 토큰 반환
      }
      return false;
    }
    if (res.status === 401 && data.message === "InvalidAccessToken") {
      localStorage.removeItem('accessToken');
      localStorage.removeItem('refreshToken');
      window.location.href = '/login';
      return false;
    }

    localStorage.removeItem('accessToken');
    localStorage.removeItem('refreshToken');
    window.location.href = '/login';
    return false;
  }

  return accessToken; // 유효하면 기존 토큰 반환
}