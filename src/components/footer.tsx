import Image from "next/image";
import Link from "next/link";

import homeIcon from "@/assets/icon/home.svg";
import smileIcon from "@/assets/icon/smile.svg";
import crownIcon from "@/assets/icon/crown.svg";
import fireIcon from "@/assets/icon/fire.svg";

export default function Footer() {
  return (
    <footer className="flex flex-row items-center justify-between h-[8vh] w-[100vw] px-8 bg-gray-100">
      <Link href="/">
        <Image src={homeIcon} alt="홈" width={32} height={32} />
      </Link>
      <Link href="/data">
        <Image src={smileIcon} alt="홈" width={32} height={32} />
      </Link>
      <Link href="/battle">
        <Image src={crownIcon} alt="홈" width={32} height={32} />
      </Link>
      <Link href="/cross">
        <Image src={fireIcon} alt="홈" width={30} height={30} />
      </Link>
    </footer>
  );
}
