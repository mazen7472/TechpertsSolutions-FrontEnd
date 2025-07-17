export type ProductStatus = 'None' | 'Available' | 'OutOfStock';

export interface IProduct {
  id: string;
  name: string;
  title?: string; // Optional: used in multiple templates
  description?: string; // Optional: shown in product cards/details
  link?: string; // Optional: used to link external product pages
  price: number;
  discountPrice: number;
  imageUrl: string;
  category?: string; // Used in product card display
  categoryName: string | null;
  subCategoryId: string;
  subCategoryName: string;
  status: ProductStatus;
}
export interface IPagedProducts {
  items: IProduct[];
  totalItems: number;
  pageNumber: number;
  pageSize: number;
  totalPages: number;
}
