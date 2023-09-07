/* eslint-disable react/no-unescaped-entities */
"use client";
import { userSignInReq } from "@/redux-saga/action/users/authAction";
import { ResetSignUpData, userSignUpReq } from "@/redux-saga/action/users/signupAction";
import { hasCookie } from "cookies-next";
import { useFormik } from "formik";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import * as yup from "yup";

export default function Confirm() {
    const dispatch = useDispatch();
    const route = useRouter();
    const user = useSelector((state: any) => state.signupState.currentUser);

    const handleRedirect = () => {
        dispatch(ResetSignUpData());
        route.push('/signin');
    }

    return (
        <div className="h-full w-full flex items-center justify-center">
                <div className="max-sm:w-full max-sm:h-full w-96 h-auto flex flex-col justify-center items-center gap-8 bg-base-100 rounded-xl shadow-xl p-5">
                    <div className="flex flex-col w-full gap-3">
                        <div className="flex justify-between items-center w-full">
                            <div className="flex gap-3 items-center">
                                <div className="avatar">
                                    <div className="w-10 rounded-full">
                                        <Image src="/codeid_logo.png" alt={""} width={50} height={50}/>
                                    </div>
                                </div>
                            </div>
                            <div>
                                <Link href={'/'} className="btn btn-square btn-ghost btn-sm">
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" /></svg>
                                </Link>
                            </div>
                        </div>
                        
                    </div>
                    <div className="avatar">
                        <div className="rounded-full bg-success flex justify-center items-center w-full p-1">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="white" className="w-16 h-16">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12c0 1.268-.63 2.39-1.593 3.068a3.745 3.745 0 01-1.043 3.296 3.745 3.745 0 01-3.296 1.043A3.745 3.745 0 0112 21c-1.268 0-2.39-.63-3.068-1.593a3.746 3.746 0 01-3.296-1.043 3.745 3.745 0 01-1.043-3.296A3.745 3.745 0 013 12c0-1.268.63-2.39 1.593-3.068a3.745 3.745 0 011.043-3.296 3.746 3.746 0 013.296-1.043A3.746 3.746 0 0112 3c1.268 0 2.39.63 3.068 1.593a3.746 3.746 0 013.296 1.043 3.746 3.746 0 011.043 3.296A3.745 3.745 0 0121 12z" />
                            </svg>
                        </div>
                    </div>
                    <div className="text-3xl font-bold text-center">Registration Success!</div>
                    <div className="text-center">Congratulation <span className="font-semibold capitalize">{user?.userName}</span> your registration is success, Welcome to Code Academy!</div>
                    <div className="w-full flex flex-col gap-8">
                        <div className="flex justify-center gap-1">
                            <button onClick={handleRedirect} className="text-sm font-semibold uppercase btn btn-sm btn-outline">sign in to your account</button>
                        </div>
                    </div>
                </div>
        </div>
    )
}
