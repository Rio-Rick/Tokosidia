import CardProduct from "@/components/CardProduct";
import DetailInfo from "@/components/DetailInfo";
import Hero from "@/components/Hero";
import Navbar from "@/components/Navbar";
import { MainResponse, ProductModel } from "@/types/product.type";
import Link from "next/link";

const fetchProducts = async () => {
  const response = await fetch(process.env.NEXT_PUBLIC_BASE_URL +"/api/products", {
    cache: "no-store",
  });
  const responseJson: MainResponse<ProductModel[]> = await response.json();

  return responseJson;
};

export default async function Home() {
  const response = await fetchProducts();

  return (
    <main>
      {/* top */}
      <Navbar />

      {/* main */}
      {/* banner promo */}
      <Hero />
      {/* featured product */}
      <div className="border-t-2 mt-14">
        <div className="pt-3 mx-20 w-max grid gap-2 gap-y-5 lg:grid-cols-5 md:grid-cols-3 sm:grid-cols-2">
          {response.data?.map((product) => (
            <CardProduct key={product.slug} product={product} />
          ))}
        </div>
      </div>

      <div className="mt-10 justify-center flex ">
        <Link href="/products" className="border-2 p-2 bg-gray-400 rounded-lg">
          See-all
        </Link>
      </div>

      {/* ini Detail info e-commerce */}
      <div className="border-t-2 mt-10 mb-5"></div>
      <DetailInfo />
    </main>
  );
}
