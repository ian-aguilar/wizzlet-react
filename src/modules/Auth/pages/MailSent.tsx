// ** packages **
import { useNavigate } from "react-router-dom";

// ** types **
import { RoutesPath } from "../types";

// ** types **
import Button from "@/components/form-fields/components/Button";

export const MailSent = ({ email }) => {
  const navigate = useNavigate();
  return (
    <div className="relative z-[99] bg-white py-6 lg:py-12 px-8 lg:px-24 rounded-xl overflow-hidden before:absolute before:w-[350px] before:h-[350px] before:bg-greenPrimary/15 before:blur-[85px] before:-top-[250px] before:left-1/2 before:-translate-x-1/2 before:z-[999]">
      <div className="titleContainer text-center relative z-30 ">
        <h1 className=" text-blackPrimary font-bold text-3xl md:text-[2.5rem] leading-normal ">
          {" "}
          Email Sent{" "}
        </h1>
        <p className="text-grayText text-lg md:text-2xl leading-tight ">
          We shared you the reset password link on your email
        </p>
        <p className="text-blackPrimary font-bold text-lg pt-2">{email}</p>
      </div>

      <div className=" pt-6 md:pt-9 pb-14 md:pb-32 text-center  ">
        <div className="inline-block">
          <svg
            width="118"
            height="118"
            viewBox="0 0 118 118"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <g clip-path="url(#clip0_381_6192)">
              <path
                d="M59 118C91.5848 118 118 91.5848 118 59C118 26.4152 91.5848 0 59 0C26.4152 0 0 26.4152 0 59C0 91.5848 26.4152 118 59 118Z"
                fill="#09A17A"
              />
              <path
                d="M86.979 33.0952L40.6548 68.0343L49.0669 88.3847C49.7122 89.9519 52.063 89.6062 52.2013 87.9237L53.561 72.6667C53.561 72.4823 53.6302 72.344 53.7454 72.2058L86.979 33.0952Z"
                fill="#FFFFFE"
              />
              <path
                d="M89.7907 28.7164L26.9188 55.6812C25.7204 56.2113 25.5821 57.8476 26.6884 58.5621L39.7099 66.8589L90.4591 28.532C90.2286 28.6011 89.9981 28.6242 89.7907 28.7164Z"
                fill="#FFFFFE"
              />
              <path
                d="M91.957 29.5461L55.543 72.4133C63.3328 75.7782 71.0996 79.143 78.8895 82.5079C79.8344 82.9227 80.9176 82.3696 81.125 81.3555L92.0492 30.5372C92.0953 30.2145 92.0723 29.8688 91.957 29.5461Z"
                fill="#FFFFFE"
              />
              <path
                d="M53.7454 87.3936L66.2598 78.7049L54.9438 73.842L53.7454 87.3936Z"
                fill="#FFFFFE"
              />
            </g>
            <defs>
              <clipPath id="clip0_381_6192">
                <rect width="118" height="118" fill="white" />
              </clipPath>
            </defs>
          </svg>
        </div>
      </div>

      <div className="text-center">
        <Button
          btnName="Back to login"
          btnClass="mt-9 !px-7  !w-auto !bg-white !border !border-grayLightBody/40 !text-black "
          type="submit"
          onClickHandler={() => navigate(RoutesPath.Login)}
        />
      </div>
    </div>
  );
};
