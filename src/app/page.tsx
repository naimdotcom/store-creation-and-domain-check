"use client";
import FormLabelInfo from "@/components/FormLabelInfo";
import { MonitorIcon } from "@phosphor-icons/react";
import { useState } from "react";

type storeInput = {
  storeName: string;
  domain: string;
  location: string;
  category: string;
  currency: string;
  email: string;
};

export default function Home() {
  const [storeInfo, setStoreInfo] = useState<storeInput>({
    storeName: "",
    domain: "",
    location: "",
    category: "",
    currency: "",
    email: "",
  });

  const [validation, setValidation] = useState({
    storeName: "",
    domain: "",
    location: "",
    category: "",
    currency: "",
    email: "",
  });

  const handleOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setStoreInfo({ ...storeInfo, [name]: value });
  };
  return (
    <>
      <div className="min-h-screen bg-gray-200 flex items-center justify-center">
        <div className="bg-white p-8 rounded-md shadow">
          <div>
            <h1 className="text-3xl font-bold mb-4">Create a store</h1>
            <p>Add your basic store information and complete the setup</p>
          </div>
          <hr className="my-4 bg-black opacity-30" />

          {/* Form */}
          <div>
            {/* store name */}
            <div className="grid grid-cols-2 gap-2">
              <FormLabelInfo
                title="Give your online store a name"
                icon={<MonitorIcon color="blue" size={24} weight="bold" />}
                description="A great store name is a big part of your success. Make sure it aligns
with your brand and products."
              />
              <input
                type="text"
                name="storeName"
                placeholder="How'd you like to call your store?"
                className={`border px-2 py-1 rounded-md focus-visible:outline-none ${
                  validation.storeName ? "border-red-500" : "border-gray-300"
                }`}
              />
              {validation.storeName && (
                <span className="text-red-500">{validation.storeName}</span>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
