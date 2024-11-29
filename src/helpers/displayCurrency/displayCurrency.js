const displayVNDCurrency = (num) => {
  const vndValue = num;
  const formatter = new Intl.NumberFormat('vi-VN', {
    style: 'currency',
    currency: 'VND',
    minimumFractionDigits: 3, 
    maximumFractionDigits: 3
  });
  return formatter.format(vndValue);
}

export default displayVNDCurrency;
