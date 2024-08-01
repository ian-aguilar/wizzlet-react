import { IButtonProps } from "../types";

const Button = ({ btnName, type, className }: IButtonProps) => {
  return (
    <button className={className} type={type ? type : "button"}>
      {btnName}
    </button>
  );
};

export default Button;
