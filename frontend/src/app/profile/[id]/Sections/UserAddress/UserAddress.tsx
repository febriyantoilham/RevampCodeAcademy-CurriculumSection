import UserAddressDeleteModal from "./UserAddressDeleteModal";
import UserAddressEditModal from "./UserAddressEditModal";
import UserAddressModal from "./UserAddressModal";

export default function UserAddress(props: any) {
    const user = props.user;
    const setAlertInfo = props.setAlertInfo;
    const city = props.city;
    const addressType = props.addressType;

    return (
        <div className="flex flex-col w-full gap-2 px-5 py-3 bg-base-200 rounded-xl shadow-sm">
          <div className="w-full flex justify-between items-center">
            <div className="text-base font-medium">Address</div>
            <UserAddressModal dataUsers={user} setAlertInfo={setAlertInfo} addressType={addressType} city={city}/>
          </div>
          <div className="flex flex-col w-full gap-1">
            {user && user.usersAddresses.length !== 0 ?
              (user && user.usersAddresses.map((address: any, index: any) => (
                <div className="group flex w-full rounded-xl hover:bg-base-300 hover:shadow-sm gap-x-3 items-center overflow-hidden py-3 px-5"  key={index}>
                  <div className="flex-1 flex flex-col">
                    <div className="capitalize font-medium">{address.etadAdty.adtyName}</div>
                    <div className="capitalize">{address.etadAddr.addrLine1}, {address.etadAddr.addrPostalCode}, {address.etadAddr.addrCity.cityName}</div>
                    <div>{address.etadAddr.addrLine2}</div>
                  </div>
                  <UserAddressEditModal dataUsers={address} setAlertInfo={setAlertInfo} addressType={addressType} city={city}/>
                  <UserAddressDeleteModal dataUsers={address} setAlertInfo={setAlertInfo} addressType={addressType} city={city}/>
                </div>
              ))) : (
                <div className="flex items-center gap-x-1">
                    <p className="capitalize text-md">no address added yet, add new?</p>
                    <UserAddressModal dataUsers={user} setAlertInfo={setAlertInfo} addressType={addressType} city={city}/>
                </div>
              )
            }
          </div>
        </div>
    )
}
