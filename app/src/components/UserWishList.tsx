"use client";

import { MainResponse, ProductModel } from "@/types/product.type";
import { UserListType, WishListModel } from "@/types/wishList.type";
import { ObjectId } from "mongodb";
import Link from "next/link";
import { useEffect, useState } from "react";

const UserWishList = () => {
  const [data, setData] = useState<UserListType<WishListModel, ProductModel>>();
  const [removed, setRemoved] = useState(false)
  const fetchData = async () => {
    const response = await fetch(process.env.NEXT_PUBLIC_BASE_URL+"/api/wishlist", {
      cache: "no-store",
    });
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const responseJson: MainResponse<
      UserListType<WishListModel, ProductModel>
    > = await response.json();
    setData(responseJson.data);
  };

  useEffect(() => {
    fetchData();
    setRemoved(false)
  }, [removed]);

  async function handleUnwishlist(userId: ObjectId, productId: ObjectId) {
    await fetch(process.env.NEXT_PUBLIC_BASE_URL + `/api/wishlist?userId=${userId}&productId=${productId}`, {
      method: "POST",
    }); 
  }

  return (
    <>
      <div>
        <h1 className=" font-bold text-center text-3xl my-4">Your WishList</h1>
      </div>
      <div className="flex flex-col gap-2 mt-3 mb-11 items-center">
        {data?.productWishList.map((product) => (
          // <p key={product.slug}>bakso</p>
          <div
            key={product.slug}
            className="border-2 w-9/12 rounded-md flex justify-between"
          >
            <Link className="flex" href={`/products/${product.slug}`}>
              <div>
                <img
                  className="w-fit h-24 p-3 rounded-xl"
                  src={product.thumbnail}
                  alt=""
                />
              </div>
              <div className="p-3">
                <h1 className=" font-bold">{product.name}</h1>
                <p>{product.excerpt}</p>
              </div>
            </Link>
            <div className=" flex flex-row p-8 gap-3">
              <form
                action={() => {
                  handleUnwishlist(data._id, product._id);
                  setRemoved(true)
                }}
              >
                <button
                  type="submit"
                  className=" border-2 p-2 rounded-md bg-red-400 font-bold font-mono"
                >
                  Remove
                </button>
              </form>
            </div>
          </div>
        ))}
      </div>
    </>
  );
};

export default UserWishList;
