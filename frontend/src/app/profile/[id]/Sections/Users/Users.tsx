import PasswordModal from "./PasswordModal";
import UserPhotoModal from "./UserPhotoModal";
import UsersModal from "./UsersModal";

export default function Users(props: any) {
    const user = props.user;
    const setAlertInfo = props.setAlertInfo;
    const currentRole = user.usersRoles.find((roles: any) => roles.usroRoleId === user.userCurrentRole);

    return (
      <div className="flex flex-col gap-2 w-full bg-base-200 rounded-xl shadow-sm px-5 py-3">
          <div className="text-base font-medium">Personal Information</div>
          <div className="flex max-md:flex-col items-center gap-5">
            <div className="p-2 h-full  flex align-middle">
              <UserPhotoModal dataUsers={user} setAlertInfo={setAlertInfo}/>
            </div>
            <div className="flex-1 flex flex-col w-full hover:bg-base-300 hover:rounded-xl hover:shadow-sm">
              <div className="flex w-full gap-1 py-3 px-5">
                <div className="flex-1 flex flex-col w-full">
                  <div className="flex-1 w-full flex gap-3">
                    <div className="flex-none capitalize text-gray-700">Full Name :</div>
                    <div className="flex-1 capitalize">{user.userFirstName} {user.userLastName}</div>
                  </div>
                  <div className="flex-1 w-full flex gap-3">
                    <div className="flex-none capitalize text-gray-700">Status/Position :</div>
                    <div className="flex-1 capitalize">{currentRole.usroRole.roleName}</div>
                  </div>
                  <div className="flex-1 w-full flex gap-3">
                    <div className="flex-none capitalize text-gray-700">Birthday :</div>
                    <div className="flex-1 capitalize">{new Date(user.userBirthDate).toLocaleDateString('en-US', { day: '2-digit', month: 'short', year: 'numeric' })}</div>
                  </div>
                  <div className="flex-1 w-full flex gap-3">
                    <div className="flex-none capitalize text-gray-700">username :</div>
                    <div className="flex-1 capitalize">{user.userName}</div>
                  </div>
                  <div className="flex-1 w-full items-center flex gap-3">
                    <div className="flex-none capitalize text-gray-700">password :</div>
                    <PasswordModal dataUsers={user} setAlertInfo={setAlertInfo}/>
                  </div>
                </div>
                <UsersModal dataUsers={user} setAlertInfo={setAlertInfo}/>
              </div>
            </div>
          </div>
        </div>
    )
}
