import React from "react";

import { useFormik } from "formik";
import * as Yup from "yup";
import axios from "axios";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

function Resigter() {
  const navigate = useNavigate();
  const formik = useFormik({
    initialValues: {
      useName: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
    validationSchema: Yup.object({
      username: Yup.string().required("Ten nguoi dung khong duoc de trong"),
      email: Yup.string()
        .email("Email ko hop le")
        .required("Email ko duoc de trong"),
      password: Yup.string()
        .min(8, "mat  khau phai co it nhat 8 ky tu")
        .required("Password ko duoc de trong"),
      confirmPassword: Yup.string()
        .oneOf([Yup.ref("password"), null], "mat khau khong trung khop")
        .required("xac nhan mat khau khong duoc de trong"),
    }),
    onSubmit: (value) => {
      const url = "http://localhost:8000/user";
      axios
        .post(url, value)
        .then((res) => {
          toast.success("Dang ky thanh cong");
          navigate("/login");
        })
        .catch((err) => {
          toast.error("Dang ky that bai");
        });
    },
  });

  return (
    <div>
      <div className="main">
        <form
          method="POST"
          className="form"
          id="form-1"
          onSubmit={formik.handleSubmit}
        >
          <h3 className="heading">Đăng ký thành viên mới</h3>
          <p className="desc">Chào mừng thành viên mới</p>
          <div className="spacer" />
          <div className="form-group">
            <label htmlFor="username" className="form-label">
              Họ và Tên
            </label>
            <input
              name="username"
              value={formik.values.username}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              type="text"
              placeholder="VD: Trần Văn A"
              className="form-control"
            />
            {formik.touched.username && formik.errors.username && (
              <span className="form-message">{formik.errors.username}</span>
            )}
          </div>
          <div className="form-group">
            <label htmlFor="email" className="form-label">
              Email
            </label>
            <input
              name="email"
              value={formik.values.email}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
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
              name="password"
              type="password"
              placeholder="Nhập mật khẩu"
              className="form-control"
            />
            {formik.touched.password && formik.errors.password && (
              <span className="form-message">{formik.errors.password}</span>
            )}
          </div>
          <div className="form-group">
            <label htmlFor="password_confirmation" className="form-label">
              Nhập lại mật khẩu
            </label>
            <input
              value={formik.values.confirmPassword}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              name="confirmPassword"
              placeholder="Nhập lại mật khẩu"
              type="password"
              className="form-control"
            />
            {formik.touched.confirmPassword &&
              formik.errors.confirmPassword && (
                <span className="form-message">
                  {formik.errors.confirmPassword}
                </span>
              )}
          </div>
          <button className="form-submit">Đăng ký</button>
          <div id="them">
            <span>Đã có tài khoản? </span>
            <span>
              <button onClick={() => navigate("/login")}>
                Đăng nhập tại đây!
              </button>
            </span>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Resigter;
