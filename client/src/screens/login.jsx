import React, { useState } from "react";
import authSvg from "../assets/login.svg";
import { ToastContainer, toast } from "react-toastify";
import axios from "axios";
import { authenticate, isAuth } from "../helpers/auth";
import { Redirect } from "react-router-dom";
import { GoogleLogin } from "react-google-login";

const Login = ({ history }) => {
    const [formData, setFormData] = useState({
        email: "",
        passwordInput: ""
    });

    const { email, passwordInput } = formData;

    const handleChange = text => e => {
        setFormData({ ...formData, [text]: e.target.value });
    };

    const sendGoogleToken = tokenId => {
        axios
            .post(`${process.env.REACT_APP_API_URL}/googlelogin`, {
                idToken: tokenId
            })
            .then(res => {
                informParent(res);
            })
            .catch(err => {
                toast.error("Google Login Error");
            });
    };

    const informParent = res => {
        authenticate(res, () => {
            if(isAuth()) history.push("/");
        })
    }

    const responseGoogle = res => {
        sendGoogleToken(res.tokenId);
    }

    const handleSubmit = e => {
        e.preventDefault();
        if(email && passwordInput) {
            axios
                .post(`${process.env.REACT_APP_API_URL}/login`, {
                    email,
                    password: passwordInput
                })
                .then(res => {
                    authenticate(res, () => {
                        setFormData({
                            ...formData,
                            email: "",
                            passwordInput: ""
                        });
                        if(isAuth()) history.push("/");
                        toast.success("Login Successful");
                    });
                })
                .catch(err => {
                    toast.error(err.response.data.error);
                });
        } else {
            toast.error("Please fill all fields");
        }
    }

    return (
        <div className="min-h-screen bg-gray-100 text-gray-900 flex justify-center">
            {isAuth() ? <Redirect to="/" /> : null }
            <ToastContainer />
            <div className="max-w-screen-xl m-0 sm:m-20 bg-white shadow sm:rounded-lg flex justify-center flex-1">
                <div className="lg:w-1/2 xl:w-5/12 p-6 sm:p-12">
                    <div className="mt-12 flex flex-col items-center">
                        <h1 className="text-2xl xl:text-3xl font-extrabold">
                            Login
                        </h1>
                        <form 
                            className="w-full flex-1 mt-8 text-indigo-500"
                            onSubmit={handleSubmit}
                        >
                            <div className="mx-auto max-w-xs relative">
                                <input 
                                    type="email" 
                                    placeholder="Email"
                                    onChange={handleChange("email")}
                                    value={email}
                                    className="w-full px-8 py-4 rounded-lg font-medium bg-gray-100 border border-gray-200 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white mt-5"
                                />
                                <input 
                                    type="password" 
                                    placeholder="Password"
                                    onChange={handleChange("passwordInput")}
                                    value={passwordInput}
                                    className="w-full px-8 py-4 rounded-lg font-medium bg-gray-100 border border-gray-200 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white mt-5"
                                />
                                <button 
                                    type="submit"
                                    className="mt-5 tracking-wide font-semibold bg-indigo-500 text-gray-100 w-full py-4 rounded-lg hover:bg-indigo-700 transition-all duration-300 ease-in-out flex items-center justify-center focus:shadow-outline focus:outline-none"
                                >
                                    Login
                                </button>
                                <a
                                    href="/users/password/forgot"
                                    className="no-underline hover:underline text-indigo-500 text-md text-right absolute right-0  mt-2"
                                >
                                    Forgot Password?
                                </a>
                            </div>
                            <div className="my-12 border-b text-center">
                                <div className="leading-none px-2 inline-block text-sm text-gray-600 tracking-wide font-medium bg-white transform translate-y-1/2">
                                    Don't have an account?
                                </div>
                            </div>
                            <div className="flex flex-col items-center">
                                <GoogleLogin
                                    clientId={`${process.env.REACT_APP_GOOGLE_CLIENT}`}
                                    onSuccess={responseGoogle}
                                    onFailure={responseGoogle}
                                    cookiePolicy={'single_host_origin'}
                                    render={renderProps => (
                                        <button
                                        onClick={renderProps.onClick}
                                        disabled={renderProps.disabled}
                                        className='w-full max-w-xs font-bold shadow-sm rounded-lg py-3 bg-indigo-100 text-gray-800 flex items-center justify-center transition-all duration-300 ease-in-out focus:outline-none hover:shadow focus:shadow-sm focus:shadow-outline'
                                        >
                                        <div className=' p-1 rounded-full '>
                                            <i className='fab fa-google ' />
                                        </div>
                                        <span className='ml-3'>Sign In with Google</span>
                                        </button>
                                    )}
                                ></GoogleLogin>
                                <a 
                                    className="mt-3 w-full max-w-xs font-bold shadow-sm rounded-lg py-3 bg-indigo-100 text-gray-800 flex items-center justify-center transition-all duration-300 ease-in-out focus:outline-none hover:shadow focus:shadow-sm focus:shadow-outline mt-5"
                                    href="/register"
                                >
                                    Sign Up
                                </a>
                                
                            </div>
                        </form>
                    </div>
                </div>
                <div className='flex-1 bg-indigo-100 text-center hidden lg:flex'>
                    <div
                        className='m-12 xl:m-16 w-full bg-contain bg-center bg-no-repeat'
                        style={{ backgroundImage: `url(${authSvg})` }}
                    ></div>
                </div>
            </div>
        </div>
    );
};

export default Login;