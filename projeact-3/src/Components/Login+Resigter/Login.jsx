import React, { useState } from "react";

import { useFormik } from "formik";
import axios from "axios";
import { toast } from "react-toastify";
import * as Yup from "yup";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../auth-context";

function Login() {
  const { login } = useAuth();
  const navigate = useNavigate();
  const [data, setData] = useState([]);
  const url = "http://localhost:8000/user";
  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: Yup.object({
      email: Yup.string()
        .email("emaii khong hop le")
        .required("email khong duocc de trong"),
      password: Yup.string().required("password khong duocc de trong"),
    }),
    onSubmit: async (values) => {
      try {
        const reponse = await axios.get(url);
        let users = reponse.data;
        const user = users.find(
          (user) =>
            user.email === values.email && user.password === values.password
        );
        if (user) {
          toast.success("Dang nhap thanh cong");
          navigate("/homepage");
          login(user);
          console.log(user);
          localStorage.setItem("user", JSON.stringify(user));
        } else {
          toast.error("Dang nhap that bai");
        }
      } catch (err) {
        console.error("loi khi dang nhap");
      }
    },
  });

  return (
    <div>
      <div className="main">
        <form onSubmit={formik.handleSubmit} className="form" id="form-2">
          <h3 className="heading">Đăng Nhập</h3>
          <div className="spacer" />
          <div className="form-group">
            <label htmlFor="email" className="form-label">
              Email
            </label>
            <input
              value={formik.values.email}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              id="email"
              name="email"
              type="text"
              placeholder="VD: email@domain.com"
              className="form-control"
            />
            {formik.touched.email && formik.errors.email && (
              <span className="form-message">{formik.errors.email}</span>
            )}
          </div>
          <div className="form-group">
            <label htmlFor="password" className="form-label">
              Mật khẩu
            </label>
            <input
              value={formik.values.password}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              id="password"
              name="password"
              type="password"
              placeholder="Nhập mật khẩu"
              className="form-control"
            />
            {formik.touched.password && formik.errors.password && (
              <span className="form-message">{formik.errors.password}</span>
            )}
          </div>
          <button className="form-submit">Đăng Nhập</button>
          <div id="them">
            <span>
              Chưa có tài khoản?{" "}
              <span>
                <button onClick={() => navigate("/resigter")}>
                  Đăng ký tại đây!
                </button>
              </span>
            </span>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Login;
