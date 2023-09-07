/* eslint-disable react/no-unescaped-entities */
"use client";
import { userSignInReq } from "@/redux-saga/action/users/authAction";
import { userSignUpReq } from "@/redux-saga/action/users/signupAction";
import { hasCookie } from "cookies-next";
import { useFormik } from "formik";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import * as yup from "yup";

export default function EmployeeSignUp() {
    const dispatch = useDispatch();
    const route = useRouter();
    const validationSchema = yup.object().shape({
        username: yup.string().required("Username is required"),
        email: yup.string().email("Invalid email").required("Email is required"),
        password: yup.string().min(3, "Password must be at least 3 characters").max(10, "Password must not exceed 10 characters").required("Password is required"),
        confirmPassword: yup.string().oneOf([yup.ref('password'), undefined], "Passwords must match").required("Confirm Password is required"),
        phone: yup.string().max(13, "Phone number too much number").required("Phone is required"),
    });

    useEffect(() => {
        if (hasCookie('access_token')) {
            route.push("/");
        }
    }, [route]);

    const formik = useFormik({
        initialValues: {
            username: '',
            email: '',
            password: '',
            confirmPassword: '',
            phone: '',
        },
        validationSchema: validationSchema,
        onSubmit: async (values) => {
            let payload = {
                userName: values.username,
                email: values.email,
                userPassword: values.password,
                phone: values.phone,
                roleId: 12,
            };

            dispatch(userSignUpReq(payload));
            route.push('/signup/confirm');
        }
    })

    return (
        <div className="h-full w-full flex items-center justify-center">
                <div className="max-sm:w-full max-sm:h-full w-96 h-auto flex flex-col justify-start items-start gap-8 bg-base-100 rounded-xl shadow-xl p-5">
                    <div className="flex flex-col w-full gap-3">
                        <div className="flex justify-between items-center w-full">
                            <div className="flex gap-3 items-center">
                                <div className="avatar">
                                    <div className="w-10 rounded-full">
                                        <Image src="/codeid_logo.png" alt={""} width={50} height={50}/>
                                    </div>
                                </div>
                                <div className="text-base font-medium">Employee Sign Up</div>
                            </div>
                            <div>
                                <Link href={'/'} className="btn btn-square btn-ghost btn-sm">
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" /></svg>
                                </Link>
                            </div>
                        </div>
                    </div>
                    <div className="w-full flex flex-col gap-2">
                        <div className="flex flex-col gap-3 w-full">
                            <div className="flex flex-col gap-1">
                                <label className="capitalize font-medium text-sm">username</label>
                                <input type="text" id="username" placeholder="Username" className="input input-bordered input-md w-full" defaultValue={formik.values.username} onChange={formik.handleChange} required/>
                                {formik.touched.username && formik.errors.username && (
                                    <p className="text-red-500 text-sm">{formik.errors.username}</p>
                                )}
                            </div>
                            <div className="flex flex-col gap-1">
                                <label className="capitalize font-medium text-sm">email</label>
                                <input type="email" id="email" placeholder="Email" className="input input-bordered input-md w-full" defaultValue={formik.values.email} onChange={formik.handleChange} required/>
                                {formik.touched.email && formik.errors.email && (
                                    <p className="text-red-500 text-sm">{formik.errors.email}</p>
                                )}
                            </div>
                            <div className="flex flex-col gap-1">
                                <label className="capitalize font-medium text-sm">password</label>
                                <input type="password" id="password" placeholder="Password" className="input input-bordered input-md w-full" defaultValue={formik.values.password} onChange={formik.handleChange} required/>
                                {formik.touched.password && formik.errors.password && (
                                    <p className="text-red-500 text-sm">{formik.errors.password}</p>
                                )}
                            </div>
                            <div className="flex flex-col gap-1">
                                <label className="capitalize font-medium text-sm">confirm password</label>
                                <input type="password" id="confirmPassword" placeholder="Confirm Password" className="input input-bordered input-md w-full" defaultValue={formik.values.confirmPassword} onChange={formik.handleChange} required/>
                                {formik.touched.confirmPassword && formik.errors.confirmPassword && (
                                    <p className="text-red-500 text-sm">{formik.errors.confirmPassword}</p>
                                )}
                            </div>
                            <div className="flex flex-col gap-1">
                                <label className="capitalize font-medium text-sm">phone</label>
                                <input type="number" id="phone" placeholder="Phone" className="input input-bordered input-md w-full" defaultValue={formik.values.phone} onChange={formik.handleChange} required/>
                                {formik.touched.phone && formik.errors.phone && (
                                    <p className="text-red-500 text-sm">{formik.errors.phone}</p>
                                )}
                            </div>
                        </div>
                    </div>
                    <div className="w-full flex flex-col gap-8">
                        <button type="button" className="btn btn-primary w-full capitalize" onClick={() => formik.handleSubmit()}>Sign Up</button>
                        <div className="flex justify-center gap-1">
                            <span className="text-sm text-gray-500">Already have account?</span>
                            <Link href={'/signin'} className="text-sm link link-hover link-primary font-semibold">Sign In</Link>
                        </div>
                    </div>
                </div>
        </div>
    )
}
