import UserExperiencesDeleteModal from "./UserExperiencesDeleteModal";
import UserExperiencesEditModal from "./UserExperiencesEditModal";
import UserExperiencesModal from "./UserExperiencesModal";

export default function UserExperiences(props: any) {
    const user = props.user;
    const setAlertInfo = props.setAlertInfo;
    const city = props.city

    return (
        <div className="flex flex-col w-full gap-2 px-5 py-3 bg-base-200 rounded-xl shadow-sm">
            <div className="w-full flex justify-between items-center">
                <div className="text-base font-medium">Experiences</div>
                <UserExperiencesModal dataUsers={user} setAlertInfo={setAlertInfo} city={city}/>
            </div>
            <div className="flex flex-col w-full gap-1 steps steps-vertical">
                {user && user.usersExperiences.length !== 0 ?
                    (user && user.usersExperiences.map((experiences: any, index: any) => (
                        <div key={index} className="step step-neutral">
                            <div className="flex justify-between w-full h-full gap-x-3 items-center py-3 px-5 place-items-start text-start rounded-xl hover:bg-base-300 hover:shadow-sm">
                                <div className="flex-1 flex flex-col">
                                    <div className="capitalize font-medium">{experiences.usexCompanyName} ({experiences.usexIndustry}) </div>
                                    <div className="capitalize">{experiences.usexTitle} - {experiences.usexProfileHeadline} ({experiences.usexEmploymentType})</div>
                                    <div className="capitalize">{new Date(experiences.usexStartDate).toLocaleDateString('en-US', { month: 'short', year: 'numeric' })} - {experiences.usexIsCurrent === '1' ? "Now" : new Date(experiences.usexEndDate).toLocaleDateString('en-US', { month: 'short', year: 'numeric' })}</div>
                                </div>
                                <UserExperiencesEditModal dataUsers={experiences} setAlertInfo={setAlertInfo} city={city}/>
                                <UserExperiencesDeleteModal dataUsers={experiences} setAlertInfo={setAlertInfo}/>
                            </div>
                        </div>
                    ))) : (
                    <div className="flex items-center gap-x-1">
                        <p className="capitalize text-md">no experiences added yet, add new?</p>
                        <UserExperiencesModal dataUsers={user} setAlertInfo={setAlertInfo} city={city}/>
                    </div>
                    )
                }
            </div>
        </div>
    )
}
