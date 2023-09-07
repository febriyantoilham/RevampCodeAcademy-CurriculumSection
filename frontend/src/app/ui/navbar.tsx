"use client";
import Image from "next/image"
import Link from "next/link"
import { useSelector } from "react-redux";
import NavbarRight from "./navbarRight";
import NavbarMiddle from "./navbarMiddle";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { getCookie, hasCookie } from "cookies-next";

export default function Navbar() {
    const pathname = usePathname();
    const route = useRouter();
    const excludeRoutes = ['/signin', '/signup', '/employee', '/signup/confirm', '/employee/confirm'];
    const show = !excludeRoutes.includes(pathname);

    return (
        (show &&
            <div className="navbar bg-base-100 flex gap-x-5 justify-between rounded-lg shadow-lg md:px-10">
                <Link href={'/'} className="gap-x-4 flex-none">
                    <Image src="/codeid_logo.png" alt={""} width={40} height={40} className=""/>
                    <span className="font-medium text-2xl">Code Academy</span>
                </Link>
                <div className="flex-1">
                    <NavbarMiddle/>
                </div>
                <div className="flex-none">
                    <NavbarRight/>
                </div>
            </div>
        )
    )
}
