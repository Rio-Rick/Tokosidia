import { ProductModel } from "@/types/product.type";
import { getCollection } from "./getCollection";

export const getProducts = async () => {
  const db = await getCollection();
  const products = (await db
    .collection("products")
    .find()
    .toArray()) as ProductModel[];
  return products;
};

export const getProductBySlug = async (slug: string) => {
  const db = await getCollection();
  const product = (await db.collection("products").findOne({
    slug,
  })) as ProductModel;
  return product;
};

export const getProductsWithPagination = async (
  limit: number,
  search: string
) => {
  const db = await getCollection();

  if (!limit) {
    limit = 10;
  }
  const agg = [
    {
      $match: {
        name: { $regex: `.*${search}.*`}
      }
    }
  ]

  // const products = await db
  //   .collection("products")
  //   .find({
  //     name : `/${search}/`
  //   })
  //   .limit(limit)
  //   .toArray() as ProductModel[]
  // console.log(products);
  const products = await db
    .collection("products")
    .aggregate(agg)
    .limit(limit)
    .toArray() as ProductModel[]

  return products;
};

export const countTotalProduct = async () => {
  const db = await getCollection()
  const limit = await db.collection('products').countDocuments()
  return limit
}
