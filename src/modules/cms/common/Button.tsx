export const Button = ({ btnName, btnClass, btnEndIcon }: any) => {
  return (
    <button
      className={` py-3 px-5 border   rounded-[10px]  text-xl font-medium    transition-all duration-300 hover:transition-all hover:duration-300 hover:brightness-110 flex gap-2 items-center  ${btnClass} `}
    >
      {btnName} {btnEndIcon}
    </button>
  );
};
