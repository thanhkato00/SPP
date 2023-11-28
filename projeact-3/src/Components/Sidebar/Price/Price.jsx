import React from "react";
function Price({onSearch}) {
  const handlePriceFilter = (priceRange) => {
    console.log("Filtering by price:", priceRange);
    // Gửi yêu cầu tìm kiếm sản phẩm chỉ với giá tiền, không thay đổi màu sắc
    // onSearch({ price: priceRange });
    if(priceRange===null) {
      onSearch({ price:null});
    }else{
      onSearch({ price:priceRange});
    }
  }
  return (
    <div className="sidebar-container">
      <h2 className="sidebar-title price-title">Price</h2>
      <button className="btns"onClick={() => handlePriceFilter(null)}>All</button>
      <button className="btns"onClick={()=>handlePriceFilter({min:0,max:5000})}>0-5000</button>
      <button className="btns"onClick={()=>handlePriceFilter({min:5001,max:10000})}>5001-10000</button>
      <button className="btns"onClick={()=>handlePriceFilter({min:10001,max:15000})}>10001-15000</button>
      <button className="btns"onClick={()=>handlePriceFilter({min:15001,max:20000})}>15001-20000</button>
      <button className="btns"onClick={()=>handlePriceFilter({min:20001,max:25000})}>20001-25000</button>
      <button className="btns"onClick={()=>handlePriceFilter({min:25001,max:30000})}>25001-30000</button>
    </div>
  );
}

export default Price;
