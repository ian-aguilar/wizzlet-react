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
      // inputStyle={"otp_input"}
      inputStyle={{
        flex: "center",
        border: "1px solid transparent",
        borderRadius: "8px",
        width: "54px",
        height: "54px",
        fontSize: "12px",
        color: "black",
        fontWeight: "400",
        textAlign: "center",
        textSizeAdjust: "xl",
      }}
      renderInput={(props) => <input {...props} />}
    />
  );
};

export default OtpInputField;
