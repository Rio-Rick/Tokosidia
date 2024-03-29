"use client";
import CardProduct from "@/components/CardProduct";
import { FetchProductClient, ProductModel } from "@/types/product.type";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import InfiniteScroll from "react-infinite-scroll-component";

const Products = () => {
  const [limit, setLimit] = useState(10);
  const [products, setProducts] = useState<ProductModel[]>([]);
  const [totalProduct, setTotalProduct] = useState(Infinity);
  const [status, setStatus] = useState(true);
  const searchParams = useSearchParams();
  const fetchData = async () => {
    let search = searchParams.get("search");
    if (!search) {
      search = "";
    }
    const response = await fetch(process.env.NEXT_PUBLIC_BASE_URL + `/api/products?limit=${limit}&search=${search}`,
      {
        cache: "no-store",
      }
    );
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const result: FetchProductClient<ProductModel[]> = await response.json();
    setTotalProduct(result.count);
    setProducts(result.data);
  };
  const nextPage = async () => {
    setLimit((limit) => limit + 10);
  };
  const setMoreData = async () => {
    if (limit > totalProduct) {
      setStatus(false);
    }
  };

  useEffect(() => {
    fetchData();
    setMoreData();
  }, [limit, searchParams]);

  return (
    <>
      <div className="mt-14"></div>
      <InfiniteScroll
        dataLength={products.length}
        next={nextPage}
        hasMore={status}
        loader={<h4 className=" text-center mt-20">Loading...</h4>}
        endMessage={
          <p className="mt-20 mb-14" style={{ textAlign: "center" }}>
            <b>Yay! You have seen it all</b>{" "}
          </p>
        }
      >
        <div className="pt-3 mx-20 w-max grid gap-2 gap-y-5 lg:grid-cols-5 md:grid-cols-3 sm:grid-cols-2">
          {products.map((product, idx) => (
            <CardProduct key={idx} product={product} />
          ))}
        </div>
      </InfiniteScroll>
    </>
  );
};

export default Products;
