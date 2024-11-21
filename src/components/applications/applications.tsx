
import { User } from '@/lib/types/user'
import { Dispatch, useEffect, useRef, useState } from "react"
import { useAuth } from "../auth";
import { useNavigate } from "react-router-dom";
import { getApplications, getProfile } from "../../utils/requests"
import { TrialOrContinue } from "../trial"
import { ApplicationsDataTable } from './table/data-table';
import { columns } from './table/columns';
import ErrorBoundary from '../ui/errorBoundary';
import { Runs } from '../runs/runs';

function delay(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

export function Applications({ subStatus, setSubStatus, plan, setPlan }) {
    const qp = new URLSearchParams(location.search)
    const auth = useAuth();
    const navigate = useNavigate();
    const [applications, setApplications] :  [any, Dispatch<any>] = useState([])
    const [appId, setAppId] = useState(qp.get('appId') || null)
    
    useEffect(() => {
        async function fetchData() {
            if(!auth.user || !auth.user.email ){
                const resp = await getProfile(null)
                const data: User = await resp.data
                const u = { name: data.name, email: data.email, plan: data.plan, billing_id: data.billing_id }
                auth.login(u);
                setSubStatus(() => data.subscription_status || null)
                setPlan((e) => { data.plan || null })
            }
        }
        fetchData()
    }, [ plan ]); // The empty array ensures this effect only runs once after the initial render


    return (
        <div>
            <div className="flex min-h-screen w-full flex-col" id="hya">
                <div className='your-container'>
                    {appId &&
                        <Runs appId={appId} setPlan={setPlan} subStatus={subStatus} plan={plan} setSubStatus={setSubStatus} />
                    }
                    {!appId &&
                            <main className="flex min-h-[calc(100vh_-_theme(spacing.16))] flex-1 flex-col gap-4 bg-muted/40 p-4 md:gap-8 md:p-10">
                                <div className="container mx-auto py-10">
                                    

                                    <ApplicationsDataTable columns={columns} data={applications} />
                                    
                                </div>
                                <TrialOrContinue plan={plan} subscription_status={subStatus} />
                            </main>
                    }
                </div>
            </div>
        </div>
        
    )
}