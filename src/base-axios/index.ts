// ** Packages **
import axios, { AxiosRequestHeaders, InternalAxiosRequestConfig } from "axios";
import { Store } from "@reduxjs/toolkit";

// ** Redux **
import { ToastShow } from "@/redux/slices/toastSlice";

// ** Others **
import { VITE_APP_API_URL } from "@/config";

export const Axios = axios.create({ baseURL: `${VITE_APP_API_URL}` });

export const setupAxios = (store: Store) => {
  Axios.interceptors.request.use((request: InternalAxiosRequestConfig) => {
    const storeData = store.getState();
    const authToken = storeData.auth.token;

    if (authToken) {
      (
        request.headers as AxiosRequestHeaders
      ).Authorization = `Bearer ${authToken}`;
    }
    return request;
  });
  Axios.interceptors.response.use(
    (res) => {
      const toast = res?.data?.toast;
      if (toast) {
        store.dispatch(
          ToastShow({ message: res.data.message, type: res.data.response_type })
        );
      }
      return res;
    },
    (e) => {
      const toast = e?.response?.data?.toast;
      const message = e?.response?.data?.message;
      if (toast) {
        store.dispatch(
          ToastShow({
            message: message,
            type: e.response.data.response_type,
          })
        );
      }

      const storeData = store.getState();
      if (storeData.user.token !== null) {
        if (e?.response?.status === 401 || e?.response?.status === 403) {
          if (e.response.message) {
            store.dispatch(
              ToastShow({
                message: e.response.message,
                type: e.response.data.response_type,
              })
            );
          }
        }
      }
    }
  );
};

export default axios;
