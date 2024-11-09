
import { User } from '@/lib/types/user'
import { Dispatch, useEffect, useRef, useState } from "react"
import { useAuth } from "../auth";
import { useNavigate } from "react-router-dom";
import { getApplications, getProfile } from "../../utils/requests"
import { TrialOrContinue } from "../trial"
import { DataTable } from './table/data-table';
import { columns } from './table/columns';
import ErrorBoundary from '../ui/errorBoundary';

function delay(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

export function Applications({ subStatus, setSubStatus, plan, setPlan }) {
    
    const auth = useAuth();
    const navigate = useNavigate();
    const [applications, setApplications] :  [any, Dispatch<any>] = useState([])
    


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
            const response = await getApplications({})
            const apps = await response.data
            console.log('heres data')
            console.log(apps)
            setApplications(() => apps)
            
        }
        fetchData()
    }, [ plan ]); // The empty array ensures this effect only runs once after the initial render


    return (
        <div className="flex min-h-screen w-full flex-col">
            <main className="flex min-h-[calc(100vh_-_theme(spacing.16))] flex-1 flex-col gap-4 bg-muted/40 p-4 md:gap-8 md:p-10">
                <div className="container mx-auto py-10">
                    <ErrorBoundary>
                    
                    <DataTable columns={columns} data={applications} />
                    </ErrorBoundary>
                </div>
                <TrialOrContinue plan={plan} subscription_status={subStatus} />
            </main>
        </div>
    )
}