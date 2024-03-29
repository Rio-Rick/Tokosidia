import { countTotalProduct, getProductsWithPagination } from "@/db/models/product";
import { NextRequest, NextResponse } from "next/server";
import { ProductModel, ProductResponse } from "@/types/product.type";

export const GET = async(request: NextRequest) => {
    const searchParams = request.nextUrl.searchParams;
    // console.log(searchParams.get("limit"))
    let search = searchParams.get('search')
    // console.log(searchParams);
    if(!search) {
        search =''
    }
    let limit = searchParams.get('limit')
    
    const data = await getProductsWithPagination(Number(limit), search)
    const limitData = await countTotalProduct()

    // console.log(data);
    return NextResponse.json<ProductResponse<ProductModel[]>>(
        {
            statusCode: 200,
            data: data,
            count: limitData
        }
    )
}