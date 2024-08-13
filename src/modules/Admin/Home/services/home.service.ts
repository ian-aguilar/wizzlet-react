import { useAxiosGet, useAxiosPost } from "@/hooks/useAxios";
import { AxiosRequestConfig } from "axios";

const API_BASE_PATH = "/cms";

//  ** Get All Marketplace Listing **
export const usefetchHomeAPI = () => {
    // ** custom Hooks **
    const [callApi, { isLoading, isError, isSuccess }] = useAxiosGet();

    const getHomeAPI = async () => {
        return callApi(`${API_BASE_PATH}/homedata`);
    }

    return { getHomeAPI, isLoading, isError, isSuccess };
};


export const useHomeDataPostAPI = () => {
    const [callApi, { isLoading, isError, isSuccess }] = useAxiosPost();

    const homeDataPostAPI = async (
        data: object,
        config: AxiosRequestConfig<object> = {}
    ) => {
        return callApi(`${API_BASE_PATH}/home`, data, config);
    };
    return { homeDataPostAPI, isLoading, isError, isSuccess };
}