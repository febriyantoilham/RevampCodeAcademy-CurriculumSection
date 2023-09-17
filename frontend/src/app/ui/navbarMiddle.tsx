import Link from "next/link";
import { usePathname } from "next/navigation";

export default function NavbarMiddle() {
    const pathname = usePathname();

    const isHomePage = pathname === '/' || '/programs';
    const programs = [
        { value: "bootcamp regular" },
        { value: "bootcamp online" },
        { value: "bootcamp corporate" }
    ];

    const onlineCourse = [
        { value: "programming" },
        { value: "development" },
        { value: "mobile" },
        { value: "UI/UX design" },
    ];
    return (
        <>
            {isHomePage ? (<>
                <div className="w-full md:w-auto flex justify-end">
                    <div className="dropdown dropdown-end">
                        <label tabIndex={0} className="btn btn-ghost lg:hidden">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" /></svg>
                        </label>
                        <ul tabIndex={0} className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52">
                            <li>
                                <a>Programs</a>
                                <ul className="p-2">
                                    {programs.map((program: any, index: any) => (
                                        <li key={index} className=""><a className="capitalize whitespace-nowrap">{program.value}</a></li>
                                    ))}
                                </ul>
                            </li>
                            <li>
                                <a>Online Course</a>
                                <ul className="p-2">
                                    {onlineCourse.map((program: any, index: any) => (
                                        <li key={index} className=""><a className="capitalize whitespace-nowrap">{program.value}</a></li>
                                    ))}
                                </ul>
                            </li>
                        </ul>
                    </div>
                </div>
                <div className="hidden lg:flex justify-center w-full">
                <ul className="menu menu-horizontal px-1">
                    <li tabIndex={0}>
                        <details>
                            <summary>Programs</summary>
                            <ul className="p-2">
                                {programs.map((program: any, index: any) => (
                                    <li key={index} className=""><a className="capitalize whitespace-nowrap">{program.value}</a></li>
                                ))}
                            </ul>
                        </details>
                    </li>
                    <li tabIndex={0}>
                        <details>
                            <summary>Online Course</summary>
                            <ul className="p-2">
                                {onlineCourse.map((program: any, index: any) => (
                                    <li key={index} className=""><a className="capitalize whitespace-nowrap">{program.value}</a></li>
                                ))}
                            </ul>
                        </details>
                    </li>
                </ul>
            </div>
            </>):(<>
                <div className="w-full md:w-auto flex justify-end">
                    <div className="drawer-content">
                        <label htmlFor="my-drawer-2" className="btn btn-square btn-ghost drawer-button lg:hidden">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
                            </svg>
                        </label>
                    </div>
                </div>
            </>)}
        </>
    )
}
