import React from "react";

const Loading = () => {
  return (
    <>
      <div class="h-[400px] z-50 flex justify-center items-center">
        <div class="animate-spin rounded-full h-8 w-8 border-b-2 border-base-300"></div>
      </div>
    </>
  );
};

export default Loading;
