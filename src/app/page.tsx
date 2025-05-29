"use client";
import FormLabelInfo from "@/components/FormLabelInfo";
import FormValidationMessage from "@/components/FormValidationMessage";
import { useDebounce } from "@/hooks/useDebounce";
import axiosInstance from "@/libs/axiosInstance";
import {
  CurrencyCircleDollarIcon,
  EnvelopeSimpleIcon,
  GlobeHemisphereWestIcon,
  MapPinPlusIcon,
  MonitorIcon,
  ShapesIcon,
} from "@phosphor-icons/react";
import { useCallback, useEffect, useMemo, useState } from "react";
import countryjson from "@/data/country.json";
import categoryjson from "@/data/category.json";
import currencyJson from "@/data/currency.json";
import { validateEmail } from "@/utils/validation";
import { FormField, StoreInput, ValidationErrors } from "@/types";
import { INITIAL_STORE_DATA, INITIAL_VALIDATION } from "@/data/Constant";
import FormInputField from "@/components/FormInputField";
import FormSelectField from "@/components/FormSelectField";
import FormDomainField from "@/components/FormDomainField";
import axios from "axios";

export default function Home() {
  const [storeInfo, setStoreInfo] = useState<StoreInput>(INITIAL_STORE_DATA);
  const [validation, setValidation] =
    useState<ValidationErrors>(INITIAL_VALIDATION);
  const [isDomainAvailable, setIsDomainAvailable] = useState<boolean>(false);
  const [isFormValid, setIsFormValid] = useState<boolean>(false);

  const validateDomainInput = (domain: string): string => {
    const domainRegex = /^(?!-)[a-zA-Z0-9-]{3,63}(?<!-)$/i;

    if (!domain) return "Domain name is required.";
    if (domain.length < 3) return "Domain must be at least 3 characters.";
    if (!domainRegex.test(domain)) return "Invalid domain format.";

    return "";
  };

  const validateField = useCallback((name: string, value: string): boolean => {
    let error: string = "";

    switch (name) {
      case "storeName":
        if (!value.trim()) {
          error = "Store name is required.";
        } else if (value.trim().length < 3) {
          error = "Store name must be at least 3 characters long.";
        }
        break;

      case "domain":
        error = validateDomainInput(value);
        break;

      case "email":
        if (!value) {
          error = "Email is required.";
        } else if (validateEmail(value)) {
          error = "Invalid email format.";
        }
        break;

      case "location":
        if (!value) error = "Location is required.";
        break;

      case "category":
        if (!value) error = "Category is required.";
        break;

      case "currency":
        if (!value) error = "Currency is required.";
        break;
    }

    setValidation((prev) => ({ ...prev, [name]: error }));
    return error === "";
  }, []);

  const checkDomain = useCallback(async (domain: string) => {
    if (!domain.trim()) {
      setIsDomainAvailable(false);
      return;
    }

    try {
      const res = await axiosInstance.get(`${domain}.expressitbd.com`);
      const isTaken = res.data?.data?.taken;

      if (!isTaken) {
        setIsDomainAvailable(true);
        setValidation((prev) => ({ ...prev, domain: "" }));
      } else {
        setIsDomainAvailable(false);
        setValidation((prev) => ({ ...prev, domain: "Domain is taken." }));
      }
    } catch (error) {
      console.error("Domain check error:", error);
      setIsDomainAvailable(false);
      setValidation((prev) => ({
        ...prev,
        domain: "Error checking domain availability.",
      }));
    }
  }, []);

  const debouncedCheckDomain = useDebounce(checkDomain, 500);

  const handleOnChange = useCallback(
    (
      e:
        | React.ChangeEvent<HTMLInputElement>
        | React.ChangeEvent<HTMLSelectElement>
    ) => {
      const { name, value } = e.target;

      // Update state with functional update to avoid stale closure
      setStoreInfo((prev) => ({ ...prev, [name]: value }));

      // Validate the field
      const isValid = validateField(name, value);

      // Handle domain checking
      if (name === "domain" && isValid && value.trim()) {
        debouncedCheckDomain(value.trim());
      } else if (name === "domain" && !value.trim()) {
        setIsDomainAvailable(false);
      }
    },
    [validateField, debouncedCheckDomain]
  );

  useEffect(() => {
    const hasNoValidationErrors = !Object.values(validation).some(
      (msg) => msg !== ""
    );
    const allFieldsFilled = Object.values(storeInfo).every(
      (value) => value.trim() !== ""
    );
    const isDomainValid =
      validateDomainInput(storeInfo.domain) === "" && isDomainAvailable;

    setIsFormValid(hasNoValidationErrors && allFieldsFilled && isDomainValid);
  }, [storeInfo, validation, isDomainAvailable]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (isFormValid) {
      console.log("Creating store with data:", storeInfo);
      const payload = {
        name: storeInfo.storeName,
        currency: storeInfo.currency,
        domain: storeInfo.domain,
        email: storeInfo.email,
        country: storeInfo.location,
        category: storeInfo.category,
      };
      try {
        const res = await axios.post(
          "https://interview-task-green.vercel.app/task/stores/create",
          payload
        );
        console.log(res);
        if (res.status === 200) {
          alert("Store created successfully");
          setStoreInfo(INITIAL_STORE_DATA);
        }
      } catch (error) {
        console.error("Error creating store:", error);
      }
    }
  };

  const formFields: FormField[] = useMemo(
    () => [
      {
        name: "storeName",
        type: "input",
        inputType: "text",
        placeholder: "How'd you like to call your store?",
        title: "Give your online store a name",
        icon: <MonitorIcon color="blue" size={24} weight="bold" />,
        description:
          "A great store name is a big part of your success. Make sure it aligns with your brand and products.",
        value: storeInfo.storeName,
        error: validation.storeName,
      },
      {
        name: "domain",
        type: "domain",
        inputType: "text",
        placeholder: "Enter your domain name",
        title: "Your online store subdomain",
        icon: <GlobeHemisphereWestIcon color="blue" size={24} weight="fill" />,
        description:
          "A SEO-friendly store name is a crucial part of your success. Make sure it aligns with your brand and products.",
        value: storeInfo.domain,
        error: validation.domain,
        suffix: ".expressitbd.com",
        isDomainAvailable,
      },
      {
        name: "location",
        type: "select",
        title: "Where's your store located?",
        icon: <MapPinPlusIcon color="blue" size={24} weight="bold" />,
        description:
          "Set your store's default location so we can optimize store access and speed for your customers.",
        value: storeInfo.location,
        error: validation.location,
        options:
          countryjson?.map((country) => ({
            value: country.name,
            label: country.name,
          })) || [],
        placeholder: "Select a country",
      },
      {
        name: "category",
        type: "select",
        title: "What's your Category?",
        icon: <ShapesIcon color="blue" size={24} weight="bold" />,
        description:
          "Set your store's default category so that we can optimize store access and speed for your customers.",
        value: storeInfo.category,
        error: validation.category,
        options:
          categoryjson?.map((cat) => ({
            value: cat.value,
            label: cat.label,
          })) || [],
        placeholder: "Select a category",
      },
      {
        name: "currency",
        type: "select",
        title: "Choose store currency",
        icon: <CurrencyCircleDollarIcon color="blue" size={24} weight="bold" />,
        description: "This is the main currency you wish to sell in.",
        value: storeInfo.currency,
        error: validation.currency,
        options:
          Object.entries(currencyJson)?.map(([code, name]) => ({
            value: code,
            label: `(${code}) ${name}`,
          })) || [],
        placeholder: "Select a currency",
      },
      {
        name: "email",
        type: "input",
        inputType: "email",
        placeholder: "Enter your contact email",
        title: "Store contact email",
        icon: <EnvelopeSimpleIcon color="blue" size={24} weight="bold" />,
        description:
          "This is the email you'll use to send notifications to and receive orders from customers.",
        value: storeInfo.email,
        error: validation.email,
      },
    ],
    [storeInfo, validation, isDomainAvailable]
  );

  return (
    <>
      <div className="bg-gray-200">
        <div className="container min-h-screen mx-auto flex items-center justify-center">
          <div className="bg-white p-8 rounded-md shadow max-w-[1080px]">
            <div>
              <h1 className="text-3xl font-bold mb-4">Create a store</h1>
              <p>Add your basic store information and complete the setup</p>
            </div>
            <hr className="my-4 bg-black opacity-30" />

            {/* Form */}
            <form onSubmit={handleSubmit} className="space-y-6">
              {formFields.map((field) => (
                <div
                  key={field.name}
                  className="grid grid-cols-1 md:grid-cols-2 items-start gap-4"
                >
                  <FormLabelInfo
                    title={field.title}
                    icon={field.icon}
                    description={field.description}
                  />
                  <div className="flex flex-col gap-1">
                    {field.type == "domain" ? (
                      <FormDomainField
                        field={field}
                        onChange={handleOnChange}
                      />
                    ) : field.type == "select" ? (
                      <FormSelectField
                        field={field}
                        onChange={handleOnChange}
                      />
                    ) : (
                      <FormInputField field={field} onChange={handleOnChange} />
                    )}
                    <FormValidationMessage message={field.error} />
                  </div>
                </div>
              ))}

              <div className="flex sm:justify-end pt-4 ">
                <button
                  type="submit"
                  className={`bg-blue-500 w-full sm:w-fit text-white px-6 py-3 rounded-md font-medium transition-all ${
                    isFormValid
                      ? "hover:bg-blue-600 active:bg-blue-700"
                      : "opacity-50 cursor-not-allowed"
                  }`}
                  disabled={!isFormValid}
                >
                  Create Store
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}
