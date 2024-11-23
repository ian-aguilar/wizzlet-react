import Button from '@/components/form-fields/components/Button';
import { SubmitHandler, useForm } from 'react-hook-form';
import { ShopifyAuthForm } from './types';
import { yupResolver } from '@hookform/resolvers/yup';
import { shopifyAuthFormSchema } from './validation-schema';
import Input from '@/components/form-fields/components/Input';
import { useShopifyAuthFormApi } from './services/productBasicForm.service';
import { toast } from 'react-toastify';

const ShopifyAuth = () => {
  const { shopifyAuthApi, isLoading: isLoadingSubmit } =
    useShopifyAuthFormApi();
  const {
    control,
    formState: { errors },
    handleSubmit
  } = useForm<ShopifyAuthForm>({
    resolver: yupResolver(shopifyAuthFormSchema),
    defaultValues: {
      shop: "",
    },
  });

  const onSubmit: SubmitHandler<ShopifyAuthForm> = async (payload) => {
    const newPayload = {
      ...payload
    };
    const { data, error } = await shopifyAuthApi(newPayload);
    if (error) {
      toast.error(error.message || "Something went wrong");
    }
    console.log(data);
  }
  return (
    <div>
      <form onSubmit={handleSubmit(onSubmit)} action="">
        <div className="relative w-full">
          <Input
            textLabelName="Shop / Store Name"
            placeholder="e.g hayowl"
            name="shop"
            type="text"
            control={control}
            errors={errors}
            className="pr-32" // Padding right to make space for the domain
          />
          <span className="absolute right-2 top-[50px] transform -translate-y-1/2 text-gray-500">
            .myshopify.com
          </span>
        </div>



        <Button
          btnName="Connect To Shopify"
          isLoading={isLoadingSubmit}
          type="submit"
          btnClass=" !w-auto p-2    text-white bg-green-500 rounded-md"
        />
      </form>
    </div>
  )
}

export default ShopifyAuth;