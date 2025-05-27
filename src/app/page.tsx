"use client";
import FormLabelInfo from "@/components/FormLabelInfo";
import FormValidationMessage from "@/components/FormValidationMessage";
import { GlobeHemisphereWestIcon, MonitorIcon } from "@phosphor-icons/react";
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

  console.log("storeInfo", storeInfo);
  return (
    <>
      <div className="bg-gray-200">
        <div className="container min-h-screen mx-auto flex items-center justify-center">
          <div className="bg-white p-8 rounded-md shadow">
            <div>
              <h1 className="text-3xl font-bold mb-4">Create a store</h1>
              <p>Add your basic store information and complete the setup</p>
            </div>
            <hr className="my-4 bg-black opacity-30" />

            {/* Form */}
            <div className="space-y-8">
              {/* store name */}
              <div className="grid grid-cols-1 md:grid-cols-2 items-center gap-2">
                <FormLabelInfo
                  title="Give your online store a name"
                  icon={<MonitorIcon color="blue" size={24} weight="bold" />}
                  description="A great store name is a big part of your success. Make sure it aligns with your brand and products."
                />
                <input
                  type="text"
                  name="storeName"
                  placeholder="How'd you like to call your store?"
                  className={`border px-2 py-3.5 rounded-md focus-visible:outline-none ${
                    validation.storeName ? "border-red-500" : "border-gray-300"
                  }`}
                  onChange={handleOnChange}
                />
                <FormValidationMessage message={validation.storeName} />
              </div>

              {/* store subdomain */}
              <div className="grid grid-cols-1 md:grid-cols-2 items-center gap-2 ">
                <FormLabelInfo
                  title="Your online store subdomain"
                  icon={
                    <GlobeHemisphereWestIcon
                      color="blue"
                      size={24}
                      weight="fill"
                    />
                  }
                  description="A SEO-friendly store name is a crucial part of your success. Make sure it aligns with your brand and products."
                />
                <div
                  className={`flex items-center border px-2 py-3.5 w-full rounded-md ${
                    validation.domain ? "border-red-500" : "border-gray-300"
                  }`}
                >
                  <input
                    type="text"
                    name="domain"
                    placeholder="enter your domain name"
                    className={`w-[90%] focus-visible:outline-none`}
                    onChange={handleOnChange}
                  />
                  <span className="text-gray-500">.expressitbd.com</span>
                </div>
                <FormValidationMessage message={validation.domain} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
