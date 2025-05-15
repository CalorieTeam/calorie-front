import Header from "@/components/Header";   

export default function FindId() { 
  return (
    <>
      <Header title="아이디 찾기" showBackButton/> 
      <form className="inner_wrap" action="/api/find-id" method="POST"> 
        <div className="label">이름 <span className="require">*</span></div>
        <input type="text" id="member_name" name="member_name"/>
        <div className="label">전화번호 <span className="require">*</span></div>
        <input type="text" id="member_phone" name="member_phone"/>
        <button type="submit">아이디 찾기</button>
      </form>
    </>
  );
}