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
      <button className="btns"onClick={()=>handlePriceFilter({min:10000,max:25000})}>10000-25000</button>
      <button className="btns"onClick={()=>handlePriceFilter({min:25001,max:50000})}>25001-50000</button>
      <button className="btns"onClick={()=>handlePriceFilter({min:50001,max:75000})}>50001-75000</button>
      <button className="btns"onClick={()=>handlePriceFilter({min:75001,max:99000})}>75001-99000</button>
    </div>
  );
}

export default Price;
