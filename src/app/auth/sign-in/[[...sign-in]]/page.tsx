import { ClerkLoaded, SignIn } from "@clerk/nextjs";

type Props = {};

const SignIpPage = (props: Props) => {
  return (
    <div className="bg-[#F8F9FA] min-h-screen py-20">
      <div className="MuiBox-root css-1mwmt1e">
        <div className="MuiBox-root css-lx7ul2"></div>
        <div className="MuiBox-root css-v15yn9"></div>
      </div>
      <div className="flex items-center justify-center h-full">
        <ClerkLoaded>
          <SignIn />
        </ClerkLoaded>
      </div>
    </div>
  );
};

export default SignIpPage;
