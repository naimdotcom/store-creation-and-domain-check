"use client";
import FormLabelInfo from "@/components/FormLabelInfo";
import FormValidationMessage from "@/components/FormValidationMessage";
import { useDebounce } from "@/hooks/useDebounce";
import axiosInstance from "@/libs/axiosInstance";
import { GlobeHemisphereWestIcon, MonitorIcon } from "@phosphor-icons/react";
import { useState } from "react";
import countryjson from "@/data/country.json";

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
  const [isDomainAvailable, setIsDomainAvailable] = useState(false);

  const validateDomainInput = (domain: string) => {
    const domainRegex = /^(?!-)[a-zA-Z0-9-]{3,63}(?<!-)$/i;

    if (!domain) {
      setValidation((prev) => ({
        ...prev,
        domain: "Domain name is required.",
      }));
      setIsDomainAvailable(false);
      return false;
    }

    if (domain.length < 3) {
      setValidation((prev) => ({
        ...prev,
        domain: "Domain must be at least 3 characters.",
      }));
      setIsDomainAvailable(false);
      return false;
    }

    if (!domainRegex.test(domain)) {
      setValidation((prev) => ({
        ...prev,
        domain: "Invalid domain format.",
      }));
      setIsDomainAvailable(false);
      return false;
    }

    return true;
  };

  const checkDomain = async (domain: string) => {
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
      setIsDomainAvailable(false);
      setValidation((prev) => ({
        ...prev,
        domain: "Error checking domain availability.",
      }));
    }
  };

  const debouncedCheckDomain = useDebounce(checkDomain, 500);

  const handleOnChange = (
    e:
      | React.ChangeEvent<HTMLInputElement>
      | React.ChangeEvent<HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setStoreInfo({ ...storeInfo, [name]: value });
    console.log(name, value);
    if (name === "domain") {
      if (validateDomainInput(value)) {
        debouncedCheckDomain(value);
      }
    }
  };

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
                <div className="flex flex-col gap-1">
                  <input
                    type="text"
                    name="storeName"
                    placeholder="How'd you like to call your store?"
                    className={`border px-2 py-3.5 rounded-md focus-visible:outline-none ${
                      validation.storeName
                        ? "border-red-500"
                        : "border-gray-300"
                    }`}
                    value={storeInfo.storeName}
                    onChange={handleOnChange}
                  />
                  <FormValidationMessage message={validation.storeName} />
                </div>
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
                <div className="flex flex-col gap-1">
                  <div
                    className={`flex items-center border px-2 py-3.5 w-full rounded-md ${
                      validation.domain ? "border-red-500" : "border-gray-300"
                    } ${isDomainAvailable ? "border-green-500" : ""}`}
                  >
                    <input
                      type="text"
                      name="domain"
                      placeholder="enter your domain name"
                      className={`w-[90%] focus-visible:outline-none`}
                      value={storeInfo.domain}
                      onChange={handleOnChange}
                    />
                    <span className="text-gray-500">.expressitbd.com</span>
                  </div>
                  <FormValidationMessage message={validation.domain} />
                  {storeInfo.domain &&
                    !validation.domain &&
                    isDomainAvailable && (
                      <span className="text-green-500">
                        Domain is available.
                      </span>
                    )}
                </div>
              </div>

              {/* country */}
              <div className="grid grid-cols-1 md:grid-cols-2 items-center gap-2">
                <FormLabelInfo
                  title="Where's your store located?"
                  icon={<MonitorIcon color="blue" size={24} weight="bold" />}
                  description="Set your store's default location so we can optimize store access and speed for your customers."
                />
                <div className="flex flex-col gap-1">
                  <select
                    name="location"
                    id=""
                    className="border px-2 py-3.5 rounded-md focus-visible:outline-none border-gray-300"
                    value={storeInfo.location}
                    onChange={handleOnChange}
                  >
                    {countryjson
                      ? countryjson.map((country) => (
                          <option key={country.code} value={country.name}>
                            {country.name}
                          </option>
                        ))
                      : ""}
                  </select>
                  <FormValidationMessage message={validation.storeName} />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
