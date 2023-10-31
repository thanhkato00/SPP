// auth-context.js
import React, { createContext, useContext, useState } from "react";
export const ProductContext = createContext();
const AuthContext = createContext();
export function ProductProvider({ children }) {
  const [products, setProducts] = useState([]);

  // Thực hiện gọi API để lấy dữ liệu sản phẩm và cập nhật products khi cần

  return (
    <ProductContext.Provider value={{ products, setProducts }}>
      {children}
    </ProductContext.Provider>
  );
}
export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);

  const login = (userData) => {
    // Logic to handle user login, set user in state, etc.
    setUser(userData);
  };

  const logout = () => {
    // Logic to handle user logout, clear user from state, etc.
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
