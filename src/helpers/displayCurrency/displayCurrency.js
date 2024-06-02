const displayUSDCurrency = (num) => {
    // Tỉ lệ chuyển đổi từ INR sang USD (tỷ giá hiện tại)
    // const exchangeRate = 0.014; // Ví dụ: tỷ giá 1 INR = 0.014 USD, bạn cần thay đổi tỷ giá này theo thực tế
    
    // Biến đổi giá trị từ INR sang USD
    const usdValue = num

    // Định dạng số USD với định dạng tiền tệ
    const formatter = new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD',
        minimumFractionDigits: 2
    });

    // Trả về giá trị số USD đã được định dạng
    return formatter.format(usdValue);
}

export default displayUSDCurrency;
