"use client";

import { useState } from "react";

import { 속성Type } from "@/types/woparoo_type";

import wooparooData from "@/assets/database/data.json";

import SelectBox from "@/components/antd/selectBox";
import WooparooSearchButton from "@/components/antd/wooparooSearchButton";

const 속성종류 = [
  "숲",
  "땅",
  "불",
  "물",
  "천둥",
  "바람",
  "얼음",
  "빛",
  "어둠",
  "황금",
];

const 강한속성: 속성Type = {
  숲: ["물", "빛"],
  땅: ["천둥", "어둠"],
  불: ["숲", "바람", "얼음"],
  물: ["불"],
  천둥: ["물", "황금"],
  바람: ["땅", "천둥"],
  얼음: ["숲"],
  빛: ["천둥", "어둠"],
  어둠: ["빛", "황금"],
  황금: ["땅", "얼음"],
};

const 약한속성: 속성Type = {
  숲: ["불", "얼음"],
  땅: ["바람", "황금"],
  불: ["물"],
  물: ["숲", "천둥"],
  천둥: ["땅", "바람", "빛"],
  바람: ["불"],
  얼음: ["불", "황금"],
  빛: ["숲", "어둠"],
  어둠: ["땅", "빛"],
  황금: ["천둥", "어둠"],
};

const 가능한_주속성_배열_얻기 = (상대속성_배열: string[]) => {
  let 가능한_주속성_배열: string[] = 속성종류.slice();

  for (const 상대속성 of 상대속성_배열) {
    const 상대가_강한속성_배열 = 강한속성[상대속성];

    for (const 상대가_강한속성 of 상대가_강한속성_배열) {
      가능한_주속성_배열 = 가능한_주속성_배열.filter(
        (가능한_주속성) => 가능한_주속성 !== 상대가_강한속성
      );
    }
  }

  return 가능한_주속성_배열;
};

const 가능한_부속성_배열_얻기 = (상대_주속성: string) => {
  let 가능한_부속성_배열: string[] = [];

  const 상대한테_강한속성_배열 = 약한속성[상대_주속성];

  for (const 상대한테_강한속성 of 상대한테_강한속성_배열) {
    가능한_부속성_배열.push(상대한테_강한속성);
  }

  return 가능한_부속성_배열;
};

export default function Home() {
  const [firstSelected, setFirstSelected] = useState<string>();
  const [secondSelected, setSecondSelected] = useState<string>();
  const [thirdSelected, setThirdSelected] = useState<string>();

  const [counterWooparoo, setCounterWooparoo] = useState<string[][]>([]);

  const 카운터_우파루_찾기 = (
    첫번째_우파루: string | undefined,
    두번째_우파루: string | undefined,
    세번째_우파루: string | undefined
  ) => {
    const 첫번째_우파루_속성_배열 = 첫번째_우파루?.match(/\(([^)]+)\)/);
    const 두번째_우파루_속성_배열 = 두번째_우파루?.match(/\(([^)]+)\)/);
    const 세번째_우파루_속성_배열 = 세번째_우파루?.match(/\(([^)]+)\)/);

    const 강한_우파루_얻기 = (
      우파루_속성_배열_인자: RegExpMatchArray | null | undefined
    ): string[] => {
      let 강한_우파루_배열: string[] = [];

      if (우파루_속성_배열_인자) {
        const 우파루_속성_배열 = 우파루_속성_배열_인자[1]
          .split(", ")
          .map((value) => value.trim());
        console.log(우파루_속성_배열);

        const 가능한_주속성_배열 = 가능한_주속성_배열_얻기(우파루_속성_배열);
        const 가능한_부속성_배열 = 가능한_부속성_배열_얻기(우파루_속성_배열[0]);

        for (const 가능한_주속성 of 가능한_주속성_배열) {
          for (const 가능한_부속성 of 가능한_부속성_배열) {
            wooparooData.forEach((wooparoo) => {
              if (
                wooparoo.메인 === 가능한_주속성 &&
                (wooparoo.보조1 === 가능한_부속성 ||
                  wooparoo.보조2 === 가능한_부속성)
              ) {
                강한_우파루_배열.push(wooparoo.이름);
              }
            });
          }
        }
      }
      return 강한_우파루_배열;
    };
    setCounterWooparoo([
      강한_우파루_얻기(첫번째_우파루_속성_배열),
      강한_우파루_얻기(두번째_우파루_속성_배열),
      강한_우파루_얻기(세번째_우파루_속성_배열),
    ]);
  };

  return (
    <main className="flex flex-col items-center h-[84vh] overflow-scroll">
      <h1 className="text-[2rem] font-bold mt-4">우파루 오디세이</h1>
      <h1 className="text-[2rem] leading-6 font-bold mb-6">결투 카운터 찾기</h1>

      {/* 상대방 우파루 찾는 검색바 */}
      <div className="flex flex-col w-[17rem] mb-4">
        <SelectBox
          placeholder="상대의 첫 번째 우파루를 선택해주세요."
          setSelected={setFirstSelected}
        />
        <div className="mb-2" />
        <SelectBox
          placeholder="상대의 두 번째 우파루를 선택해주세요."
          setSelected={setSecondSelected}
        />
        <div className="mb-2" />
        <SelectBox
          placeholder="상대의 세 번째 우파루를 선택해주세요."
          setSelected={setThirdSelected}
        />
      </div>

      {/* 우파루 클릭 버튼 */}
      <WooparooSearchButton
        onClick={() => {
          카운터_우파루_찾기(firstSelected, secondSelected, thirdSelected);
        }}
      />
      <div className="mb-4" />

      {/* 카운터 우파루 출력 */}
      <div>
        {counterWooparoo?.map((wooparoos, idx) => {
          return (
            <div key={idx} className="p-2 border">
              <div>{idx + 1}번째 우파루 카운터</div>
              {wooparoos?.map((wooparoo, idx2) => {
                return <div key={idx2}>{wooparoo}</div>;
              })}
            </div>
          );
        })}
      </div>
    </main>
  );
}
