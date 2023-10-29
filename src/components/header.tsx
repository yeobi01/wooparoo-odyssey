import Image from "next/image";
import Link from "next/link";

import mainLogo from "@/assets/image/main-logo.png";
import channelTalkIcon from "@/assets/icon/channel-talk.svg";

export default function Header() {
  return (
    <header className="flex flex-row items-center justify-between h-[8vh] w-[100vw] px-8 bg-gray-100">
      <Link href="/">
        <Image src={mainLogo} alt="홈" width={80} height={40} />
      </Link>
      <Image src={channelTalkIcon} alt="홈" width={32} height={32} />
    </header>
  );
}
