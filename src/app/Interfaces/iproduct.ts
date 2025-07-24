export type ProductStatus = 'None' | 'Pending' | 'Approved' | 'Rejected';

export interface ProductSpecification {
  id: string;
  key: string;
  value: string;
}

export interface Warranty {
  id: string;
  description: string;
  startDate: string;
  endDate: string;
}

export interface IProduct {
  id: string;
  name: string;
  title?: string;
  description?: string;
  link?: string;
  price: number;
  discountPrice: number;
  imageUrl: string;
  category?: string;
  categoryName: string | null;
  subCategoryId: string;
  subCategoryName: string;
  status: ProductStatus;
  stock?: number;
  specifications?: ProductSpecification[]; // <-- Add this
  warranties?: Warranty[];                 // <-- Optional, for future use
}
export interface GeneralResponce {
  data: IProduct;
  message:string;
  success:boolean;
}
export interface IPagedProducts {
  items: IProduct[];
  totalItems: number;
  pageNumber: number;
  pageSize: number;
  totalPages: number;
}
