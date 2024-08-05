// ** Packages **
import OTPInput from "react-otp-input";

// ** types **
import { IOtpInputProps } from "../types";

const OtpInputField = ({ onChangeHandler, value }: IOtpInputProps) => {
  return (
    <OTPInput
      value={value}
      onChange={onChangeHandler}
      numInputs={6}
      renderSeparator={<span style={{ width: "8px" }}>-</span>}
      inputType="number"
      shouldAutoFocus={true}
      inputStyle={"otp_input"}
      renderInput={(props) => <input {...props} />}
    />
  );
};

export default OtpInputField;
