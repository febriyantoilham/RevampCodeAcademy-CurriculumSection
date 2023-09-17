"use client";
import { bulkDeleteBatchReq, getBatchReq, getStatusReq } from "@/redux-saga/action/bootcamp/batchAction";
import { hasCookie } from "cookies-next";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import Image from "next/image";
import config from "@/config/config";
import Link from "next/link";
import CustomAlert from "@/app/ui/alert";
import ClosedAlert from "./closedAlert";

export default function Batch() {
    const dispatch = useDispatch()
    const [refresh, setRefresh] = useState(false);
    const route = useRouter();
    const membersLimit = 4;

    const [alertInfo, setAlertInfo] = useState({ showAlert: false, alertText: '', alertType: '' });

    const batch = useSelector((state: any) => state.batchState.currentBatch);
    const statusList = useSelector((state: any) => state.batchState.statusList);
    
    const [page, setPage] = useState(1);
    const [limit, setLimit] = useState(10);
    const [searchValue, setSearchValue] = useState('');
    const [status, setStatus] = useState('');

    const [selectedItem, setSelectedItem] = useState<any[]>([]);
    const [selectAll, setSelectedAll] = useState(false);

    // const close batch alert
    const [statusInput, setStatusInput] = useState('');
    const [closedAlertPayload, setClosedAlertPayload] = useState(null);
    
    useEffect(() => {
        if (!hasCookie('access_token')) {
            route.push('/signin');
        } else {
            const payload = { page: page, limit: limit, searchValue: searchValue, status: status }
            
            dispatch(getStatusReq());
            dispatch(getBatchReq(payload));
        }
        setRefresh(false);
        // console.log(refresh ? 'true':'false');
    },[dispatch, limit, page, refresh, route, searchValue, status])

    let pageNumber: any[] = [];
    let totalPage: number = Math.ceil(batch?.totalCount / batch?.limit);
    let currentPage: number = batch?.page;

    for (let i: number = currentPage - 3; i <= currentPage + 3; i++){
        if ( i < 1 ) continue;
        if ( i > totalPage ) break;
        pageNumber.push(i);
    }

    const handleSelectedItem = (batchId: any) => {
        if (selectedItem.includes(batchId)) {
        setSelectedItem(selectedItem.filter(id => id !== batchId));
        setSelectedAll(false);
        } else {
        setSelectedItem([...selectedItem, batchId]);
        }
    };

    const handleSelectAll = () => {
        if (selectAll){
            setSelectedItem([]);
        } else {
            const allItems = batch.data.map((batch:any) => batch.batchId);
        setSelectedItem(allItems);
        }
        setSelectedAll(!selectAll);
    }

    const onBulkDelete = async () => {
        try {
            dispatch(bulkDeleteBatchReq(selectedItem));
            setSelectedItem([]);
            setSelectedAll(false);
            setRefresh(true);
        } catch (error) {
            console.error('Error deleting bundle:', error);
        }
    }

    return (
        <div className='bg-base-100 rounded-xl shadow-xl max-md:p-5 p-8 h-full flex flex-col gap-y-10'>
            {closedAlertPayload && statusInput && <ClosedAlert batch={closedAlertPayload} setRefresh={setRefresh} setBatch={setClosedAlertPayload} statusInput={statusInput}/>}
            {alertInfo.showAlert && <CustomAlert alertInfo={alertInfo} setAlert={setAlertInfo} refresh={refresh} setRefresh={setRefresh}/>}
            <div className="flex justify-between">
                <div className='text-xl font-bold'>Batch</div>
                <Link href={'/bootcamp/batch/create'} className="uppercase btn btn-primary">create new batch</Link>
            </div>
            <div className="w-full grid grid-cols-7 justify-between">
                <div className="col-span-1">
                {selectedItem.length > 0 &&
                    <div className="flex-0 btn btn-md btn-error btn-outline" onClick={onBulkDelete}>Delete</div>
                }
                </div>
                <div className="col-span-5 flex justify-center">
                    <input type='text' id='searchInput' placeholder='Type here' className='input input-bordered w-full max-w-xs mr-5 my-auto' value={searchValue} onChange={(e) => {setSearchValue(e.target.value); setRefresh(true)}}/>
                    {statusList ?
                        <div className="dropdown dropdown-hover">
                            <label tabIndex={0} className="btn m-1">{status || 'Status'}</label>
                            <ul tabIndex={0} className="dropdown-content z-[1] menu p-2 shadow bg-base-100 rounded-box w-52">
                                <li onClick={() => {setStatus(''); setRefresh(true)}}><a>Semua</a></li>
                                {statusList.map((item: any, index:any) => (
                                    (item.status === "Open" || item.status === "Running" || item.status === "Close") &&
                                    <li key={index} onClick={() => {setStatus(item.status); setRefresh(true)}}><a>{item.status}</a></li>
                                ))}
                            </ul>
                        </div>
                        : <></>
                    }
                </div>
                <div className="col-span-1"></div>
            </div>
            <div className="">
                <table className="table">
                    {/* head */}
                    <thead>
                        <tr className="text-center">
                            <th>
                            <label>
                                <input type="checkbox" onChange={handleSelectAll} checked={selectAll} className="checkbox" />
                            </label>
                            </th>
                            <th>Batch</th>
                            <th>Technology</th>
                            <th>Members</th>
                            <th>Periods</th>
                            <th>Trainer</th>
                            <th>Status</th>
                            <th></th>
                        </tr>
                    </thead>
                    {batch ? 
                    <tbody>
                        {batch.data.map((item: any, index: any) => (
                            <tr key={index} className="hover text-center">
                                <th>
                                    <input type="checkbox" className="checkbox" onChange={() => handleSelectedItem(item.batchId)} checked={selectedItem.includes(item.batchId)}/>
                                </th>
                                <td className="capitalize">{item.batchName}</td>
                                <td className="capitalize">{item.batchEntity.progTitle}</td>
                                <td className="capitalize">
                                    <div className="avatar-group -space-x-6 justify-center">
                                        {item.batchTrainees.slice(0, membersLimit).map((trainee: any, index: any) => (
                                            <div key={index} className="avatar">
                                                <div className="w-12">
                                                    <Image src={`${config.domain}/bootcamp/batch/getImg/${trainee.batrTraineeEntity.userPhoto}`} alt="" width={100} height={100}/>
                                                </div>
                                            </div>
                                        ))}
                                        {item.batchTrainees.length > membersLimit && (
                                            <div className="avatar placeholder">
                                                <div className="w-12 bg-neutral-focus text-neutral-content">
                                                <span>+{item.batchTrainees.length - membersLimit}</span>
                                                </div>
                                            </div>
                                        )}
                                    </div>
                                </td>
                                <td className="capitalize">
                                    <div><span className="font-medium">Start : </span>{new Date(item.batchStartDate).toLocaleDateString('en-US', { day: '2-digit', month: 'short', year: 'numeric' })}</div>
                                    <div><span className="font-medium">End : </span>{new Date(item.batchEndDate).toLocaleDateString('en-US', { day: '2-digit', month: 'short', year: 'numeric' })}</div>
                                </td>
                                <td className="capitalize">{item.batchEntity.progCreatedBy.empEntity.userFirstName} {item.batchEntity.progCreatedBy.empEntity.userLastName}</td>
                                <td>
                                    <div className={`badge ${item.batchStatus === "Open" ? "badge-accent bg-accent badge-outline bg-opacity-10" : item.batchStatus === "Close" ? "bg-neutral badge-outline bg-opacity-10" : item.batchStatus === "Running" ? "badge-primary bg-primary badge-outline bg-opacity-10" : ""} capitalize`}>{item.batchStatus}</div>
                                </td>
                                <td>
                                    <div className="dropdown dropdown-left dropdown-hover">
                                        <label tabIndex={0} className="btn btn-md btn-square btn-ghost">
                                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6"><path strokeLinecap="round" strokeLinejoin="round" d="M12 6.75a.75.75 0 110-1.5.75.75 0 010 1.5zM12 12.75a.75.75 0 110-1.5.75.75 0 010 1.5zM12 18.75a.75.75 0 110-1.5.75.75 0 010 1.5z" /></svg>
                                        </label>
                                        <ul tabIndex={0} className="dropdown-content z-[1] menu p-2 shadow bg-base-100 rounded-box w-52">
                                            <li>
                                                <Link href={`/bootcamp/batch/${item.batchId}`}>Edit</Link>
                                            </li>
                                            <li><a onClick={() => {setClosedAlertPayload(item); setStatusInput("close")}}>{item.batchStatus === "Close" ? 'Open Batch' : 'Close Batch'}</a></li>
                                            {item.batchStatus !== "Close" &&
                                                <li><a onClick={() => {setClosedAlertPayload(item); setStatusInput("run")}}>Set to Running</a></li>
                                            }
                                            <li><a>Evaluation</a></li>
                                        </ul>
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody> :
                    <tbody></tbody>}
                </table>
            </div>
            { batch ?
                <div className='join flex justify-center py-5'>
                    {pageNumber.map((page, index) => (
                      <Link
                        key={index}
                        className={page === currentPage ? 'join-item btn btn-active' : 'join-item btn'}
                        href={`/bootcamp/batch`}
                        onClick={() => setPage(page)}
                      >
                        {page}
                      </Link>
                    ))}
                  </div>
            : <></>}
        </div>
    )
}
