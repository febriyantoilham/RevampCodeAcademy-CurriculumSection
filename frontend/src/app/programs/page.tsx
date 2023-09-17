"use client";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useDispatch } from "react-redux";

export default function Page() {
    // Dispatch
    const dispatch = useDispatch();
    // Route
    const route = useRouter();
    // Set Refresh
    const [refresh, setRefresh] = useState(true);
    
    return (
        <div className="flex flex-col w-full min-h-screen gap-y-3">
            <div className="card card-compact w-full bg-base-100 shadow-xl">
                <div className="carousel w-full h-52">
                    <div id="slide1" className="carousel-item relative w-full">
                        <div className="flex flex-col w-full h-full justify-center items-center">
                            <div className="text-2xl">Bootcamp Regular</div>
                            <p>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Laborum doloremque et sunt, quidem placeat ut nulla, reiciendis, earum repudiandae deserunt cupiditate? Possimus nobis porro quod rem voluptatibus doloribus voluptas pariatur.</p>
                        </div>
                        <div className="absolute flex justify-between transform -translate-y-1/2 left-5 right-5 top-1/2">
                            <a href="#slide4" className="btn btn-circle">❮</a> 
                            <a href="#slide2" className="btn btn-circle">❯</a>
                        </div>
                    </div> 
                    <div id="slide2" className="carousel-item relative w-full">
                        <div className="flex flex-col w-full h-full justify-center items-center">
                            <div className="text-2xl">Bootcamp Online</div>
                            <p>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Laborum doloremque et sunt, quidem placeat ut nulla, reiciendis, earum repudiandae deserunt cupiditate? Possimus nobis porro quod rem voluptatibus doloribus voluptas pariatur.</p>
                        </div>
                        <div className="absolute flex justify-between transform -translate-y-1/2 left-5 right-5 top-1/2">
                            <a href="#slide1" className="btn btn-circle">❮</a> 
                            <a href="#slide3" className="btn btn-circle">❯</a>
                        </div>
                    </div> 
                    <div id="slide3" className="carousel-item relative w-full">
                        <div className="flex flex-col w-full h-full justify-center items-center">
                            <div className="text-2xl">Bootcamp Corporate</div>
                            <p>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Laborum doloremque et sunt, quidem placeat ut nulla, reiciendis, earum repudiandae deserunt cupiditate? Possimus nobis porro quod rem voluptatibus doloribus voluptas pariatur.</p>
                        </div>
                        <div className="absolute flex justify-between transform -translate-y-1/2 left-5 right-5 top-1/2">
                            <a href="#slide2" className="btn btn-circle">❮</a> 
                            <a href="#slide4" className="btn btn-circle">❯</a>
                        </div>
                    </div> 
                </div>
            </div>
            <div className="card w-full bg-base-100 shadow-xl">
            <div className="card-body">
                <div className="w-full flex justify-center items-center gap-x-5">
                    <label className="label font-medium">Search</label>
                    <input type="text" placeholder="java, nodejs, golang, net..." className="input input-bordered input-sm w-full max-w-xs"/>
                    <select name="filter" id="statusFilter" className="select select-bordered select-sm">
                        <option value="Choose">Choose</option>
                        <option value="Popular">Popular</option>
                        <option value="Latest">Latest</option>
                        <option value="Type">Type(Online/Offline)</option>
                    </select>
                </div>
                <div className="text-xl font-medium">Our Programs</div>
                <div className="grid grid-cols-3 gap-10">
                    <div className="col-span-1 card w-full bg-base-100 shadow-xl">
                        <figure><Image src={'/photo-1606107557195-0e29a4b5b4aa.jpg'} alt="shoes" width={1000} height={1000}/></figure>
                        <div className="card-body">
                            <h2 className="card-title">Shoes!<div className="badge badge-secondary">NEW</div></h2>
                            <p>If a dog chews shoes whose shoes does he choose?</p>
                            <div className="card-actions justify-end">
                                <div className="badge badge-outline">Fashion</div> 
                                <div className="badge badge-outline">Products</div>
                            </div>
                        </div>
                    </div>
                    <div className="col-span-1 card w-full bg-base-100 shadow-xl">
                        <figure><Image src={'/photo-1606107557195-0e29a4b5b4aa.jpg'} alt="shoes" width={1000} height={1000}/></figure>
                        <div className="card-body">
                            <h2 className="card-title">Shoes!<div className="badge badge-secondary">NEW</div></h2>
                            <p>If a dog chews shoes whose shoes does he choose?</p>
                            <div className="card-actions justify-end">
                                <div className="badge badge-outline">Fashion</div> 
                                <div className="badge badge-outline">Products</div>
                            </div>
                        </div>
                    </div>
                    <div className="col-span-1 card w-full bg-base-100 shadow-xl">
                        <figure><Image src={'/photo-1606107557195-0e29a4b5b4aa.jpg'} alt="shoes" width={1000} height={1000}/></figure>
                        <div className="card-body">
                            <h2 className="card-title">Shoes!<div className="badge badge-secondary">NEW</div></h2>
                            <p>If a dog chews shoes whose shoes does he choose?</p>
                            <div className="card-actions justify-end">
                                <div className="badge badge-outline">Fashion</div> 
                                <div className="badge badge-outline">Products</div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            </div>
            {/* <div className="w-full min-h-screen bg-base-100 rounded-xl shadow-xl flex flex-col py-5 px-10 gap-y-3">
            </div> */}
        </div>
    )
}
