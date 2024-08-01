import "@/App.css";
import "./index.css";
import MainLogo from "/images/logo.svg";
import { InputCommon } from "./components/common/InputCommon";
import { CheckboxCommon } from "./components/common/CheckboxCommon";
import { ButttonCommon } from "./components/common/ButttonCommon";
import { Link } from "react-router-dom";
import RouterComponent from "./router";
function App() {
  // return (
  //   <>
  //     <RouterComponent />
  //   </>
  // );

  return (
    <div className="bg-authPattern flex justify-center min-h-screen py-20 px-4">
      <div className="mainContentAuth  w-full md:w-[600px]">
        <div className="">
          <img src={MainLogo} className="mx-auto" alt="" />

          <div className="border-white border-[3px] relative z-[99] rounded-xl mt-8 sm:min-w-600 after:block after:z-[9] after:blur-[85px] after:absolute after:w-full after:h-full after:rounded-full after:bg-greenPrimary/30 after:top-20 after:left-0">
            {/* login start */}
            {/* <div className="relative z-[99] bg-white py-6 lg:py-12 px-8 lg:px-24 rounded-lg overflow-hidden before:absolute before:w-[350px] before:h-[350px] before:bg-greenPrimary/15 before:blur-[85px] before:-top-[250px] before:left-1/2 before:-translate-x-1/2 before:z-[999]">
              <div className="titleContainer text-center relative z-[9999] ">
                <h1 className=" text-blackPrimary font-bold text-3xl md:text-[2.5rem] leading-normal ">
                  {" "}
                  Welcome Back{" "}
                </h1>
                <p className="text-grayText text-lg md:text-2xl leading-tight ">
                  Please enter your details to sign in.
                </p>
              </div>

              <div className=" pt-6 md:pt-9 pb-14 md:pb-32">
                <InputCommon
                  InputClass=""
                  InputPlaceHolderText="Enter Your Email"
                />
                <InputCommon
                  InputClass=""
                  InputPlaceHolderText="**********"
                  InputEndIcon={
                    <svg
                      width="20"
                      height="20"
                      viewBox="0 0 20 20"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M12.1083 7.8916L7.8916 12.1083C7.34994 11.5666 7.0166 10.8249 7.0166 9.99993C7.0166 8.34993 8.34993 7.0166 9.99993 7.0166C10.8249 7.0166 11.5666 7.34994 12.1083 7.8916Z"
                        stroke="#242425"
                        stroke-width="1.5"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                      />
                      <path
                        d="M14.8501 4.8084C13.3918 3.7084 11.7251 3.1084 10.0001 3.1084C7.05845 3.1084 4.31678 4.84173 2.40845 7.84173C1.65845 9.01673 1.65845 10.9917 2.40845 12.1667C3.06678 13.2001 3.83345 14.0917 4.66678 14.8084"
                        stroke="#242425"
                        stroke-width="1.5"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                      />
                      <path
                        d="M7.0166 16.2751C7.9666 16.6751 8.97493 16.8917 9.99993 16.8917C12.9416 16.8917 15.6833 15.1584 17.5916 12.1584C18.3416 10.9834 18.3416 9.0084 17.5916 7.8334C17.3166 7.40006 17.0166 6.99173 16.7083 6.6084"
                        stroke="#242425"
                        stroke-width="1.5"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                      />
                      <path
                        d="M12.925 10.5833C12.7083 11.7583 11.75 12.7166 10.575 12.9333"
                        stroke="#242425"
                        stroke-width="1.5"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                      />
                      <path
                        d="M7.89175 12.1084L1.66675 18.3334"
                        stroke="#242425"
                        stroke-width="1.5"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                      />
                      <path
                        d="M18.3334 1.66675L12.1084 7.89175"
                        stroke="#242425"
                        stroke-width="1.5"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                      />
                    </svg>
                  }
                />

                <div className="flex flex-wrap gap-2 justify-between items-center">
                  <CheckboxCommon />
                  <a className="cursor-pointer text-greenPrimary bg-transparent p-0 border-none font-normal text-base leading-4 hover:underline hover:underline-offset-2  duration-300 transition-all">
                    Forgot Password?
                  </a>
                </div>

                <ButttonCommon BtnName="Sign in"  BtnClass="mt-9" />
              </div>

              <div className="text-center">
                <p className="text-grayText/70 font-medium text-base leading-4">
                  Don’t have an account yet?{" "}
                  <a className="text-grayText bg-transparent border-none p-0 font-semibold text-base leading-4 hover:underline hover:underline-offset-2 duration-300 transition-all cursor-pointer">
                    Signup
                  </a>
                </p>
              </div>
            </div> */}
            {/* login end */}

            {/* signup start */}
            {/* <div className="relative z-[99] bg-white py-6 lg:py-12 px-8 lg:px-24 rounded-lg overflow-hidden before:absolute before:w-[350px] before:h-[350px] before:bg-greenPrimary/15 before:blur-[85px] before:-top-[250px] before:left-1/2 before:-translate-x-1/2 before:z-[999]">
              <div className="titleContainer text-center relative z-[9999] ">
                <h1 className=" text-blackPrimary font-bold text-3xl md:text-[2.5rem] leading-normal ">
                  {" "}
                  Welcome{" "}
                </h1>
                <p className="text-grayText text-lg md:text-2xl leading-tight ">
                  Please enter your details to sign up.
                </p>
              </div>

              <div className=" pt-6 md:pt-9 pb-14 md:pb-32">
                <div className="grid grid-cols-12 md:gap-2">
                  <div className=" col-span-12 md:col-span-6">
                    <InputCommon
                      InputClass=""
                      InputPlaceHolderText=" First Name"
                    />
                  </div>
                  <div className=" col-span-12 md:col-span-6">
                    <InputCommon
                      InputClass=""
                      InputPlaceHolderText=" Last Name"
                    />
                  </div>
                </div>
                <InputCommon InputClass="" InputPlaceHolderText=" Email" />
                <InputCommon
                  InputClass=""
                  InputPlaceHolderText="**********"
                  InputEndIcon={
                    <svg
                      width="20"
                      height="20"
                      viewBox="0 0 20 20"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M12.1083 7.8916L7.8916 12.1083C7.34994 11.5666 7.0166 10.8249 7.0166 9.99993C7.0166 8.34993 8.34993 7.0166 9.99993 7.0166C10.8249 7.0166 11.5666 7.34994 12.1083 7.8916Z"
                        stroke="#242425"
                        stroke-width="1.5"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                      />
                      <path
                        d="M14.8501 4.8084C13.3918 3.7084 11.7251 3.1084 10.0001 3.1084C7.05845 3.1084 4.31678 4.84173 2.40845 7.84173C1.65845 9.01673 1.65845 10.9917 2.40845 12.1667C3.06678 13.2001 3.83345 14.0917 4.66678 14.8084"
                        stroke="#242425"
                        stroke-width="1.5"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                      />
                      <path
                        d="M7.0166 16.2751C7.9666 16.6751 8.97493 16.8917 9.99993 16.8917C12.9416 16.8917 15.6833 15.1584 17.5916 12.1584C18.3416 10.9834 18.3416 9.0084 17.5916 7.8334C17.3166 7.40006 17.0166 6.99173 16.7083 6.6084"
                        stroke="#242425"
                        stroke-width="1.5"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                      />
                      <path
                        d="M12.925 10.5833C12.7083 11.7583 11.75 12.7166 10.575 12.9333"
                        stroke="#242425"
                        stroke-width="1.5"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                      />
                      <path
                        d="M7.89175 12.1084L1.66675 18.3334"
                        stroke="#242425"
                        stroke-width="1.5"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                      />
                      <path
                        d="M18.3334 1.66675L12.1084 7.89175"
                        stroke="#242425"
                        stroke-width="1.5"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                      />
                    </svg>
                  }
                />
                <ButttonCommon BtnName="Submit" BtnClass="mt-9" />
              </div>

              <div className="text-center">
                <p className="text-grayText/70 font-medium text-base leading-4">
                  Already have an account?{" "}
                  <a className="text-grayText bg-transparent border-none p-0 font-semibold text-base leading-4 hover:underline hover:underline-offset-2 duration-300 transition-all cursor-pointer">
                    Signin
                  </a>
                </p>
              </div>
            </div> */}
            {/* signup end */}

            {/* forgot Password --  start */}
            {/* <div className="relative z-[99] bg-white py-6 lg:py-12 px-8 lg:px-24 rounded-lg overflow-hidden before:absolute before:w-[350px] before:h-[350px] before:bg-greenPrimary/15 before:blur-[85px] before:-top-[250px] before:left-1/2 before:-translate-x-1/2 before:z-[999]">
              <div className="titleContainer text-center relative z-[9999] ">
                <h1 className=" text-blackPrimary font-bold text-3xl md:text-[2.5rem] leading-normal ">
                  {" "}
                  Forgot Password{" "}
                </h1>
                <p className="text-grayText text-lg md:text-2xl leading-tight ">
                  Enter the email address associated with your account
                </p>
              </div>

              <div className=" pt-6 md:pt-9 pb-14 md:pb-32">
                <InputCommon
                  InputClass=""
                  InputPlaceHolderText=" Enter Registered Email Address"
                />

                <ButttonCommon BtnName="Reset Password" BtnClass="mt-9" />
              </div>

              <div className="text-center">
                <p className="text-grayText/70 font-medium text-base leading-4">
                  Don’t have an account yet?{" "}
                  <a className="text-grayText bg-transparent border-none p-0 font-semibold text-base leading-4 hover:underline hover:underline-offset-2 duration-300 transition-all cursor-pointer">
                    Signup
                  </a>
                </p>
              </div>
            </div> */}
            {/* forgot Password -- end */}

            {/* OTP verify --  start */}
            <div className="relative z-[99] bg-white py-6 lg:py-12 px-8 lg:px-24 rounded-lg overflow-hidden before:absolute before:w-[350px] before:h-[350px] before:bg-greenPrimary/15 before:blur-[85px] before:-top-[250px] before:left-1/2 before:-translate-x-1/2 before:z-[999]">
              <div className="titleContainer text-center relative z-[9999] ">
                <h1 className=" text-blackPrimary font-bold text-3xl md:text-[2.5rem] leading-normal ">
                  {" "}
                  Verify your email{" "}
                </h1>
                <p className="text-grayText text-lg md:text-2xl leading-tight ">
                  Please enter 4 Digit Code sent to
                </p>
                <p className="text-blackPrimary font-bold text-lg pt-2">
                  admin@gmail.com
                </p>
              </div>

              <div className=" pt-6 md:pt-9 pb-14 md:pb-32">
                <div className="grid grid-cols-12 gap-2">
                  <div className=" col-span-3">
                    <InputCommon
                      InputClass="text-center sm:py-5 !px-2 sm:!px-4 !text-blackPrimary !font-bold text-xl"
                      InputPlaceHolderText="0"
                    />
                  </div>
                  <div className=" col-span-3">
                    <InputCommon
                      InputClass="text-center sm:py-5 !px-2 sm:!px-4  !text-blackPrimary !font-bold text-xl"
                      InputPlaceHolderText="0"
                    />
                  </div>
                  <div className=" col-span-3">
                    <InputCommon
                      InputClass="text-center sm:py-5 !px-2 sm:!px-4  !text-blackPrimary !font-bold text-xl"
                      InputPlaceHolderText="0"
                    />
                  </div>
                  <div className=" col-span-3">
                    <InputCommon
                      InputClass="text-center sm:py-5 !px-2 sm:!px-4  !text-blackPrimary !font-bold text-xl"
                      InputPlaceHolderText="0"
                    />
                  </div>
                </div>

                <ButttonCommon BtnName="Confirm" BtnClass="mt-9" />
                <div className="text-center pt-9">
                  <a className="text-greenPrimary bg-transparent border-none p-0 font-semibold text-base leading-4 hover:underline hover:underline-offset-2 duration-300 transition-all cursor-pointer">
                    Resend Code
                  </a>
                </div>
              </div>

              <div className="text-center">
                <p className="text-grayText/70 font-medium text-base leading-4">
                  {" "}
                  <a className="inline-flex gap-4 items-center text-grayText bg-transparent border-none p-0 font-semibold text-base leading-4 hover:underline hover:underline-offset-2 duration-300 transition-all cursor-pointer">
                    {" "}
                    <svg
                      width="18"
                      height="18"
                      viewBox="0 0 18 18"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M7.1775 4.44751L2.625 9.00001L7.1775 13.5525"
                        stroke="#292D32"
                        stroke-width="1.5"
                        stroke-miterlimit="10"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                      />
                      <path
                        d="M15.3749 9H2.75244"
                        stroke="#292D32"
                        stroke-width="1.5"
                        stroke-miterlimit="10"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                      />
                    </svg>
                    Back to Login
                  </a>
                </p>
              </div>
            </div>
            {/* OTP verify --  end */}
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
