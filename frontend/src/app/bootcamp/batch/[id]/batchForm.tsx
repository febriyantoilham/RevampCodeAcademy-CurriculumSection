import { useFormik } from "formik"
import { useEffect, useState } from "react"
import Link from "next/link";
import { useDispatch } from "react-redux";
import { ResetBatch, createBatchReq, editBatchReq } from "@/redux-saga/action/bootcamp/batchAction";
import CustomSelect from "@/app/ui/customSelect";
import { useRouter } from "next/navigation";
import Image from "next/image";
import config from "@/config/config";

export default function BatchForm(props: any) {
  // dispatch
  const dispatch = useDispatch();
  // Router
  const router = useRouter();
  // Image
  const [imageExists, setImageExists] = useState(true);
  // selectedBatch
  const selectedBatch = props.selectedBatch;
  // setSelectedProgram
  const [selectedProgram, setSelectedProgram] = useState(selectedBatch.batchEntity);
  // programList
  const programList = props.program;
  // instructorList
  const instructors = props.instructors
  // candidate
  const candidate = props.candidate;
  const [selectCandidate, setSelectCandidate] = useState<any[]>(selectedBatch.batchTrainees.map((trainee: any) => trainee.batrTraineeEntity.userEntityId));
  const [selectCandidateAll, setSelectCandidateAll] = useState(false);
  const handleSelectedItem = (userEntityId: any) => {
    if (selectCandidate.includes(userEntityId)) {
      setSelectCandidate(selectCandidate.filter(id => id !== userEntityId));
      setSelectCandidateAll(false);
    } else {
      setSelectCandidate([...selectCandidate, userEntityId]);
    }
  };

  const handleSelectAll = () => {
    if (selectCandidateAll){
      setSelectCandidate([]);
    } else {
      const allItems = candidate.data.map((candidate:any) => candidate.userEntityId);
      setSelectCandidate(allItems);
    }
    setSelectCandidateAll(!selectCandidateAll);
  }

  // console.log(`selectCandidate: ${JSON.stringify(selectCandidate)}`);

  function formatDate(date: Date) {
        if (date !== null) {
            const formattedDate = new Date(date);
            const year = formattedDate.getFullYear();
            const month = String(formattedDate.getMonth() + 1).padStart(2, '0');
            const day = String(formattedDate.getDate()).padStart(2, '0');
            return `${year}-${month}-${day}`;
        }
        return undefined;
    }

    const startDate = formatDate(selectedBatch.batchStartDate);
    const endDate = formatDate(selectedBatch.batchEndDate);

  // Formik
  const formik = useFormik({
    initialValues: {
      batchName: selectedBatch.batchName,
      batchStartDate: startDate,
      batchEndDate: endDate,
      inproEmpEntityId: selectedBatch.instructorPrograms[0].inproEmpEntityId,
      coTrainer: undefined,
    },
    onSubmit: async (values: any) => {
      const payload = {
        progEntityId: selectedBatch.batchEntityId,
        id: selectedBatch.batchId,
        data: { // from program_entity
          batchEntityId: selectedProgram.progEntityId,
          batchType: selectedProgram.progLearningType,
          batchPicId: selectedProgram.progCreatedBy.empEntityId,
          // inForm
          batchName: values.batchName,
          batchStartDate: values.batchStartDate,
          batchEndDate: values.batchEndDate,
          inproEmpEntityId: values.inproEmpEntityId,
          coTrainer: undefined,
          batchTraineeData: selectCandidate,
        }
      }
      // console.log(`payload: ${JSON.stringify(payload)}`);
      
      dispatch(editBatchReq(payload));
      dispatch(ResetBatch());
      router.push('/bootcamp/batch');
    }
  })

  const handleSetSelectedProgram = (event: any) => {
    const selectedValue = event.target.value;
    const selectedItem = programList.find((item: any) => item.progTitle === selectedValue);
    setSelectedProgram(selectedItem);
  }

  const instructorsOptions = instructors.map((item: any) => ({
      value: item.empEntityId,
      label: `${item.empEntity.userFirstName} ${item.empEntity.userLastName}`,
  }))

  return (
    (selectedBatch &&
      <form onSubmit={formik.handleSubmit}>
        <div className="flex flex-col gap-10 h-full">
            {/* First Section */}
            <div className="grid grid-cols-7 gap-5">
              {/* Form */}
              <div className="col-span-5 flex flex-col gap-5">
                {/* Name, Tech */}
                <div className="flex w-full gap-2 ">
                  <div className="flex flex-col w-full">
                      <label className="mb-2 font-medium capitalize">Batch Name</label>
                      <input type="text" id="batchName" placeholder="Batch Name" className="input input-bordered w-full capitalize" defaultValue={formik.values.batchName} onChange={formik.handleChange}/>
                  </div>
                  <div className="flex flex-col w-full">
                      <label className="mb-2 font-medium capitalize">Technology</label>
                      <select id="progTitle" className="select input-bordered w-full capitalize" defaultValue={selectedProgram.progTitle} onChange={handleSetSelectedProgram}>
                        <option disabled>Choose</option>
                        { programList.map((item: any, index: any) => (
                          <option key={index} value={item.progTitle}>{item.progTitle}</option>
                        ))}
                      </select>
                  </div>
                </div>
                {/* Periods */}
                <div className="flex w-full gap-2 ">
                  <div className="flex flex-col w-full">
                      <label className="mb-2 font-medium capitalize">Start Date</label>
                      <input type="date" id="batchStartDate" placeholder="Start Date" className="input input-bordered w-full" defaultValue={formik.values.batchStartDate} onChange={formik.handleChange}/>
                  </div>
                  <div className="flex flex-col w-full">
                      <label className="mb-2 font-medium capitalize">End Date</label>
                      <input type="date" id="batchEndDate" placeholder="End Date" className="input input-bordered w-full" defaultValue={formik.values.batchEndDate} onChange={formik.handleChange}/>
                  </div>
                </div>
                {/* Trainer */}
                <div className="flex w-full gap-2 ">
                  <div className="flex flex-col w-full">
                      <label className="mb-2 font-medium capitalize">Trainer</label>
                      <CustomSelect id={'inproEmpEntityId'} options={instructorsOptions} defaultValue={instructorsOptions.find((option: any) => option.value === formik.values.inproEmpEntityId)} onChange={formik.setFieldValue} isDisabled={true}/>
                  </div>
                  <div className="flex flex-col w-full">
                      <label className="mb-2 font-medium capitalize">Co-Trainer</label>
                      <input type="text" id="coTrainer" placeholder="Co-Trainer" className="input input-bordered w-full capitalize" defaultValue={formik.values.coTrainer} onChange={formik.handleChange} disabled/>
                  </div>
                </div>
              </div>
              {/* Members Count Display */}
              <div className="col-span-2 flex flex-col items-center">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-32 h-32"><path strokeLinecap="round" strokeLinejoin="round" d="M18 18.72a9.094 9.094 0 003.741-.479 3 3 0 00-4.682-2.72m.94 3.198l.001.031c0 .225-.012.447-.037.666A11.944 11.944 0 0112 21c-2.17 0-4.207-.576-5.963-1.584A6.062 6.062 0 016 18.719m12 0a5.971 5.971 0 00-.941-3.197m0 0A5.995 5.995 0 0012 12.75a5.995 5.995 0 00-5.058 2.772m0 0a3 3 0 00-4.681 2.72 8.986 8.986 0 003.74.477m.94-3.197a5.971 5.971 0 00-.94 3.197M15 6.75a3 3 0 11-6 0 3 3 0 016 0zm6 3a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0zm-13.5 0a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0z" /></svg>
                <div className="text-5xl font-medium">{selectCandidate.length}</div>
              </div>
            </div>
            {/* Second Section */}
            <div className="flex flex-col gap-5">
              <div className="text-base font-medium uppercase">Remommended Bootcamp Members</div>
              <div className="grid grid-cols-3 gap-3">
                {candidate && candidate.map((item: any, index: any) => (
                  <div key={index} className={`form-control border-2 rounded-full ${selectCandidate.includes(item.userEntityId) && `bg-base-300`}`}>
                    <label className="label cursor-pointer p-3">
                      <div className="flex justify-between items-center w-full">
                        <div className="flex gap-3 items-center">
                          <div className="avatar-group -space-x-6 justify-center">
                            <div className="avatar">
                                <div className="w-12">
                                  <Image src={`${config.domain}/bootcamp/batch/getImg/${item.userPhoto}`} alt="" width={100} height={100} onError={() => setImageExists(false)}/>
                                </div>
                            </div>
                          </div>
                          <div className="flex flex-col">
                            <div className="capitalize text-sm font-medium">
                              {
                                item.userFirstName && item.userLastName ? <>{item.userFirstName} {item.userLastName}</> : <>User No: {item.userEntityId}</>
                              }
                            </div>
                            <div className="capitalize text-sm">
                              {
                                item.usersEducations.length > 0 ? <>{item.usersEducations[0].usduSchool}</> : <>Unknow Schools</>
                              }
                            </div>
                          </div>
                        </div>
                        <div>
                          { !selectCandidate.includes(item.userEntityId) ?
                          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6"><path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" /></svg>
                          : <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6"><path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" /></svg>
                          }
                        </div>
                      </div>
                      <input type="checkbox" className="hidden" onChange={() => handleSelectedItem(item.userEntityId)} checked={selectCandidate.includes(item.userEntityId)}/>
                    </label>
                  </div>
                ))}
              </div>
            </div>
            {/* Button Actions */}
            <div className="flex justify-end gap-4">
              <button type="submit" className="btn btn-primary btn-sm">Submit</button>
              <Link href={'/bootcamp/batch'} onClick={() => dispatch(ResetBatch())} className="btn btn-neutral btn-sm">Cancel</Link>
            </div>
        </div>
      </form>
    )
  )
}
