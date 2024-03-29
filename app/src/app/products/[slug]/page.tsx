import AddWishList from "@/components/AddWishList";
import ProductPicture from "@/components/ProductPicture";
import { MainResponse, ProductModel} from "@/types/product.type";

const fetchProduct = async (slug: string) => {
  const response = await fetch(process.env.NEXT_PUBLIC_BASE_URL+`/api/products/${slug}`, {
    cache: "no-store",
  });
  const product: MainResponse<ProductModel> = await response.json();
  if (!response.ok) {
    throw new Error(`FAILED_FETCH_PRODUCT`);
  }

  return product;
};
const DetailProduct = async ({ params }: { params: { slug: string } }) => {
  const product = await fetchProduct(params?.slug);
  const item = product.data 
  const rupiah = new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'idr' });

  return (
    <>
      <div className=" flex flex-row mt-10">
        <ProductPicture images={item.images} />
        <div className="flex-1">
          <h1 className="p-4 font-bold text-xl">{item?.name}</h1>
          <h1 className="pl-4 text-2xl font-bold">{rupiah.format(item?.price)}</h1>
          {/* <h1 className="pl-4">add to whistlist</h1> */}
          <AddWishList ProductId={item?._id} />
          <p className="border-t-2 mt-5 m-4"></p>
          <div className="m-4">
            <p className="pl-6">Detail</p>
            <p className="border-t-2 w-24"></p>
            <div className="flex gap-2" >
              <p>tags: </p>
              {item?.tags.map((tag, id) => (
                <p key={id}>#{tag}</p>
              ))}
            </div>
            <p className="mt-2">{item?.excerpt}</p>
            <p className="mt-2">{item?.description}</p>
          </div>
        </div>
      </div>
    </>
  );
};

export default DetailProduct;
