import { useAxiosGet, useAxiosPost } from "@/hooks/useAxios";
import { AxiosRequestConfig } from "axios";

const API_BASE_PATH = "/cms";

//  ** Get All Marketplace Listing **
export const usefetchFaqAPI = () => {
    // ** custom Hooks **
    const [callApi, { isLoading, isError, isSuccess }] = useAxiosGet();

    const getFaqAPI = async () => {
        return callApi(`${API_BASE_PATH}/faqdata`);
    }

    return { getFaqAPI, isLoading, isError, isSuccess };
};


export const useFaqDataPostAPI = () => {
    const [callApi, { isLoading, isError, isSuccess }] = useAxiosPost();

    const faqDataPostAPI = async (
        data: object,
        config: AxiosRequestConfig<object> = {}
    ) => {
        return callApi(`${API_BASE_PATH}/faq`, data, config);
    };
    return { faqDataPostAPI, isLoading, isError, isSuccess };
}