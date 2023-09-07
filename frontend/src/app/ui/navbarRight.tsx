import config from "@/config/config";
import { userLogout } from "@/redux-saga/action/users/authAction";
import { getUserByIdRequest } from "@/redux-saga/action/users/usersAction";
import { getCookie, hasCookie } from "cookies-next";
import Image from "next/image"
import Link from "next/link"
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

export default function NavbarRight() {
    const dispatch = useDispatch();
    const [refresh, setRefresh] = useState(false);
    const route = useRouter();
    const user = useSelector((state: any) => state.usersState.currentUser);
    const id = getCookie('userEntityId');
    

    useEffect(() => {
        dispatch(getUserByIdRequest(id));
        setRefresh(false);
    }, [dispatch, id, refresh])

    const handleLogout = () => {
        console.log(`Test`);
        dispatch(userLogout());
        route.refresh();
        route.push('/');
    }

    const [imageExists, setImageExists] = useState(true);
    const handleImageError = () => {
        setImageExists(false);
    };
    
    return (
        <>
            {user ? (<>
                {user &&
                    <div className="dropdown dropdown-end">
                        <div tabIndex={0} className="flex justify-center items-center gap-3 btn btn-ghost">
                            <div className="flex flex-col items-end">
                                <div className="capitalize font-semibold text-sm">{user.userName}</div>
                                <div className="capitalize font-normal text-sm">{user.usersRoles[0].usroRole.roleName}</div>
                            </div>
                            <label className="avatar">
                                <div className="w-10 mask mask-circle">
                                    {user?.userPhoto === null || user?.userPhoto === '' ? (<>
                                        <Image src="/userDefault.png" alt={""} layout="fill" objectFit="contain"/>
                                        </>
                                        ) : imageExists ? (
                                            <Image src={`${config.domain}/users/users/profile/photo/${user.userPhoto}`} alt={""} layout="fill" objectFit="contain" onError={handleImageError}/>
                                        ) : 
                                        (<div className="w-full h-full bg-black flex flex-col justify-center items-center">
                                            <span className="text-white">?</span>
                                        </div>
                                    )}
                                </div>
                            </label>
                        </div>
                        <ul tabIndex={0} className="mt-3 z-[1] p-2 shadow menu menu-sm dropdown-content bg-base-100 rounded-box w-52">
                            <li>
                            <Link href={`/profile/${id}`} className="justify-between">
                                Profile
                            </Link>
                            </li>
                            <li><Link href={'/dashboard'}>Dashboard</Link></li>
                            <li><a>Settings</a></li>
                            <li><a onClick={() => handleLogout()}>Logout</a></li>
                        </ul>
                    </div>
                }
            </>):(<>
                <ul className="menu menu-horizontal gap-x-3">
                    {/* <li><Link href={"/"} className="capitalize font-medium">sign up</Link></li> */}
                    <li><Link href={"/signin"} className="capitalize font-medium">sign in</Link></li>
                </ul>
            </>)}
            
        </>
    )
}
