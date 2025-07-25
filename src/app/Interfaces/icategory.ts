export interface IGeneralResponse<T> {
  success: boolean;
  message: string;
  data: T;
}

export interface ICategory {
  id: string;
  name: string;
}

export interface ICategoryCreate {
  name: string;
}

export interface ICategoryUpdate {
  id: string;
  name: string;
}
