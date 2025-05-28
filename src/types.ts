export interface StoreInput {
  storeName: string;
  domain: string;
  location: string;
  category: string;
  currency: string;
  email: string;
}

export interface ValidationErrors {
  storeName: string;
  domain: string;
  location: string;
  category: string;
  currency: string;
  email: string;
}
