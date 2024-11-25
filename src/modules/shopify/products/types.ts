
export type ShopifyProduct = {
    id: string;
    handle: string;
    title: string;
    description: string;
    availablePublicationsCount: {
        count: number;
        precision: string;
    }
    createdAt: Date;
    productType: string;
    tags: string[];
    totalInventory: number;
    variantsCount: {
        count: number;
        precision: string;
    }
    tracksInventory: boolean;
    updatedAt: Date;
    vendor: string;
    templateSuffix: string;
    status: string;
    onlineStoreUrl: string;
    onlineStorePreviewUrl: string;
    isGiftCard: boolean;
    legacyResourceId: string;
    publishedAt: string;
    images: ShopifyImageAttributeValue[];
    variants: ShopifyVariantAttributeType[];
    options: ShopifyOptionAttributeValue[];
};

export type ShopifyImageAttributeValue = {
    id: string;
    src: string;
    altText?: string;
    productId: string;
    userId: string;
};

export type ShopifyVariantAttributeType = {
    id: string;
    title: string;
    price: string;
    sku: string;
    variantId: string;
    inventoryQuantity: number;
    compareAtPrice?: string;
    displayName: string;
    createdAt: Date;
    updatedAt: Date;
    availableForSale: boolean;
    legacyResourceId: string;
    position?: number;
    image?: ShopifyVariantImage;
    shopifyProductId: string;
    productId: string;
    userId: string;
};
export type ShopifyVariantImage = {
    id: string;
    height?: string;
    width?: string;
}

export type ShopifyOptionAttributeValue = {
    id: string;
    name: string;
    values: string[];
    userId: string;
};