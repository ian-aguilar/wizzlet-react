const Checkbox = ({ checkLabel }: any) => {
  return (
    <>
      <div className="flex items-center">
        <input
          type="checkbox"
          className="h-4 w-4 rounded-[2px] border-solid border-gray-300 accent-greenPrimary hover:ring-greenPrimary duration-300 transition-all  "
        />
        <label className="ml-2 text-darkText font-medium text-base leading-4">
          {checkLabel}
        </label>
      </div>
    </>
  );
};

export default Checkbox;
