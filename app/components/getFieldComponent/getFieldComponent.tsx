import { Field_Types } from "@/app/types";

export const getFieldComponent = (field: Field_Types) => {
  switch (field.type.toLowerCase()) {
    case "short answer":
    case "long answer":
      return (
        <div className="w-full p-2">
          <label>{field.label}</label>
          <textarea
            className="w-full bg-transparent p-1"
            placeholder={field.placeholder}
          />
        </div>
      );

    case "select":
      return (
        <div className="flex flex-col w-full gap-2 ">
          <label>{field.label}</label>
          <select className="w-full bg-green-600 text-white p-0.5 rounded-sm text-sm">
            {field.options &&
              field.options.map((option, index) => (
                <option key={index} className="rounded-lg">
                  {option}
                </option>
              ))}
          </select>
        </div>
      );
    default:
      return (
        <div className="flex flex-col w-full gap-2 ">
          <label>{field.label}</label>
          <input
            type={field.type}
            className="w-full flex-1 bg-transparent p-0.5 rounded-sm text-sm"
            placeholder={field.placeholder}
          />
        </div>
      );
  }
};
