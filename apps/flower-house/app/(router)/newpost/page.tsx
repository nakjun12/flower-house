"use client";
import Image from "next/image";
import { useEffect, useState } from "react";
import NewpostHeader from "./_components/newpost-header";

export default function NewPostPage() {
  const [contents, setContents] = useState({
    image: "",
    title: "",
    description: ""
  });

  //컴포넌트가 마운트될 때 로컬 스토리지에서 이미지 데이터를 가져와 상태를 업데이트합니다.
  //localStorage 첫 마운트시 사용할 경우 발생하는 오류로 인해 수정하였습니다.
  useEffect(() => {
    const imgData = localStorage.getItem("prevImgData") || "";
    setContents((contents) => ({ ...contents, image: imgData }));
  }, []);

  return (
    <main className="flex flex-col items-center justify-center h-screen md:h-screen">
      <NewpostHeader />
      <div>
        <Image
          src={contents.image}
          alt="post-preview-img"
          width={200}
          height={200}
        />
      </div>
      <div>
        description
        <input type="text" defaultValue=";;" />
      </div>

      <div>위치 추가</div>
      <div>개화도</div>
      <div>날짜/시간</div>
      <div>비밀번호 입력</div>
      <button type="button">작성 완료</button>
    </main>
  );
}
