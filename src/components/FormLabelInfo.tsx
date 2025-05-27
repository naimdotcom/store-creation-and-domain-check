import React from "react";

type Props = {
  title: string;
  description: string;
  icon: React.ReactNode; // note: it might need to change later based on the icon library
};

const FormLabelInfo = ({ title, description, icon }: Props) => {
  return (
    <div>
      <div>
        <span>{icon}</span>
      </div>
      <div>
        <h2>{title}</h2>
        <p>{description}</p>
      </div>
    </div>
  );
};

export default FormLabelInfo;
