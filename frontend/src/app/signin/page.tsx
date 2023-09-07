/* eslint-disable react/no-unescaped-entities */
"use client";
import { userSignInReq } from "@/redux-saga/action/users/authAction";
import { hasCookie } from "cookies-next";
import { useFormik } from "formik";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import * as yup from "yup";

export default function SignIn() {
    const dispatch = useDispatch();
    const route = useRouter();
    const user = useSelector((state: any) => state.authState.currentUser);
    const validationSchema = yup.object().shape({
        username: yup.string().required("Username is required"),
        password: yup.string().min(3).max(10).required("Password is required"),
    });

    useEffect(() => {
        if (hasCookie('access_token') || user) {
            route.push("/");
        }
    }, [route, user]);

    const formik = useFormik({
        initialValues: {
            username: '',
            password: '',
        },
        validationSchema: validationSchema,
        onSubmit: async (values) => {
            let payload = {
                username: values.username,
                password: values.password,
            };

            console.log(JSON.stringify(values));
            dispatch(userSignInReq(payload));
            if (hasCookie('access_token') || user) {
                route.push("/");
            }
        }
    })

    console.log(`User: ${JSON.stringify(user)}`);

    return (
        <div className="h-full w-full flex items-center justify-center">
            <form onSubmit={formik.handleSubmit}>
                <div className="max-sm:w-full max-sm:h-full w-96 h-auto flex flex-col justify-start items-start gap-8 bg-base-100 rounded-xl shadow-xl p-5">
                    <div className="flex flex-col w-full gap-3">
                        <div className="flex justify-between items-center w-full">
                            <div className="flex gap-3 items-center">
                                <div className="avatar">
                                    <div className="w-10 rounded-full">
                                        <Image src="/codeid_logo.png" alt={""} width={50} height={50}/>
                                    </div>
                                </div>
                                <div className="text-base font-medium">Sign In</div>
                            </div>
                            <div>
                                <Link href={'/'} className="btn btn-square btn-ghost btn-sm">
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" /></svg>
                                </Link>
                            </div>
                        </div>
                        <div>
                            <p className="text-sm font-normal text-gray-500">Login into your account</p>
                        </div>
                    </div>
                    <div className="w-full flex flex-col gap-2">
                            <div className="flex flex-col gap-3 w-full">
                                <div className="flex flex-col gap-2">
                                    <label className="capitalize font-medium text-sm">username</label>
                                    <input type="text" id="username" placeholder="Username" className="input input-bordered input-md w-full" defaultValue={formik.values.username} onChange={formik.handleChange} required/>
                                </div>
                                <div className="flex flex-col gap-2">
                                    <label className="capitalize font-medium text-sm">password</label>
                                    <input type="password" id="password" placeholder="Password" className="input input-bordered input-md w-full" defaultValue={formik.values.password} onChange={formik.handleChange} required/>
                                </div>
                            </div>
                        <div className="flex justify-between">
                            <label className="cursor-pointer flex gap-3 items-center">
                                <input type="checkbox" className="checkbox checkbox-primary checkbox-sm" />
                                <span className="label-text">Remember me</span> 
                            </label>
                            <Link href={'/'} className="text-sm link  link-hover">Forgot Password?</Link>
                        </div>
                    </div>
                    <div className="w-full flex flex-col gap-8">
                        <button type="submit" className="btn btn-primary w-full capitalize">Sign In</button>
                        <div className="flex justify-center gap-1">
                            <span className="text-sm text-gray-500">Don't have account yet?</span>
                            <Link href={'/signup'} className="text-sm link link-hover link-primary font-semibold">Sign Up</Link>
                        </div>
                    </div>
                </div>
            </form>
        </div>
    )
}
