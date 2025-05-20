'use client'; 
import { useState } from 'react';
import { members } from '../mock/members'; // 삭제 예정
import styles from './Login.module.scss'; // CSS 모듈 사용
import { useRouter } from 'next/navigation'; // useRouter 훅을 사용하기 위해 import

function Login() { 
  const router = useRouter(); // useRouter 훅을 사용하여 라우터 객체를 가져옴
  
  const [id, setId] = useState('test');
  const [password, setPassword] = useState('1234');
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    // const response = await login(id,password);
    try {
      const response = await fetch('http://localhost:8080/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ "email": id, "pw": password }),
      });

      console.log(response.ok);
      console.log(!response.ok);
      console.log(response.status);  
      console.log(response.headers.get('Authorization')); // 토큰 확인
      console.log(response.headers.get('AccessToken')); // 
      console.log(response.headers.get('RefreshToken')); // 리프레시 토큰 확인
      return;
      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.message || '로그인 실패');
      }

      const data = await response.json();
      const { accessToken, refreshToken } = data;

      console.log('로그인 성공!');
      // 토큰값을 로컬스토리지에 저장
      localStorage.setItem('accessToken', accessToken);
      localStorage.setItem('refreshToken', refreshToken);
      // 로그인 성공 후 메인 페이지로 이동
      router.push('/main'); 
    } catch (err: any) {
      setError(err.message || '서버 오류가 발생했습니다.');
    }
  }; 

  return (
    <>
      <form className={styles.container} onSubmit={handleSubmit}>
        <h2>로그인</h2>
        <input
          type="text"
          placeholder="아이디"
          value={id}
          onChange={e => setId(e.target.value)}
        />
        <input
          type="password"
          placeholder="비밀번호"
          value={password}
          onChange={e => setPassword(e.target.value)}
        /> 
        <div className={styles.links}>
          <a href="/find-id">아이디 찾기</a>
          <a href="/find-password">비밀번호 찾기</a>
          <a href="/join">회원가입</a>
        </div>

        <button type="submit">로그인</button>
        {error && <div style={{ color: 'red' }}>{error}</div>}
      </form>
    </>
  );
}

export default Login;