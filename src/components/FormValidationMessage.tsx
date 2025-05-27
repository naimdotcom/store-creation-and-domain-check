import React from "react";

type Props = {
  message: string;
};

const FormValidationMessage = ({ message }: Props) => {
  return <>{message && <span className="text-red-500">{message}</span>}</>;
};

export default FormValidationMessage;
