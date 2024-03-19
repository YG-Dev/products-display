interface GetProductsProps {
    page?: string;
    id?: string;
}

export interface ProductItem {
    id: number;
    name: string;
    year: number;
    color: string;
    pantone_value: string;
}

export interface ProductsResponse {
    isSuccessful?: boolean;
    status?: number;
    products?: {
        page: number;
        total_pages: number;
        data: ProductItem[] | ProductItem
    }
}


export async function getProducts(props?: GetProductsProps): Promise<ProductsResponse> {
    try {
        const response = await fetch('https://reqres.in/api/products?' + new URLSearchParams({
            per_page: '5', // Default, requested value
            page: props?.page || '',
            id: props?.id || ''
        }));

        if (response.ok) {
            const products = await response.json();

            return {
                isSuccessful: true,
                products
            };
        } else {
            return {
                isSuccessful: false,
                status: response.status
            };
        }
    } catch {
        return {
            isSuccessful: false,
        };
    }
    
}