'use client';
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Image from 'next/image';
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { checkAccessToken } from "@/app/utils/auth";
import { fetchUserInfo } from "@/app/utils/me";
import styled from "styled-components";

// 사용자 정보 타입 정의
interface UserInfo {
  name: string;
  email: string;
  phoneNumber: string;
  created_dt: string;
  info: {
    height: number;
    weight: number;
  };
}

export default function MainPage() { 
  const router = useRouter();
  const [userInfo, setUserInfo] = useState<UserInfo | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [startDate, setStartDate] = useState<Date | null>(null);

  // 운동시작한 지 일째 계산
  const calculateDays = (startDate: Date | null) => {
    if (!startDate || isNaN(startDate.getTime())) {
      return 0;
    }
    const today = new Date();
    const koreaToday = new Date(today.getTime() + (9 * 60 * 60 * 1000));
    const koreaStartDate = new Date(startDate.getTime() + (9 * 60 * 60 * 1000));

    // 날짜만 비교하기 위해 시간을 00:00:00으로 설정
    koreaToday.setHours(0, 0, 0, 0);
    koreaStartDate.setHours(0, 0, 0, 0);

    const timeDiff = koreaToday.getTime() - koreaStartDate.getTime();
    const days = Math.floor(timeDiff / (1000 * 60 * 60 * 24));
    return days + 1;
  };

  // 사용자 정보 로딩 함수
  const loadUserInfo = async (token: string) => {
    try {
      const user = await fetchUserInfo(token);
      
      // 필수 필드 검증
      if (!user.name || !user.email) {
        throw new Error('필수 사용자 정보가 누락되었습니다.');
      }

      setUserInfo(user);
      setStartDate(new Date(user.created_dt));
      setError(null);
    } catch (error) {
      console.error("사용자 정보 로딩 실패:", error);
      setError(error instanceof Error ? error.message : '사용자 정보를 가져오는데 실패했습니다.');
      return false;
    }
    return true;
  };

  useEffect(() => {
    const init = async () => {
      setLoading(true);
      try {
        const validToken = await checkAccessToken();
        if (!validToken) {
          router.replace('/login');
          return;
        }

        const success = await loadUserInfo(validToken);
        if (!success) {
          router.replace('/login');
        }
      } catch (error) {
        console.error("초기화 실패:", error);
        router.replace('/login');
      } finally {
        setLoading(false);
      }
    };

    init();
  }, [router]);

  if (loading) {
    return (
      <>
        <Header title="마이페이지" />
        <LoadingWrapper>로딩 중...</LoadingWrapper>
      </>
    );
  }

  if (error) {
    return (
      <>
        <Header title="마이페이지" />
        <ErrorWrapper>{error}</ErrorWrapper>
      </>
    );
  }

  return (
    <>
    <Header title="마이페이지" />
    <Main>
      <Flex>
        <div className="img_box">
          <Image src="/globe.svg" alt="User Profile" width={80} height={80} />
        </div>
        <div>
          <h2>{userInfo?.name}님</h2>
          <DateInfo>
            <p className="days">운동 시작한 지 <span className="number">{calculateDays(startDate)}</span>일째</p>
          </DateInfo>
        </div>
      </Flex>
      
      {/* 키 몸무게 정보 */}
      <InfoSection>
        <div className="info-header">
          <h3>신체 정보</h3>
          <button className="edit-btn">수정</button>
        </div>
        {userInfo?.info?.height && userInfo?.info?.weight ? (
          <div className="info-content">
            <p>키: <span>{userInfo.info.height}</span>cm</p>
            <p>몸무게: <span>{userInfo.info.weight}</span>kg</p>
          </div>
        ) : (
          <div className="empty-state">
            <p>아직 신체 정보가 입력되지 않았습니다.</p>
            <button className="add-btn">신체 정보 입력하기</button>
          </div>
        )}
      </InfoSection>

      {/* 연락처 정보 */}
      <ContactSection>
        <p>이메일: <span>{userInfo?.email}</span></p>
        <p>전화번호: <span>{userInfo?.phoneNumber}</span></p>
      </ContactSection>
    </Main>
    <Footer />
    </>
  );
}

const Main = styled.div`
  padding: 20px;
  h2 {
    margin-bottom: 10px;
  }
  p {
    margin: 5px 0;
  }
`;

const DateInfo = styled.div`
  margin: 8px 0 12px;
  
  .days {
    font-size: 16px;
    font-weight: 500;
    color: #007bff;
    margin-bottom: 4px;
    
    .number {
      font-weight: 700;
    }
  }
  
  .start-date {
    font-size: 14px;
    color: #666;
  }
`;

const Flex = styled.div`
  display: flex;
  align-items: center;
  gap: 20px; 
  .img_box {
    width: 80px;
    height: 80px;
    border-radius: 50%;
    overflow: hidden;
    img {
      width: 100%;
      height: auto;
    }
  }
  h2 {
    font-size: 18px;
    font-weight: 700;
  } 
`;

const LoadingWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 300px;
  font-size: 1.1rem;
  color: #666;
`;

const ErrorWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 300px;
  color: #ff4444;
  font-size: 1rem;
  padding: 0 20px;
  text-align: center;
`;

const InfoSection = styled.div`
  margin: 20px 0;
  padding: 15px;
  background: #f8f9fa;
  border-radius: 12px;
  
  .info-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 15px;
    
    h3 {
      font-size: 16px;
      font-weight: 600;
      color: #333;
    }

    .edit-btn {
      padding: 6px 12px;
      border: 1px solid #ddd;
      border-radius: 6px;
      background: white;
      color: #666;
      font-size: 13px;
      cursor: pointer;
      
      &:hover {
        background: #f1f1f1;
      }
    }
  }

  .info-content {
    p {
      margin: 8px 0;
      font-size: 15px;
      color: #666;
      
      span {
        margin-left: 4px;
        font-weight: 500;
        color: #2b2b2b;
      }
    }
  }

  .empty-state {
    text-align: center;
    padding: 20px 0;
    
    p {
      color: #888;
      margin-bottom: 12px;
      font-size: 14px;
    }

    .add-btn {
      padding: 8px 16px;
      background: #007bff;
      color: white;
      border: none;
      border-radius: 8px;
      font-size: 14px;
      cursor: pointer;
      transition: background-color 0.2s;

      &:hover {
        background: #0056b3;
      }
    }
  }
`;

const ContactSection = styled.div`
  margin-top: 20px;
  
  p {
    margin: 8px 0;
    font-size: 14px;
    color: #666;
    
    span {
      color: #2b2b2b;
    }
  }
`;
