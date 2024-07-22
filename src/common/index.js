// const backendDomin = "https://backend-jyob.onrender.com"
const backendDomin = "http://localhost:8080"
const SummaryApi = {
    signUp: {
        url: `${backendDomin}/api/signup`,
        method: "post"
    },
    signIn: {
        url: `${backendDomin}/api/signin`,
        method: "post"
    },
    current_user: {
        url: `${backendDomin}/api/user-details`,
        method: "get"
    },
    logout_user: {
        url: `${backendDomin}/api/userLogout`,
        method: "get"
    },
    allUser: {
        url: `${backendDomin}/api/all-user`,
        method: 'get'
    },
    updateUser: {
        url: `${backendDomin}/api/update-user`,
        method: 'post'
    },
    uploadProduct: {
        url: `${backendDomin}/api/upload-product`,
        method: `post`
    },
    allProduct: {
        url: `${backendDomin}/api/get-product`,
        method: 'get'
    },
    updateProduct: {
        url: `${backendDomin}/api/update-product`,
        method: 'post'
    },
    categoryProduct: {
        url: `${backendDomin}/api/get-categoryProduct`,
        method: 'get'
    },
    categoryWiseProduct: {
        url: `${backendDomin}/api/category-product`,
        method: 'post'
    },
    productDetails: {
        url: `${backendDomin}/api/product-details`,
        method: 'post'
    },
    addToCart: {
        url: `${backendDomin}/api/addtocart`,
        method: 'post'
    },
    addToCartProductCount: {
        url: `${backendDomin}/api/countAddToCartProduct`,
        method: 'get'
    },
    addCartProductView: {
        url: `${backendDomin}/api/view-cart-product`,
        method: 'get'
    },
    updateCartProduct: {
        url: `${backendDomin}/api/update-cart-product`,
        method: 'post'
    },
    deleteCart: {
        url: `${backendDomin}/api/delete-cart`,
        method: 'post'
    },
    searchProduct: {
        url: `${backendDomin}/api/search`,
        method: 'get'
    },
    filterProduct: {
        url: `${backendDomin}/api/filter-product`,
        method: 'post'
    },
    paymentProduct: {
        url: `${backendDomin}/api/place`,
        method: 'post'
    },
    verify: {
        url: `${backendDomin}/api/verify`,
        method: 'post'
    },
    userOrder: {
        url: `${backendDomin}/api/userorders`,
        method: 'get'
    },
    sendEmai: {
        url: `${backendDomin}/api/send-email`,
        method: 'post'
    },
    allOrder: {
        url: `${backendDomin}/api/all-order`,
        method: 'get'
    },
    updateStatus: {
        url: `${backendDomin}/api/status`,
        method: 'post'
    },
    getReview: {
        url: `${backendDomin}/api/productId`,
        method: 'post'
    },
    postReview: {
        url: `${backendDomin}/api/review`,
        method: 'post'
    },
    sendItemOrder: {
        url: `${backendDomin}/api/orderitem`,
        method: 'post'
    },
    getItemOrder:{
        url:`${backendDomin}/api/order-detail`,
        method:'post'
    },
    favoriteProduct:{
        url:`${backendDomin}/api/favorite`,
        method:'post'
    },
    listFavorite:{
        url:`${backendDomin}/api/listfavorite`,
        method:'post'
    },
    countFavorite:{
        url:`${backendDomin}/api/count-favorite`,
        method:'get'
    },
    deleteFavoriteProduct:{
        url:`${backendDomin}/api/deletefavorite`,
        method:'post'
    },
    forgotPassWord:{
        url:`${backendDomin}/api/forgot-password`,
        method:'post'
    },
    resetPassword:{
        url:`${backendDomin}/api/reset-password`,
        method:'post'
    }
}

export default SummaryApi