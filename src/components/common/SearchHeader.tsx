import { SearchIcon } from "@/assets/Svg";

export const SearchHeader = () => {
  return (
    <div className=" w-36 sm:w-52 lg:w-96 max-w-[90%] flex relative">
      <input
        type="text"
        placeholder="Search Here.."
        className="w-full bg-inputAuthBg/60 py-4 px-6 rounded-full focus:outline-none outline-none pl-16"
      />
      <div className="absolute top-5 left-5">
        <SearchIcon />
      </div>
    </div>
  );
};
