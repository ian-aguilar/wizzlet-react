// ** packages **
import { AxiosRequestConfig } from "axios";

// ** hooks **
import { useAxiosGet, useAxiosPost } from "@/hooks/useAxios";

const AUTH_API_BASE_PATH = "/auth";

//  ** Get Logged User Details **
export const useGetLoggedInUserAPI = () => {
  // ** custom Hooks **
  const [callApi, { isLoading, isError, isSuccess }] = useAxiosGet();

  const getLoggedInUserAPI = async (data: object) => {
    return callApi(`${AUTH_API_BASE_PATH}/get-user`, data);
  };

  return { getLoggedInUserAPI, isLoading, isError, isSuccess };
};

//  ** Register User **
export const useRegisterUserApi = () => {
  // ** custom Hooks **
  const [callApi, { isLoading, isError, isSuccess }] = useAxiosPost();

  const registerUserApi = async (
    data: object,
    config: AxiosRequestConfig<object> = {}
  ) => {
    return callApi(`${AUTH_API_BASE_PATH}/registration`, data, config);
  };

  return { registerUserApi, isLoading, isError, isSuccess };
};

//  ** Login User **
export const useLoginPostAPI = () => {
  const [callApi, { isLoading, isError, isSuccess }] = useAxiosPost();

  const loginPostAPI = async (
    data: object,
    config: AxiosRequestConfig<object> = {}
  ) => {
    return callApi(`${AUTH_API_BASE_PATH}/login`, data, config);
  };

  return { loginPostAPI, isLoading, isError, isSuccess };
};

// ** Verify OTP **
export const useVerifyPostAPI = () => {
  const [callApi, { isLoading, isError, isSuccess }] = useAxiosPost();

  const verifyPostAPI = async (
    data: object,
    config: AxiosRequestConfig<object> = {}
  ) => {
    return callApi(`${AUTH_API_BASE_PATH}/verify-otp`, data, config);
  };

  return { verifyPostAPI, isLoading, isError, isSuccess };
};

// ** Forgot Password **
export const useForgotPasswordPostAPI = () => {
  const [callApi, { isLoading, isError, isSuccess }] = useAxiosPost();

  const forgotPasswordPostAPI = async (
    data: object,
    config: AxiosRequestConfig<object> = {}
  ) => {
    return callApi(`${AUTH_API_BASE_PATH}/forgot-password`, data, config);
  };

  return { forgotPasswordPostAPI, isLoading, isError, isSuccess };
};
