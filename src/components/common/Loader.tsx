export const Loader = ({ loaderClass }: any) => {
  return (
    <div
      className={`fixed inset-0 w-full !h-screen z-[99999] backdrop-blur-sm bg-white/30 flex justify-center items-center ${loaderClass} `}
    >
      <div className="spinner"></div>
    </div>
  );
};
