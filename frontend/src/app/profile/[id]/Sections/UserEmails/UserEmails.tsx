import UserEmailsDeleteModal from "./UserEmailsDeleteModal";
import UserEmailsEditModal from "./UserEmailsEditModal";
import UserEmailsModal from "./UserEmailsModal";

export default function UserEmails(props: any) {
    const user = props.user;
    const setAlertInfo = props.setAlertInfo;

    return (
      <div className="flex flex-col w-full gap-2 px-5 py-3 bg-base-200 rounded-xl shadow-sm">
          <div className="w-full flex justify-between items-center">
            <div className="text-base font-medium">Emails</div>
            <UserEmailsModal dataUsers={user} setAlertInfo={setAlertInfo}/>
          </div>
          <div className="flex flex-col w-full gap-1">
            {user && user.usersEmails.map((email: any, index: any) => (
              <div className="group flex w-full rounded-xl hover:bg-base-300 hover:shadow-sm gap-x-3 items-center overflow-hidden py-3 px-5"  key={index}>
                <div className="flex-1">{email.pmailAddress}</div>
                <UserEmailsEditModal dataUsers={email} setAlertInfo={setAlertInfo}/>
                <UserEmailsDeleteModal dataUsers={email} setAlertInfo={setAlertInfo}/>
              </div>
            ))}
          </div>
        </div>
    )
}
