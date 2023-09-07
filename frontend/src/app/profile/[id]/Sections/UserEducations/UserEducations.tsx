import UserEducationsDeleteModal from "./UserEducationsDeleteModal";
import UserEducationsEditModal from "./UserEducationsEditModal";
import UserEducationsModal from "./UserEducationsModal";

export default function UserEducations(props: any) {
    const user = props.user;
    const setAlertInfo = props.setAlertInfo;

    return (
        <div className="flex flex-col w-full gap-2 px-5 py-3 bg-base-200 rounded-xl shadow-sm">
          <div className="w-full flex justify-between items-center">
            <div className="text-base font-medium">Educations</div>
            <UserEducationsModal dataUsers={user} setAlertInfo={setAlertInfo}/>
          </div>
          <div className="flex flex-col w-full gap-1 steps steps-vertical">
            {user && user.usersEducation.length !== 0 ?
              (user && user.usersEducation.map((education: any, index: any) => (
                <div key={index} className="step step-neutral">
                  <div className="flex justify-between w-full h-full gap-x-3 items-center py-3 px-5 place-items-start text-start rounded-xl hover:bg-base-300 hover:shadow-sm">
                    <div className="flex-1 flex flex-col">
                      <div className="capitalize font-medium">{education.usduSchool}</div>
                      <div className="capitalize">{education.usduDegree} {education.usduFieldStudy} (GPA: {education.usduGrade})</div>
                      <div className="capitalize">{new Date(education.usduStartDate).getFullYear()} - {new Date(education.usduEndDate).getFullYear()}</div>
                    </div>
                    <UserEducationsEditModal dataUsers={education} setAlertInfo={setAlertInfo}/>
                    <UserEducationsDeleteModal dataUsers={education} setAlertInfo={setAlertInfo}/>
                  </div>
                </div>
              ))) : (
                <div className="flex items-center gap-x-1">
                    <p className="capitalize text-md">no education added yet, add new?</p>
                    <UserEducationsModal dataUsers={user} setAlertInfo={setAlertInfo}/>
                </div>
              )
            }
          </div>
        </div>
    )
}
