"use client";

import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { getCookie, hasCookie } from "cookies-next";
import { getUserByIdRequest } from "@/redux-saga/action/users/usersAction";
import CustomAlert from "@/app/ui/alert";
import { getAddressTypeRequest } from "@/redux-saga/action/master/addressTypeAction";
import { getcityRequest } from "@/redux-saga/action/master/cityAction";
import { useRouter } from "next/navigation";
import UserExperiences from "./Sections/UserExperiences/UserExperiences";
import UserEducations from "./Sections/UserEducations/UserEducations";
import UserAddress from "./Sections/UserAddress/UserAddress";
import UserPhones from "./Sections/UserPhones/UserPhones";
import UserEmails from "./Sections/UserEmails/UserEmails";
import Users from "./Sections/Users/Users";

export default function Page({ params }: { params: { id: string } }) {
  const dispatch = useDispatch();
  const [refresh, setRefresh] = useState(false);
  const route = useRouter();
  
  // Alert
  const [alertInfo, setAlertInfo] = useState({ showAlert: false, alertText: '', alertType: '' });

  // Users
  const id = getCookie('userEntityId');
  const user = useSelector((state: any) => state.usersState.currentUser);

  // Master
  const addressType = useSelector((state: any) => state.addressTypeState.currentAddressType);
  const city = useSelector((state: any) => state.cityState.currentCities);

  useEffect(() => {
    if (!hasCookie('access_token')) {
      route.push("/signin");
    } else {
      dispatch(getcityRequest());
      dispatch(getAddressTypeRequest());
      dispatch(getUserByIdRequest(id));
      setRefresh(false);
    }
  }, [dispatch, id, refresh, route])

  return (
  <div className="w-full h-full flex justify-center">
    {alertInfo.showAlert && <CustomAlert alertInfo={alertInfo} setAlert={setAlertInfo} setRefresh={setRefresh} refresh={refresh}/>}
    <div className="bg-base-100 max-md:w-full w-2/3 min-h-full rounded-xl shadow-xl p-10 flex flex-col items-start gap-y-5">
      <div className="flex flex-col gap-3">
        <div className="text-xl font-medium">Profile</div>
        <div className="text-sm text-gray-500">This information will be display, so be carefull with what you share!</div>
      </div>
      {/* Personal Information */}
      {user && <Users user={user} setAlertInfo={setAlertInfo}/>}
      {/* Email */}
      {user && <UserEmails user={user} setAlertInfo={setAlertInfo}/>}
      {/* Phones */}
      {user && <UserPhones user={user} setAlertInfo={setAlertInfo}/>}
      {/* Address */}
      {user && addressType && city && <UserAddress user={user} addressType={addressType} city={city} setAlertInfo={setAlertInfo}/>}
      {/* Education */}
      {user && <UserEducations user={user} setAlertInfo={setAlertInfo}/>}
      {/* Experiences */}
      {user && city && <UserExperiences user={user} city={city} setAlertInfo={setAlertInfo} />}
    </div>
  </div>
  )
}
