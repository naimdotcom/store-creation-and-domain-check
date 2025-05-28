import { StoreInput, ValidationErrors } from "@/types";

export const INITIAL_STORE_DATA: StoreInput = {
  storeName: "",
  domain: "",
  location: "",
  category: "",
  currency: "",
  email: "",
};

export const INITIAL_VALIDATION: ValidationErrors = {
  storeName: "",
  domain: "",
  location: "",
  category: "",
  currency: "",
  email: "",
};
