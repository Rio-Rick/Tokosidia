"use client";

import { useRouter } from "next/navigation";

export default function SearchProducts() {
  const router = useRouter();
  return (
    <div className="basis-6/12 justify-center self-center">
      <form
      className="flex gap-2"
        action={(formdata: FormData) => {
          router.push(`/products?search=${formdata.get("search")}`);
        }}
      >
        <input
          type="text"
          name="search"
          placeholder="search"
          className="w-full rounded-md py-2.5 px-4 border-2 text-sm outline-[#4E454D] border-[#679DBD]"
        />
        <button type="submit">
          <img
            className="w-7"
            src="https://www.freeiconspng.com/uploads/search-icon-png-20.png"
            alt=""
          />
        </button>
      </form>
    </div>
  );
}
