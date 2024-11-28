import { ModalCommon } from '@/components/common/ModalCommon'
import React from 'react'
import ShopifyAuth from '.';
import { ShopifyProfileAttributeType } from './types';
interface ShopifyAuthModalProps {
    handleClose: () => void;
    shopifyProfiles?:ShopifyProfileAttributeType[];
    isLoading?:boolean;
    setSelectedShopifyProfile :(shopifyProfile: ShopifyProfileAttributeType) => void;
}
const ShopifyAuthModal: React.FC<ShopifyAuthModalProps> = ({
    handleClose,
    isLoading,
    shopifyProfiles,
    setSelectedShopifyProfile
}) => {
    return (
        <>
            <ModalCommon
                heading="Authenticate Shopify"
                onCancel={handleClose}
                onConfirm={handleClose}
                cancelButtonText=""
                confirmButtonText=""
                modalSizeInX='4'
            >
                <ShopifyAuth setSelectedShopifyProfile={setSelectedShopifyProfile} isLoading = {isLoading} shopifyProfiles={shopifyProfiles} />
            </ModalCommon>
        </>
    )
} 

export default ShopifyAuthModal