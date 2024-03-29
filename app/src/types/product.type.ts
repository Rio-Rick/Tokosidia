import { ObjectId } from "mongodb";

export type ProductModel = {
  _id: ObjectId;
  name: string;
  slug: string;
  excerpt: string;
  description: string;
  price: number;
  tags: string[];
  thumbnail: string;
  images: string[];
  createdAt: Date;
  updatedAt: Date;
};

export type ProductResponse<T> = {
  statusCode: number;
  message?: string;
  data?: T;
  error?: string;
  count?: number;
};

export type MainResponse<T> ={
  statusCode: number
  data: T
}

export type FetchProductClient<T> ={
  statusCode: number
  data: T
  count: number
}


