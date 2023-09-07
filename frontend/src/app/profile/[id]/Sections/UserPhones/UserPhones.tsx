import UserPhonesDeleteModal from "./UserPhonesDeleteModal";
import UserPhonesEditModal from "./UserPhonesEditModal";
import UserPhonesModal from "./UserPhonesModal";

export default function UserPhones(props: any) {
    const user = props.user;
    const setAlertInfo = props.setAlertInfo;

    return (
      <div className="flex flex-col w-full gap-2 px-5 py-3 bg-base-200 rounded-xl shadow-sm">
        <div className="w-full flex justify-between items-center">
          <div className="text-base font-medium">Phone Numbers</div>
          <UserPhonesModal dataUsers={user} setAlertInfo={setAlertInfo}/>
        </div>
        <div className="flex flex-col w-full gap-1">
          {user && user.usersPhones.map((number: any, index: any) => (
            <div className="group flex w-full rounded-xl hover:bg-base-300 hover:shadow-sm gap-x-3 items-center overflow-hidden py-3 px-5" key={index}>
              <div className="flex-1">{number.uspoNumber} ({number.uspoPontyCodeValue})</div>
              <UserPhonesEditModal dataUsers={number} setAlertInfo={setAlertInfo}/>
              <UserPhonesDeleteModal dataUsers={number} setAlertInfo={setAlertInfo}/>
            </div>
          ))}
        </div>
      </div>
    )
}
