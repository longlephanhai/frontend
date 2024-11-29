/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import productCategory from '../../helpers/productCategory/productCategory';
import VerticalCard from '../../components/VerticalCard/VerticalCard';
import SummaryApi from '../../common';

const CategoryProduct = () => {
  const [data, setData] = useState([]);
  const navigate = useNavigate();
  const location = useLocation();
  const urlSearch = new URLSearchParams(location.search);
  const urlCategory = urlSearch.getAll("category");
  const urlCategoryObject = {};
  urlCategory.forEach(item => {
    urlCategoryObject[item] = true;
  });
  const [selectCategory, setSelectCategory] = useState(urlCategoryObject);
  const [filterCategory, setFilterCategory] = useState([]);
  const [sortProduct, setSortProduct] = useState("asc"); 

  const fetchData = async () => {
    const response = await fetch(SummaryApi.filterProduct.url, {
      method: SummaryApi.filterProduct.method,
      headers: {
        "content-type": "application/json"
      },
      body: JSON.stringify({
        category: filterCategory
      })
    });
    const dataResponse = await response.json();
    setData(dataResponse?.data || []);
  };

  const handleSelectCategory = (e) => {
    const { value, checked } = e.target;
    setSelectCategory(prev => ({
      ...prev,
      [value]: checked
    }));
  };

  const handleSort = (e) => {
    const { value } = e.target;
    setSortProduct(value);
  };

  useEffect(() => {
    fetchData();
  }, [filterCategory]);

  useEffect(() => {
    const arrayOfCategory = Object.keys(selectCategory).filter(categoryKeyName => selectCategory[categoryKeyName]);
    setFilterCategory(arrayOfCategory);

    const urlFormat = arrayOfCategory.map((el, index) => {
      if ((arrayOfCategory.length - 1) === index) {
        return `category=${el}`;
      }
      return `category=${el}&&`;
    });
    navigate("/product-category?" + urlFormat.join(""));
  }, [selectCategory]);

  useEffect(() => {
    // Sort the data based on sortProduct state
    if (sortProduct === 'asc') {
      setData(prev => [...prev].sort((a, b) => a.sellingPrice - b.sellingPrice));
    }
    if (sortProduct === 'desc') {
      setData(prev => [...prev].sort((a, b) => b.sellingPrice - a.sellingPrice));
    }
  }, [sortProduct]);

  return (
    <div className='container mx-auto p-4'>
      <div className='md:grid grid-cols-[200px,1fr]'>
        {/* left */}
        <div className='bg-white p-2 min-h-[calc(100vh-120px)] overflow-y-scroll'>
          {/* sort */}
          <div className=''>
            <h3 className='text-base uppercase font-medium text-slate-500 border-b pb-1 border-slate-300'>Sắp xếp</h3>
            <form className='text-sm flex flex-col gap-2 py-2'>
              <div className='flex items-center gap-3'>
                <input type='radio' name='sort' checked={sortProduct === 'asc'} onChange={handleSort} value={"asc"} />
                <label>Giá - Thấp đến cao</label>
              </div>

              <div className='flex items-center gap-3'>
                <input type='radio' name='sort' checked={sortProduct === 'desc'} onChange={handleSort} value={"desc"} />
                <label>Giá - Cao đến thấp</label>
              </div>
            </form>
          </div>

          {/* filter */}
          <div className=''>
            <h3 className='text-base uppercase font-medium text-slate-500 border-b pb-1 border-slate-300'>Thể loại</h3>
            <form className='text-sm flex flex-col gap-2 py-2'>
              {
                productCategory.map((categoryName, index) => (
                  <div key={index} className='flex items-center gap-3'>
                    <input checked={selectCategory[categoryName.value]} onChange={handleSelectCategory} type='checkbox' name={"category"} value={categoryName.value} id={categoryName.value} />
                    <label htmlFor={categoryName.value}>{categoryName.label}</label>
                  </div>
                ))
              }
            </form>
          </div>
        </div>

        {/* right */}
        <div className='px-4'>
          <p className='font-medium text-slate-800 text-lg my-2'>Kết quả tìm kiếm: {data.length}</p>
          <div className='min-h-[calc(100vh-120px)] overflow-y-scroll max-h-[calc(100vh-120px)]'>
            <VerticalCard data={data} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default CategoryProduct;
