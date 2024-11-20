export const backendDomin = "https://backend-jyob.onrender.com"
// export const backendDomin = "http://localhost:8080"
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
  getItemOrder: {
    url: `${backendDomin}/api/order-detail`,
    method: 'post'
  },
  favoriteProduct: {
    url: `${backendDomin}/api/favorite`,
    method: 'post'
  },
  listFavorite: {
    url: `${backendDomin}/api/listfavorite`,
    method: 'post'
  },
  countFavorite: {
    url: `${backendDomin}/api/count-favorite`,
    method: 'get'
  },
  deleteFavoriteProduct: {
    url: `${backendDomin}/api/deletefavorite`,
    method: 'post'
  },
  forgotPassWord: {
    url: `${backendDomin}/api/forgot-password`,
    method: 'post'
  },
  resetPassword: {
    url: `${backendDomin}/api/reset-password`,
    method: 'post'
  },
  limitUser: {
    url: `${backendDomin}/api/limit-user`,
    method: 'get'
  },
  post: {
    url: `${backendDomin}/api/post`,
    method: 'post'
  },
  getPost: {
    url: `${backendDomin}/api/get-post`,
    method: 'get',
  },
  getPostById: {
    url: `${backendDomin}/api/getpostbyid`,
    method: 'post'
  },
  postList: {
    url: `${backendDomin}/api/post-list`,
    method: 'get'
  },
  changeAccept: {
    url: `${backendDomin}/api/change-accept`,
    method: 'patch'
  },
  postModal: {
    url: `${backendDomin}/api/post-modal`,
    method: 'post'
  },
  likePost: {
    url: `${backendDomin}/api/like-post`,
    method: 'post'
  },
  sendMessage: {
    url: `${backendDomin}/api/send-message`,
    method: 'post'
  },
  getMessageById: {
    url: `${backendDomin}/api/getmessagebyId`,
    method: 'post'
  },
  listMessage: {
    url: `${backendDomin}/api/list-message`,
    method: 'get'
  },
  getAdmin: {
    url: `${backendDomin}/api/get-admin`,
    method: 'get'
  },
  commentPost: {
    url: `${backendDomin}/api/comment-post`,
    method: 'post'
  },
  getComment: {
    url: `${backendDomin}/api/get-comment`,
    method: 'get'
  },
  findFriend: {
    url: `${backendDomin}/api/find`,
    method: 'get'
  },
  getUserByParams: {
    url: `${backendDomin}/api/your-profile/`,
    method: 'get'
  },
  getPostByParams: {
    url: `${backendDomin}/api//your-post/`,
    method: 'get'
  },
  notFriend: {
    url: `${backendDomin}/api/not-friend`,
    method: 'get'
  },
  request: {
    url: `${backendDomin}/api/request`,
    method: 'post'
  },
  requestList: {
    url: `${backendDomin}/api/request-list`,
    method: 'get'
  },
  acceptList: {
    url: `${backendDomin}/api/accept`,
    method: 'get',
  },
  friendList: {
    url: `${backendDomin}/api/friend-list`,
    method: 'get'
  },
  chatWithFriend: {
    url: `${backendDomin}/api/chat-with-friend/`,
    method: 'get'
  },
  getOneFriend: {
    url: `${backendDomin}/api/get-one-friend`,
    method: 'post'
  }
}

export default SummaryApi