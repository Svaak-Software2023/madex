import { useEffect, useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import "./create_acoount.css"
import { useDispatch, useSelector } from "react-redux";
import { createAccount } from "../../redux/featurs/authSlice";
import { useForm } from "react-hook-form";

function CreateAccount() {
    const navigate = useNavigate()
    const dispatch = useDispatch({});

    const { register, handleSubmit, formState: { errors } } = useForm();

    const auth = useSelector((state) => state.auth)

    const [file, setFile] = useState({
        avatar: [],
        coverImage: []
    })


    // file change handler 
    const fileChangeHandler = (e) => {
        const name = e.target.name;
        setFile({ ...file, [name]: e.target.files[0] });
    }

    // submit function 
    const submithandler = async (formData) => {
        let data = new FormData()
        data.append("avatar", file.avatar)
        data.append("coverImage", file.coverImage)

        for (const key in formData) {
            data.append(key, formData[key])
        }

        dispatch(createAccount({ data, navigate }))
    }
    const load = useSelector((state) => state.auth.loading)

    useEffect(() => {
        auth.user && navigate("/second-home")
    }, [])
    return (
        <>
            <div className="container p-0 bg-white my-3">
                <div className="row">
                    {/* <div className="col-lg-6 col-md-6 col-12">
                        <LazyLoadImage src="https://media.istockphoto.com/id/1281150061/vector/register-account-submit-access-login-password-username-internet-online-website-concept.jpg?s=612x612&w=0&k=20&c=9HWSuA9IaU4o-CK6fALBS5eaO1ubnsM08EOYwgbwGBo=" alt="" className="img-fluid" />
                    </div> */}
                    <div className="col-lg-12 col-md-12 col-12">
                        <div className="p-lg-5 p-3" >
                            <div className='px-lg-5'>
                                <h3 className="userType">Create Account</h3>
                                <form onSubmit={handleSubmit(submithandler)}>
                                    <div className="row">

                                        <div className="col-lg-6 col-12 mb-3">
                                            <label htmlFor="username" className="label">Username<span>*</span></label>
                                            <input id='username'
                                                type="text"
                                                className={`form-control  ${errors.username ? "is-invalid" : ""}`}
                                                name='username'
                                                autoComplete="off"
                                                {...register("username", { required: true })}
                                            />
                                            {errors.username && (
                                                <span className="text-danger mt-0">Username is required</span>
                                            )}
                                        </div>

                                        <div className="col-lg-6 col-12 mb-3">
                                            <label htmlFor="fullname" className="label">Full Name<span>*</span></label>
                                            <input id='fullName'
                                                type="text"
                                                className={`form-control ${errors.fullName ? "is-invalid" : ""}`}
                                                name='fullName'
                                                autoComplete="off"
                                                {...register("fullName", { required: true })}
                                            />
                                            {errors.fullName && (
                                                <span className="text-danger mt-0">Full Name is required</span>
                                            )}
                                        </div>

                                        <div className="col-lg-12 col-12 mb-3">
                                            <label htmlFor="email" className="label">Email Id <span>*</span></label>
                                            <input
                                                id='email'
                                                type="email"
                                                className={`form-control ${errors.email ? "is-invalid" : ""}`}
                                                name='email'
                                                autoComplete="off"
                                                {...register("email", { required: true })}
                                            />
                                            {errors.email && (
                                                <span className="text-danger mt-0">Email is required</span>
                                            )}
                                        </div>

                                        <div className="col-lg-6 col-12 mb-3">
                                            <label htmlFor="password" className="label">Password <span>*</span></label>
                                            <input id='password'
                                                type="password"
                                                className={`form-control ${errors.password ? "is-invalid" : ""}`} name='password'
                                                autoComplete="off"
                                                {...register("password", { required: true })}
                                            />
                                            {errors.password && (
                                                <span className="text-danger mt-0">Password is required</span>
                                            )}
                                        </div>

                                        <div className="col-lg-6 col-12 mb-3">
                                            <label htmlFor="cpassword" className="label">Confirm Password <span>*</span></label>
                                            <input id='cpassword'
                                                type="password"
                                                className={`form-control ${errors.cpassword ? "is-invalid" : ""}`} name='cpassword'
                                                autoComplete="off"
                                                {...register("cpassword", { required: true })}
                                            />
                                            {errors.cpassword && (
                                                <span className="text-danger mt-0">Confirm Password is required</span>
                                            )}
                                        </div>

                                        <div className="col-lg-6 col-12 mb-3">
                                            <label htmlFor="avatar" className="label">Profile Picture<span>*</span></label>
                                            <input id='avatar'
                                                type="file"
                                                className={`form-control ${errors.avatar ? "is-invalid" : ""}`} 
                                                name='avatar'
                                                onChange={fileChangeHandler}
                                                autoComplete="off"
                                                // {...register("avatar", { required: true })}
                                            />
                                            {!file.avatar && (
                                                <span className="text-danger mt-0">Avatar is required</span>
                                            )}
                                        </div>

                                        <div className="col-lg-6 col-12 mb-3">
                                            <label htmlFor="coverImage" className="label">Cover Image<span>*</span></label>
                                            <input id='coverImage'
                                                type="file"
                                                className={`form-control  ${errors.coverImage ? "is-invalid" : ""}`}
                                                 name='coverImage'
                                                onChange={fileChangeHandler}
                                                autoComplete="off"
                                                // {...register("coverImage", { required: true })}
                                            />
                                              {!file.coverImage && (
                                                <span className="text-danger mt-0">Cover Image is required</span>
                                            )}
                                        </div>
                                        {/* loading  */}
                                        {auth.loading && <div className="d-flex justify-content-center">
                                            <div className="spinner-border text-danger" role="status">
                                                <span className="visually-hidden">Loading...</span>
                                            </div>
                                        </div>}

                                        {/* showing error message  */}
                                        {auth.signUpError && auth.signUpError.message && <p className='text-danger fw-bold text-center'>{auth.signUpError.message}</p>}

                                        {/* showing Success mesage  */}
                                        {auth.user && <p className='text-success fw-bold text-center'>{auth.signUpmessage}</p>}

                                        <div className="loginButton mt-3">
                                            <button type="submit" disabled={load}>Register
                                            </button>
                                        </div>
                                        <div className="links-login">
                                            <p>Already have an account? <Link to="/login">Sign In</Link></p>
                                            {/* <Link to="/forget-password">Forget password</Link> */}
                                        </div>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default CreateAccount