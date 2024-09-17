export const InputText = ({
  inputPlaceholder,
  inputLabel,
  name,
}: {
  inputPlaceholder?: string;
  inputLabel?: string;
  name: string;
}) => {
  return (
    <div className="w-full mb-8">
      <label className="text-lg">{inputLabel}</label>
      <input
        className="border-0 border-b border-greyBorder w-full mb-1 py-1 outline-none focus:outline-none text-base "
        type="text"
        name={name}
        placeholder={inputPlaceholder}
      />
      <span className="text-red-600 font-medium text-sm"></span>
    </div>
  );
};
