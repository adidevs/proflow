import Image from "next/image";
import React from "react";

function Loader() {
  return (
    <div className=" z-50 fixed top-0 left-0 flex justify-center items-center h-screen w-full bg-opacity-20 bg-gray-600">
      <Image src="/loading.svg" alt="Loading" width={50} height={50} />
    </div>
  );
}

export default Loader;
