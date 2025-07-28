export interface OrderItemReadDTO {
  productId: string;
  productName: string;
  quantity: number;
  unitPrice: number;
  totalPrice: number;
}

export interface OrderReadDTO {
  id: string;
  customerId: string;
  orderDate: string;
  totalAmount: number;
  status: string;
  orderItems: OrderItemReadDTO[];
}

export interface GeneralResponse<T> {
  success: boolean;
  message?: string;
  data: T;
}
