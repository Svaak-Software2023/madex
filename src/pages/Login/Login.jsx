import { useEffect, useState } from "react";
import "./login.css";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { login } from "../../redux/features/authSlice";
import { useForm } from "react-hook-form";

function Login() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  // call auth state
  const auth = useSelector((state) => state.auth);
  // form submit handler function
  const submithandler = async (formData) => {
    dispatch(login({ formData, navigate }));
  };
  useEffect(() => {
    auth.user && navigate("/");
  });
  return (
    <>
      <div className="container p-0 bg-white my-3">
        <div className="row">
          <div className="col-lg-6 col-md-6 col-12">
            {/* <img src="https://img.freepik.com/free-vector/sign-concept-illustration_114360-125.jpg?w=740&t=st=1704959374~exp=1704959974~hmac=4e08288a4eed923d062d1fab1e1413084e13433654fa86813776f97d0130a2f1" alt="" className="img-fluid" /> */}
            <img
              src="/assets/login/Picture2.jpg"
              alt=""
              className="img-fluid"
            />
          </div>
          <div className="col-lg-6 col-md-6 col-12">
            <div className="loginMain py-lg-5">
              <div className="loginForm">
                <h3 className="userType">Login</h3>
                <form className="form" onSubmit={handleSubmit(submithandler)}>
                  <div className="mb-3">
                    <label htmlFor="email" className="label">
                      Username or Email
                    </label>
                    <input
                      id="text"
                      type="text"
                      className={`form-control  ${
                        errors.emailAndUserName ? "is-invalid" : ""
                      }`}
                      name="emailAndUserName"
                      {...register("emailAndUserName", { required: true })}
                    />
                    {errors.emailAndUserName && (
                      <div className="invalid-feedback mt-1">
                        Username or Email is required
                      </div>
                    )}
                  </div>

                  <div className="mb-3">
                    <label htmlFor="password" className="label">
                      Password
                    </label>
                    <input
                      id="password"
                      type="password"
                      className={`form-control ${
                        errors.password ? "is-invalid" : ""
                      }`}
                      name="password"
                      autoComplete="off"
                      {...register("password", { required: true })}
                    />
                    {errors.password && (
                      <div className="invalid-feedback mt-1">
                        Password is required
                      </div>
                    )}
                  </div>

                  {/* loading  */}
                  {auth.loading && (
                    <div className="d-flex justify-content-center">
                      <div className="spinner-border text-danger" role="status">
                        <span className="visually-hidden">Loading...</span>
                      </div>
                    </div>
                  )}

                  {/* showing error message  */}
                  {auth.error && auth.error.message && (
                    <p className="text-danger fw-bold text-center">
                      {auth.error.message}
                    </p>
                  )}

                  {/* showing Success mesage  */}
                  {auth.user && (
                    <p className="text-success fw-bold text-center">
                      {auth.message}
                    </p>
                  )}

                  <div className="forget-login mb-2">
                    <Link to="/forget-password">Forgot password</Link>
                  </div>
                  <div className="loginButton">
                    <button type="submit">Login</button>
                  </div>
                  <div className="links-login">
                    <p>
                      Don&apos;t have an account?{" "}
                      <Link to="/create-account">Sign Up</Link>
                    </p>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Login;
