<<<<<<< HEAD
import { IProduct } from "./iproduct";

=======
>>>>>>> d83075c2677b91f5abf9fc0b47458cf5bc9c0a41
export interface IGeneralResponse<T> {
  success: boolean;
  message: string;
  data: T;
}

export interface ICategory {
  id: string;
  name: string;
<<<<<<< HEAD
  description:string;
  image:string;
  products:IProduct[];
  subCategory:any;
=======
>>>>>>> d83075c2677b91f5abf9fc0b47458cf5bc9c0a41
}

export interface ICategoryWithProducts {
  id: string;
  name: string;
  description: string;
  image: string | null;
  products: ICategoryProduct[];
  subCategories: any[];
}

export interface ICategoryProduct {
  id: string;
  name: string;
  imageUrl: string;
  price: number;
  specifications?: any[]; // Add specifications field
}

export interface ICategoryCreate {
  name: string;
}

export interface ICategoryUpdate {
  id: string;
  name: string;
}
