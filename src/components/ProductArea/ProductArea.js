/* eslint-disable no-script-url */
/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable jsx-a11y/img-redundant-alt */
import React from 'react';
// import './ProductArea.css'
import banner from '../../assest/assest/01.webp'
const ProductArea = () => {
    return (
        <section className="product-area product-discount-area">
            <div className="container-fluid px-24 pt-0 pb-0">
                <div className="flex flex-wrap">
                    <div className="w-full xl:w-9/12">
                        <div className="thumb hover:scale-105 transition-transform">
                            <div href="">
                                <img
                                    src={banner}
                                    alt="Image-HasTech"
                                    className="hover-img"
                                />
                            </div>
                        </div>
                    </div>
                    <div className="w-full xl:w-3/12 mt-4 xl:mt-0">
                        <div className="discount-product-slider owl-carousel owl-theme">
                            <div className="item">
                                <div className="product-item">
                                    <div className="inner-content discount-product">
                                        <div className="product-thumb">
                                            <a href="single-product.html">
                                                <img
                                                    src="assets/img/shop/01.jpg"
                                                    alt="Image-HasTech"
                                                />
                                                <img
                                                    className="second-image"
                                                    src="assets/img/shop/01-h1.jpg"
                                                    alt="Image-HasTech"
                                                />
                                            </a>
                                            <div className="product-action">
                                                <div className="addto-wrap">
                                                    <a
                                                        className="add-wishlist"
                                                        href="wishlist.html"
                                                        title="Add to wishlist"
                                                    >
                                                        <i className="icon-heart icon"></i>
                                                    </a>
                                                    <a
                                                        className="add-compare"
                                                        href="compare.html"
                                                        title="Add to compare"
                                                    >
                                                        <i className="icon-shuffle icon"></i>
                                                    </a>
                                                </div>
                                            </div>
                                            <ul className="product-flag">
                                                <li className="new">New</li>
                                                <li className="discount">-10%</li>
                                            </ul>
                                        </div>
                                        <div className="product-desc">
                                            <div className="product-info">
                                                <h4 className="title">
                                                    <a href="single-product.html">
                                                        Originals Kaval Windbreaker Winter Jacket
                                                    </a>
                                                </h4>
                                                <div className="star-content">
                                                    <i className="ion-md-star"></i>
                                                    <i className="ion-md-star"></i>
                                                    <i className="ion-md-star"></i>
                                                    <i className="ion-md-star"></i>
                                                    <i className="ion-md-star"></i>
                                                </div>
                                                <div className="prices">
                                                    <span className="price-old">€29.16</span>
                                                    <span className="price">€26.24</span>
                                                </div>
                                                <div
                                                    className="ht-countdown ht-countdown-style1 mt-9"
                                                    data-date="10/24/2023"
                                                ></div>
                                            </div>
                                            <div className="product-footer">
                                                <a
                                                    className="btn-product-add"
                                                    href="single-product.html"
                                                >
                                                    Add to cart
                                                </a>
                                                <a
                                                    className="btn-quick-view"
                                                    href="javascript:;"
                                                    title="Quick view"
                                                >
                                                    Quick view
                                                </a>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="item">
                                <div className="product-item">
                                    <div className="inner-content discount-product">
                                        <div className="product-thumb">
                                            <a href="single-product.html">
                                                <img
                                                    src="assets/img/shop/03.jpg"
                                                    alt="Image-HasTech"
                                                />
                                                <img
                                                    className="second-image"
                                                    src="assets/img/shop/03-h1.jpg"
                                                    alt="Image-HasTech"
                                                />
                                            </a>
                                            <div className="product-action">
                                                <div className="addto-wrap">
                                                    <a
                                                        className="add-wishlist"
                                                        href="wishlist.html"
                                                        title="Add to wishlist"
                                                    >
                                                        <i className="icon-heart icon"></i>
                                                    </a>
                                                    <a
                                                        className="add-compare"
                                                        href="compare.html"
                                                        title="Add to compare"
                                                    >
                                                        <i className="icon-shuffle icon"></i>
                                                    </a>
                                                </div>
                                            </div>
                                            <ul className="product-flag">
                                                <li className="new">New</li>
                                                <li className="discount">-5%</li>
                                            </ul>
                                        </div>
                                        <div className="product-desc">
                                            <div className="product-info">
                                                <h4 className="title">
                                                    <a href="single-product.html">
                                                        Madden by Steve Madden Cale 6
                                                    </a>
                                                </h4>
                                                <div className="star-content">
                                                    <i className="ion-md-star"></i>
                                                    <i className="ion-md-star"></i>
                                                    <i className="ion-md-star"></i>
                                                    <i className="ion-md-star"></i>
                                                    <i className="ion-md-star"></i>
                                                </div>
                                                <div className="prices">
                                                    <span className="price-old">€14.52</span>
                                                    <span className="price">€13.79</span>
                                                </div>
                                                <div
                                                    className="ht-countdown ht-countdown-style1 mt-9"
                                                    data-date="10/24/2023"
                                                ></div>
                                            </div>
                                            <div className="product-footer">
                                                <a
                                                    className="btn-product-add"
                                                    href="single-product.html"
                                                >
                                                    Add to cart
                                                </a>
                                                <a
                                                    className="btn-quick-view"
                                                    href="javascript:;"
                                                    title="Quick view"
                                                >
                                                    Quick view
                                                </a>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="item">
                                <div className="product-item">
                                    <div className="inner-content discount-product">
                                        <div className="product-thumb">
                                            <a href="single-product.html">
                                                <img
                                                    src="assets/img/shop/07.jpg"
                                                    alt="Image-HasTech"
                                                />
                                                <img
                                                    className="second-image"
                                                    src="assets/img/shop/07-h1.jpg"
                                                    alt="Image-HasTech"
                                                />
                                            </a>
                                            <div className="product-action">
                                                <div className="addto-wrap">
                                                    <a
                                                        className="add-wishlist"
                                                        href="wishlist.html"
                                                        title="Add to wishlist"
                                                    >
                                                        <i className="icon-heart icon"></i>
                                                    </a>
                                                    <a
                                                        className="add-compare"
                                                        href="compare.html"
                                                        title="Add to compare"
                                                    >
                                                        <i className="icon-shuffle icon"></i>
                                                    </a>
                                                </div>
                                            </div>
                                            <ul className="product-flag">
                                                <li className="new">New</li>
                                                <li className="discount">-20%</li>
                                            </ul>
                                        </div>
                                        <div className="product-desc">
                                            <div className="product-info">
                                                <h4 className="title">
                                                    <a href="single-product.html">
                                                        Juicy Couture Solid Sleeve Puffer Jacket
                                                    </a>
                                                </h4>
                                                <div className="star-content">
                                                    <i className="ion-md-star"></i>
                                                    <i className="ion-md-star"></i>
                                                    <i className="ion-md-star"></i>
                                                    <i className="ion-md-star"></i>
                                                    <i className="ion-md-star"></i>
                                                </div>
                                                <div className="prices">
                                                    <span className="price-old">€23.06</span>
                                                    <span className="price">€18.45</span>
                                                </div>
                                                <div
                                                    className="ht-countdown ht-countdown-style1 mt-9"
                                                    data-date="10/24/2023"
                                                ></div>
                                            </div>
                                            <div className="product-footer">
                                                <a
                                                    className="btn-product-add"
                                                    href="single-product.html"
                                                >
                                                    Add to cart
                                                </a>
                                                <a
                                                    className="btn-quick-view"
                                                    href="javascript:;"
                                                    title="Quick view"
                                                >
                                                    Quick view
                                                </a>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default ProductArea;
