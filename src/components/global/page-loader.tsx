import { CustomLoader } from "./custom-loader";

type Props = {};

export const PageLoader = (props: Props) => {
  return (
    <div className="fixed inset-0 z-[999999999] flex h-screen w-screen items-center justify-center bg-[#ffffff80] backdrop-blur-[8px]">
      <div className="p-4">
        <CustomLoader />
        <h2 className="f-w-400 my-3 text-center">Loading..</h2>
        <p className="mb-0 text-center">Please wait while we get your information from the web</p>
      </div>
    </div>
  );
};
