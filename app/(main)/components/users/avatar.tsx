import React from "react";
import DummyImage from "@/public/dummy.png";
import Image from "next/image";

function Avatar() {
  return (
    <div className="relative">
      <div
        className="
        relative 
        inline-block
        w-auto
        border-white-[1px]
      "
      >
        <Image
          src={DummyImage}
          alt="avatar"
          width={38}
          height={38}
          className="rounded-full"
        />
        <span
          className="
          absolute 
          top-0 
          right-0 
          p-1 
          bg-green-400 
          rounded-full"
        />
      </div>
    </div>
  );
}

export default React.memo(Avatar);
