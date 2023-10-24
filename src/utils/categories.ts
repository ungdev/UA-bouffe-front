import { API } from './api';
import { Category } from "@/types";

export const getCategories = async () => {
  const request = await API.get<Array<Category>>('/categories');
  const categories = request.data;

  return categories;
};
