const API_URL = "http://localhost:5000/api/categories";

export interface Category {
  _id: string;
  name: string;
  description: string;
}

export const getCategories = async (): Promise<Category[]> => {
  const response = await fetch(API_URL);

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || "Kunde inte hämta kategorier");
  }

  return data;
};