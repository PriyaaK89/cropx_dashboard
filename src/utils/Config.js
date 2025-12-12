const BASE_URL = `${process.env.REACT_APP_BASE_URL}`
console.log(BASE_URL,"base_url")

export const Config = {
    Login_url: `${BASE_URL}admin/signin`,
    get_products: `${BASE_URL}product/get-products`,
    get_Product_Details: `${BASE_URL}product/get-product-details`,
    add_product: `${BASE_URL}product/add-product`,
    add_product_details: `${BASE_URL}product/add-product-details`,
    update_product_details: `${BASE_URL}product/update-product-details`,
    update_product: `${BASE_URL}product/update-product`,
    delete_product: `${BASE_URL}product/delete-product`,
    get_categories: `${BASE_URL}category/get-category`,
    add_categories: `${BASE_URL}category/add-category`,
    get_product_by_id: `${BASE_URL}product/get-about-product`,
    add_single_variant: `${BASE_URL}product/add-variant`,
    add_multi_variant: `${BASE_URL}product/add-multipack`,
    update_sinlge_variant: `${BASE_URL}product/update`,
    update_multi_variant: `${BASE_URL}product/update-multipack`,
    get_banners: `${BASE_URL}banner/admin/get-banners`,
    add_banner: `${BASE_URL}banner/add-banner`,
    delete_banner: `${BASE_URL}banner/delete-banner`,
    delete_category: `${BASE_URL}category/delete-category`,
    get_users: `${BASE_URL}get-users`,
    Delete_Single_variant: `${BASE_URL}product/variant`,
    Order_List :  `${BASE_URL}admin/order-list`
}