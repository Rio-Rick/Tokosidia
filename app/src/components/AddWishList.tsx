"use client";
import Swal from "sweetalert2";
import { onWishList } from "@/app/products/[slug]/action";
import { ObjectId } from "mongodb";
export default function AddWishList ({ ProductId }: { ProductId: ObjectId }) {
  const handleWishList = async () => {
    try {
      await onWishList(ProductId);
    } catch (error) {
      if (error instanceof Error) {
        Swal.fire({
          title: "You already Wish list this product",
          text: error.message,
          icon: "error",
          confirmButtonText: "OK",
        });
      }
    }
  };

  return (
    <button
      className="pl-4 mt-2 border-2 pr-4 ml-4 rounded-md bg-slate-200"
      onClick={handleWishList}
    >
      Add to Wishlist
    </button>
  );
}
