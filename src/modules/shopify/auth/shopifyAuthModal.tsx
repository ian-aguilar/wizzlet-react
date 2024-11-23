import { ModalCommon } from '@/components/common/ModalCommon'
import React from 'react'
import ShopifyAuth from '.';
interface ShopifyAuthModalProps {
    handleClose: () => void;
}
const ShopifyAuthModal: React.FC<ShopifyAuthModalProps> = ({
    handleClose,
}) => {
    return (
        <>
            <ModalCommon
                heading="Authenticate Shopify"
                onCancel={handleClose}
                onConfirm={handleClose}
                cancelButtonText=""
                confirmButtonText="Add"
            >
                <ShopifyAuth />
            </ModalCommon>
        </>
    )
}

export default ShopifyAuthModal