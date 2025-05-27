"use client";
import FormLabelInfo from "@/components/FormLabelInfo";
import { Monitor } from "@phosphor-icons/react";
import Image from "next/image";

export default function Home() {
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
            <div>
              <FormLabelInfo
                title="Give your online store a name"
                icon={<Monitor size={32} weight="bold" />}
                description="A great store name is a big part of your success. Make sure it aligns
with your brand and products."
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
