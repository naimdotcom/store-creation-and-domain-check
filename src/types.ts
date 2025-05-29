import { ReactNode } from "react";

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

type BaseField = {
  name: string;
  type: "input" | "select" | "domain";
  title: string;
  placeholder?: string;
  icon: ReactNode;
  description: string;
  value: string;
  error: string | null;
  inputType?: "text" | "email";
};

type InputField = BaseField & {
  type: "input";
  inputType: "text" | "email" | "password"; // Extend if needed
};

type SelectField = BaseField & {
  type: "select";
  options: {
    value: string;
    label: string;
  }[];
};

type DomainField = BaseField & {
  type: "domain";
  suffix: string;
  isDomainAvailable: boolean;
};

export type FormField = InputField | SelectField | DomainField;
