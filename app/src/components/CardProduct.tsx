import { ProductModel } from "@/types/product.type";
import Link from "next/link";
import AddWishList from "./AddWishList";
type Props = {
  product: ProductModel;
};
export default function CardProduct (props: Props) {
  const product = props.product;
  const rupiah = new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "idr",
  });

  return (
    <div className="border-2 w-64 h-full rounded-2xl flex flex-col drop-shadow">
      <div className="flex-1">
        <Link href={`/products/${product.slug}`}>
          <img className="size-full rounded-t-2xl" src={product.thumbnail} />
        </Link>
      </div>
      <div className="flex-1 p-2">
        <h1 className="font-bold">{product.name}</h1>
        <h1>{product.excerpt}</h1>
        <h1>{rupiah.format(product.price)}</h1>
        <div className="ml-7" >
          <AddWishList ProductId={product._id} />
        </div>
      </div>
    </div>
  );
}
