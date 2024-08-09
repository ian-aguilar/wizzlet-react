export const InputText = ({ inputPlaceholder, inputLabel }: any) => {
  return (
    <div className="w-full mb-8">
      <label className="text-lg">{inputLabel}</label>
      <input
        className="border-0 border-b border-greyBorder w-full mb-1 py-1 outline-none focus:outline-none text-base "
        type="text"
        placeholder={inputPlaceholder}
      />
      <span className="text-red-500 text-xs"></span>
    </div>
  );
};
