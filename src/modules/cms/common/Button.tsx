export const Button = ({ btnName, btnClass, btnEndIcon, BtnIconLeft, onClickHandler }: any) => {
  return (
    <button
      onClick={onClickHandler}
      className={`py-3 px-5 border rounded-md text-xl font-medium transition-all duration-300 hover:transition-all hover:duration-300 hover:brightness-110 flex gap-2 items-center ${btnClass}`}
    >
      {BtnIconLeft} {btnName} {btnEndIcon}
    </button>
  );
};
