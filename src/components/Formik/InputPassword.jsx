import { Field } from "formik";
import { PiWarningCircleFill } from "react-icons/pi";
import { Password } from "rizzui";

export default function InputPassword({
  name,
  label,
  placeholder,
  required = true,
}) {
  return (
    <div className="w-full">
      <Field name={name}>
        {({ field, meta }) => (
          <Password
            {...field}
            label={
              <span className="text-white">
                {label} {required && <span className="text-red-600">*</span>}
              </span>
            }
            placeholder={placeholder}
            autoComplete="off"
            error={
              meta.touched &&
              meta.error && (
                <div className="mt-1 text-xs text-red-500">
                  <span className="flex items-center gap-1">
                    <PiWarningCircleFill className="text-xl" />
                    {meta.error}
                  </span>
                </div>
              )
            }
            inputClassName={`${
              meta.touched && meta.error
                ? "!border-red-500 ring-0 text-white"
                : "border-gray-200 text-white"
            }`}
          />
        )}
      </Field>
    </div>
  );
}
