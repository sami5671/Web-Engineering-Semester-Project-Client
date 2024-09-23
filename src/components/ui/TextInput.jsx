const TextInput = ({ title, ...attributes }) => {
  return (
    <>
      <label className="block text-sm font-medium text-gray-700">{title}</label>
      <input
        type="text"
        required
        className="mt-1 py-2 px-3 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-md border-2 sm:text-sm rounded-md"
        {...attributes}
      />
    </>
  );
};

export default TextInput;
