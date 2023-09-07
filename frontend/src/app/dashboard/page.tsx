"use client"

import { hasCookie } from "cookies-next";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function Dashboard() {
  const [refresh, setRefresh] = useState(true);
  const route = useRouter();
  
  useEffect(() => {
    if (!hasCookie('access_token')) {
      route.push("/signin");
    }
    setRefresh(false);
  }, [refresh, route]);

  
  return (
    (hasCookie('access_token') &&
      <div className='w-full h-full bg-base-100 rounded-xl shadow-xl p-10'>
          <h1 className='text-xl font-medium'>Dashboard</h1>
      </div>
    )
  )
}
