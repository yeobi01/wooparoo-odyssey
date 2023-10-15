"use client";

import { useState } from "react";

import SelectBox from "@/components/antd/selectBox";
import WooparooSearchButton from "@/components/antd/wooparooSearchButton";

const Property = [
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

const strongPropertiesMap = [
  ["물", "빛"],
  ["천둥", "어둠"],
  ["숲", "바람", "얼음"],
  ["불"],
  ["물", "황금"],
  ["땅", "천둥"],
  ["숲"],
  ["천둥", "어둠"],
  ["빛", "황금"],
  ["땅", "얼음"],
];

const weakPropertiesMap = [
  ["불", "얼음"],
  ["바람", "황금"],
  ["물"],
  ["숲", "천둥"],
  ["땅", "바람", "빛"],
  ["불"],
  ["불", "황금"],
  ["숲", "어둠"],
  ["땅", "빛"],
  ["천둥", "어둠"],
];

const getMainProperties = (counterpartProperties: string[]) => {
  let mainProperties: string[] = Property.slice();

  for (const counterpartProperty of counterpartProperties) {
    const counterpartPropertyIndex = Property.indexOf(counterpartProperty);
    if (counterpartPropertyIndex === -1) continue;

    const counterpartPropertyStrongProperties =
      strongPropertiesMap[counterpartPropertyIndex];

    for (const counterpartPropertyStrongProperty of counterpartPropertyStrongProperties) {
      mainProperties = mainProperties.filter(
        (mainProperty) => mainProperty !== counterpartPropertyStrongProperty
      );
    }
  }

  console.log("mainProperties");
  console.log(mainProperties);

  return mainProperties;
};

const getSubProperties = (counterpartMainProperty: string) => {
  let subProperties: string[] = [];

  const counterpartPropertyIndex = Property.indexOf(counterpartMainProperty);
  if (counterpartPropertyIndex === -1) return "";

  const counterpartPropertyStrongProperties =
    weakPropertiesMap[counterpartPropertyIndex];

  for (const counterpartPropertyStrongProperty of counterpartPropertyStrongProperties) {
    subProperties.push(counterpartPropertyStrongProperty);
  }

  console.log("subProperties");
  console.log(subProperties);

  return subProperties;
};

const searchCounterWooparoo = (
  firstSelected: string | undefined,
  secondSelected: string | undefined,
  thirdSelected: string | undefined
) => {
  const firstMatches = firstSelected?.match(/\(([^)]+)\)/);
  const secondMatches = secondSelected?.match(/\(([^)]+)\)/);
  const thirdMatches = thirdSelected?.match(/\(([^)]+)\)/);

  if (firstMatches) {
    const extractedValues = firstMatches[1]
      .split(", ")
      .map((value) => value.trim());
    console.log(extractedValues);

    const mainProperties = getMainProperties(extractedValues);
    const subProperties = getSubProperties(extractedValues[0]);

    // mvp alert으로 일단 알려주기 대충..
    let alertData: string = "일단 대충 보여드립니다...\n\n";
    for (const mainProperty of mainProperties) {
      for (const subProperty of subProperties) {
        alertData += mainProperty + " " + subProperty + "\n";
      }
    }
    window.alert(alertData);
  }
  if (secondMatches) {
    const extractedValues = secondMatches[1]
      .split(", ")
      .map((value) => value.trim());
    console.log(extractedValues);
  }
  if (thirdMatches) {
    const extractedValues = thirdMatches[1]
      .split(", ")
      .map((value) => value.trim());
    console.log(extractedValues);
  }
};

export default function Home() {
  const [firstSelected, setFirstSelected] = useState<string>();
  const [secondSelected, setSecondSelected] = useState<string>();
  const [thirdSelected, setThirdSelected] = useState<string>();

  const [counterWooparoo, setCounterWooparoo] = useState<string[]>();

  return (
    <main className="flex items-center justify-center py-12 px-24">
      <div className="flex flex-col items-center">
        <h1 className="text-[2rem] font-bold">우파루 오디세이</h1>
        <h1 className="text-[2rem] leading-6 font-bold">결투 카운터 찾기</h1>
        <div className="h-4" />
        <div>아직은 첫 번째 칸만 사용해주세요..</div>
        <div className="h-6" />

        {/* 상대방 우파루 찾는 검색바 */}
        <div className="flex flex-col w-[17rem]">
          <SelectBox
            placeholder="상대의 첫 번째 우파루를 선택해주세요."
            setSelected={setFirstSelected}
          />
          <div className="h-2" />
          <SelectBox
            placeholder="상대의 두 번째 우파루를 선택해주세요."
            setSelected={setSecondSelected}
          />
          <div className="h-2" />
          <SelectBox
            placeholder="상대의 세 번째 우파루를 선택해주세요."
            setSelected={setThirdSelected}
          />
        </div>
        <div className="h-4" />

        {/* 우파루 클릭 버튼 */}
        <WooparooSearchButton
          onClick={() => {
            searchCounterWooparoo(firstSelected, secondSelected, thirdSelected);
          }}
        />
        <div className="h-4" />

        {/* 카운터 우파루 출력 */}
        <div>
          {counterWooparoo?.map((wooparoo, idx) => (
            <div key={idx}>{wooparoo}</div>
          ))}
        </div>
      </div>
    </main>
  );
}
