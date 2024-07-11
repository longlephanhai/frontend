/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react'
import { Form, Input, Button, Row, Col, Card } from 'antd';
import SummaryApi from '../../common';
const Payment = () => {
  const { Item } = Form;
  const [cartItem, setCartItem] = useState([]);
  const [productList, setProductList] = useState([]);
  const fetchData = async () => {
    const response = await fetch(SummaryApi.addCartProductView.url, {
      method: SummaryApi.addCartProductView.method,
      credentials: 'include',
      headers: {
        "content-type": 'application/json'
      },
    })
    const responseData = await response.json()
    if (responseData.success) {
      setCartItem(responseData.data)
    }
  }
  useEffect(() => {
    fetchData()
  }, [])
  console.log("item in cart", cartItem);

  const fetchAllProduct = async () => {
    const response = await fetch(SummaryApi.allProduct.url)
    const dataResponse = await response.json()
    // console.log("productdaya", dataResponse)
    setProductList(dataResponse?.data || [])
  }
  useEffect(() => {
    fetchAllProduct()
  }, [])
  console.log("product list", productList);
  const getTotal = localStorage.getItem("total")
  const total = Number(getTotal);
  const [data, setData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    street: "",
    city: "",
    state: "",
    zipcode: "",
    country: "",
    phone: ""
  });
  const onChangeHandler = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setData(data => ({ ...data, [name]: value }))
  }

  const sendEmail = async (orderData) => {
    try {
      const response = await fetch(SummaryApi.sendEmai.url, {
        method: 'POST',
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          email: data.email,
          orderData
        })
      });

      const responseData = await response.json();
      if (responseData.success) {
        console.log("Email sent successfully.");
      } else {
        alert("Error: Failed to send email.");
      }
    } catch (error) {
      console.error("Error:", error);
      alert("Error: Something went wrong while sending the email. Please try again later.");
    }
  };
  const placeOrder = async (e) => {
    if (cartItem.length === 0) {
      alert("Your cart is empty. Please add items before placing an order.");
      return;
    }
    let orderItems = [];
    productList.forEach((product) => {
      // Kiểm tra xem sản phẩm có trong cartItem không
      const quantity = cartItem.find((item) => item.productId._id === product._id);
      if (quantity) {
        orderItems.push({
          productId: product._id,
          productName: product.productName,
          quantity: quantity.quantity,
          price: product.sellingPrice,
          image: product.productImage[0]
        });
      }
    });
    // Kiểm tra xem orderItems có dữ liệu không
    if (orderItems.length === 0) {
      alert("Your cart is empty or items are missing. Please add items before placing an order.");
      return;
    }
    console.log(orderItems);
    const orderData = {
      userId: cartItem[0].userId,
      address: data, // Kiểm tra định dạng của data
      items: orderItems,
      amount: total + 2,
    };

    try {
      const response = await fetch(SummaryApi.paymentProduct.url, {
        method: SummaryApi.paymentProduct.method,
        credentials: 'include',
        headers: {
          "content-type": "application/json"
        },
        body: JSON.stringify(orderData)
      })
      const responseData = await response.json()
      // console.log(responseData)
      if (responseData.success) {
        await sendEmail(orderData);
        const { session_url } = responseData;
        window.location.replace(session_url);
      } else {
        alert("Error: Failed to place order.");
      }
    } catch (error) {
      console.error("Error:", error);
      alert("Error: Something went wrong. Please try again later.");
    }
  };
  return (
      <Form onFinish={placeOrder} className='place-order min-h-[100vh]'>
        <Row gutter={24} style={{ backgroundColor: 'white' }}>
          <Col xxl={12} xl={12} lg={12} md={24} sm={24} xs={24} style={{ backgroundColor: 'white', padding: '20px' }}>
            <Card title="Delivery Information" bordered={false} style={{ height: '100%', border: 'none' }}>
              <Row gutter={16}>
                <Col span={12}>
                  <Item name='firstName' rules={[{ required: true, message: 'First name is required' }]}>
                    <Input name='firstName' onChange={onChangeHandler} value={data.firstName} placeholder='First name' />
                  </Item>
                </Col>
                <Col span={12}>
                  <Item name='lastName' rules={[{ required: true, message: 'Last name is required' }]}>
                    <Input name='lastName' onChange={onChangeHandler} value={data.lastName} placeholder='Last name' />
                  </Item>
                </Col>
              </Row>
              <Item name='email' rules={[{ required: true, type: 'email', message: 'Valid email is required' }]}>
                <Input name='email' onChange={onChangeHandler} value={data.email} placeholder='Email address' />
              </Item>
              <Item name='street' rules={[{ required: true, message: 'Street is required' }]}>
                <Input name='street' onChange={onChangeHandler} value={data.street} placeholder='Street' />
              </Item>
              <Row gutter={16}>
                <Col span={12}>
                  <Item name='city' rules={[{ required: true, message: 'City is required' }]}>
                    <Input name='city' onChange={onChangeHandler} value={data.city} placeholder='City' />
                  </Item>
                </Col>
                <Col span={12}>
                  <Item name='state' rules={[{ required: true, message: 'State is required' }]}>
                    <Input name='state' onChange={onChangeHandler} value={data.state} placeholder='State' />
                  </Item>
                </Col>
              </Row>
              <Row gutter={16}>
                <Col span={12}>
                  <Item name='zipcode' rules={[{ required: true, message: 'Zip code is required' }]}>
                    <Input name='zipcode' onChange={onChangeHandler} value={data.zipcode} placeholder='Zip code' />
                  </Item>
                </Col>
                <Col span={12}>
                  <Item name='country' rules={[{ required: true, message: 'Country is required' }]}>
                    <Input name='country' onChange={onChangeHandler} value={data.country} placeholder='Country' />
                  </Item>
                </Col>
              </Row>
              <Item name='phone' rules={[{ required: true, message: 'Phone number is required' }]}>
                <Input name='phone' onChange={onChangeHandler} value={data.phone} placeholder='Phone' />
              </Item>
            </Card>
          </Col>
          <Col xxl={12} xl={12} lg={12} md={24} sm={24} xs={24} style={{ backgroundColor: 'white', padding: '20px' }}>
            <Card title="Cart Totals" bordered={false} style={{ height: '100%', border: 'none' }}>
              <div className='cart-total'>
                <div className='cart-total-details'>
                  <p>Subtotal</p>
                  <p>{total}</p>
                </div>
                <hr />
                <div className='cart-total-details'>
                  <p>Delivery Fee</p>
                  <p>${total === 0 ? 0 : 2}</p>
                </div>
                <hr />
                <div className='cart-total-details'>
                  <p>Total</p>
                  <p>{total === 0 ? 0 : Number(total) + 2}</p>
                </div>
                <Button type='primary' htmlType='submit' style={{ marginTop: '20px', width: '100%' }}>PROCEED TO PAYMENT</Button>
              </div>
            </Card>
          </Col>
        </Row>
      </Form>
  )
}

export default Payment
