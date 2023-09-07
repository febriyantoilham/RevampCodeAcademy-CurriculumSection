"use client";
import Image from "next/image"
import { useDispatch, useSelector } from "react-redux";

export default function Home() {
  const dispatch = useDispatch();
  
  return (
    <div className='bg-base-100 shadow-xl rounded-xl overflow-hidden min-h-full min-w-fit flex flex-col'>
      <div className="hero" style={{ height: '80vh' }}>
        <div className="hero-content flex-col lg:flex-row-reverse">
          <Image src="/images/stock/photo-1635805737707-575885ab0820.jpg" className="max-w-sm rounded-lg shadow-2xl" alt="" height={200} width={200}/>
          <div>
            <h3></h3>
            <h1 className="text-5xl font-bold">Upgrade your skills, it`s free, graps your dream to become software engineer!</h1>
            <p className="py-6">Lorem, ipsum dolor sit amet consectetur adipisicing elit. At iure voluptatibus repellat id, nam totam, saepe sunt hic vel in nulla illo exercitationem, accusamus deleniti corrupti consequuntur tempora dolor delectus.</p>
            <button className="btn btn-primary">Join Bootcamp</button>
          </div>
        </div>
      </div>
      <div className="bg-base-200 flex flex-col justify-center items-center p-5 gap-y-5">
        <h1 className="text-3xl font-semibold">Our Alumus</h1>
        <div className="grid grid-cols-5 gap-y-3 gap-x-10">
          {Array.from({length: 10}).map((_, index) => (
            <div className="avatar" key={index}>
              <div className="w-24 rounded-xl">
                <Image src="/photo-pic.jpg" alt="" height={50} width={50}/>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
