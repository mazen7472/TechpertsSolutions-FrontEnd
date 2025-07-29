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
  pageNumber: number;
  pageSize: number;
  totalItems: number;
  totalPages: number;
  items: IProduct[];
}

export interface ProductCreateDTO {
  name: string;
  price: number;
  description?: string;
  stock: number;
  imageUrl?: string;
  subCategoryName?: string;
  discountPrice?: number;
  techCompanyId: string;
  specifications?: SpecificationDTO[];
  warranties?: WarrantyDTO[];
}

export interface ProductUpdateDTO extends Omit<ProductCreateDTO, 'techCompanyId'> {}

export interface SpecificationDTO {
  key: string;
  value: string;
}

export interface WarrantyDTO {
  durationInMonths: number;
  description: string;
}

export enum ProductCategory {
  Laptop = 'Laptop',
  Desktop = 'Desktop',
  Motherboard = 'Motherboard',
  CPUCooler = 'CPU Cooler',
  Case = 'Case',
  GraphicsCard = 'Graphics Card',
  RAM = 'RAM',
  Storage = 'Storage',
  CaseCooler = 'Case Cooler',
  PowerSupply = 'Power Supply',
  Monitor = 'Monitor',
  Accessories = 'Accessories',
  // Add more if needed
}

export enum ProductPendingStatus {
  Pending = 0,
  Approved = 1,
  Rejected = 2
}

export interface GeneralResponse<T> {
  success: boolean;
  message: string;
  data: T;
}
