"use client";

import { useSearchParams } from "next/navigation";
import { Suspense } from "react";
const ErrorMessageComponent = () => {
  function ErrorMsg() {
    const searchParams = useSearchParams();
    const errorMsg = searchParams.get("error");
    return (
      <div>
        {errorMsg && <p className=" text-red-500 ml-2">{errorMsg}</p>}
      </div>
    )
  }

  return (
    <Suspense>
      <ErrorMsg />
    </Suspense>
  );
};

export default ErrorMessageComponent;
