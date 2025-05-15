'use client'; 
import { useState } from 'react';
import { members } from '../mock/members';
import styles from './Login.module.scss'; // CSS 모듈 사용

function Login() { 
  
  const [id, setId] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    // Mock API call
    const found = members.find(m => m.id === id && m.password === password);
    if (found) {
      alert(`로그인 성공! 토큰: ${found.token}`);
      localStorage.setItem("token", found.token);
      window.location.href = "/main"; // 메인 페이지로 이동
    } else {
      setError('아이디 또는 비밀번호가 올바르지 않습니다.');
    }
     
  };

  // 로그인 상태 유지 기간 옵션
  const SESSION_DURATION = {
    ONE_DAY: 24 * 60 * 60 * 1000, // 1일
    SEVEN_DAYS: 7 * 24 * 60 * 60 * 1000, // 7일
    INFINITE: null // 무한 유지
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