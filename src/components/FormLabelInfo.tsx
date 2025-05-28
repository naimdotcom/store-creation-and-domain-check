import React from "react";

type Props = {
  title: string;
  description: string;
  icon: React.ReactNode; // note: it might need to change later based on the icon library
};

const FormLabelInfo = ({ title, description, icon }: Props) => {
  return (
    <>
      <div className="flex items-start gap-4 ">
        <div className="hidden md:block">
          <span>{icon}</span>
        </div>
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <span className="block md:hidden">{icon}</span>
            <h2 className="font-bold">{title}</h2>
          </div>
          {/* todo: fix the max width for the description */}
          <p className="text-black max-w-[500px]">{description}</p>
        </div>
      </div>
    </>
  );
};

export default FormLabelInfo;
