import { getProductBySlug } from "@/db/models/product";
import { NextRequest, NextResponse } from "next/server";
import { ProductModel, ProductResponse } from "@/types/product.type";

export const GET = async (
  _request: NextRequest,
  { params }: { params: { slug: string } }
) => {
  const data = await getProductBySlug(params.slug);
  return NextResponse.json<ProductResponse<ProductModel>>({
    statusCode: 200,
    data: data,
  });
};
