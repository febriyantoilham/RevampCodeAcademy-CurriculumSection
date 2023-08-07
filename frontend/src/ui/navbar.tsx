import Image from "next/image"
import Link from "next/link"

export default function navbar() {
  return (
    <div className="navbar bg-base-100 flex justify-between py-4">
        <div className="my-auto px-5">
            <Link className="btn normal-case text-xl bg-base-100" href={"/"} style={{ border: 'none' }}>Code Academy</Link>
        </div>
        {/* <div className="px-5">
            <div className="dropdown dropdown-end my-auto">
            <label tabIndex={0} className="btn btn-ghost btn-circle avatar">
                <div className="w-10 rounded-full overflow-hidden bg-white"><Image src="/node-js-logo.png" alt={""} layout="fill" objectFit="cover"/>
                </div>
            </label>
            <ul tabIndex={0} className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52">
                <li>
                <a className="justify-between">
                    Profile
                    <span className="badge">New</span>
                </a>
                </li>
                <li><a>Settings</a></li>
                <li><a>Logout</a></li>
            </ul>
            </div>
        </div> */}
    </div>
  )
}
