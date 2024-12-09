import { Field_Types } from "@/app/types";

export const getFieldComponent = (field: Field_Types) => {
  switch (field.type.toLowerCase()) {
    case "short answer":
    case "long answer":
      return (
        <div>
          <label>{field.label}</label>
          <textarea className="w-full" placeholder={field.placeholder} />;
        </div>
      );

    case "select":
      return (
        <select className="w-full">
          {field.options &&
            field.options.map((option, index) => (
              <option key={index}>{option}</option>
            ))}
        </select>
      );
    default:
      return (
        <input
          type={field.type}
          className="w-full"
          placeholder={field.placeholder}
        />
      );
  }
};
