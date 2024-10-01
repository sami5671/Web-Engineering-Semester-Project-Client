import { FileInput } from "rizzui";

export default function InputFile({
  label,
  setFieldValue,
  setUploadButtonText,
}) {
  return (
    <div className="w-full">
      <FileInput
        label={<span className="text-white">{label}</span>}
        onChange={(event) => {
          const file = event.target.files[0];
          setFieldValue("image", file);
          setUploadButtonText(file ? file.name : "Upload Profile Picture");
        }}
        accept="image/*"
        inputClassName="text-white"
      />
    </div>
  );
}
