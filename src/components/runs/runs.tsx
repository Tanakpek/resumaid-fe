
import { User } from '@/lib/types/user'
import { Dispatch, use, useEffect, useRef, useState } from "react"
import { useAuth } from "../auth";
import { useNavigate } from "react-router-dom";
import { getApplications, getProfile } from "../../utils/requests"
import { TrialOrContinue } from "../trial"
import { RunsDataTable } from './table/data-table';
import { columns } from './table/columns';
import ErrorBoundary from '../ui/errorBoundary';
import { NestedApplicationRun } from '@/src/utils/applicaid-ts-utils/cv_form_types';
import { set } from 'date-fns';
// import WordDocumentEditor from './editor/editor';
import {Default} from './editor/editor';

function delay(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}


export function Runs({ subStatus, setSubStatus, plan, setPlan, appId }) {
    
    const auth = useAuth();
    const [runId, setRunId] = useState(null)
    const SetRunWrapper = (run) => {
        setRuns(run)
    }
    const navigate = useNavigate();
    const [runs, setRuns] :  [any, Dispatch<any>] = useState([] as NestedApplicationRun[])

    
    // useEffect(() => {
    //     setRunId(4)
    // }, [runId])

    return (

        
            <main className="flex min-h-[calc(100vh_-_theme(spacing.16))] flex-1 flex-col gap-4 bg-muted/40 p-4 md:gap-8 md:p-10">
                <div className="container mx-auto py-10">

                        {!runId &&
                            <RunsDataTable columns={columns(setRunId)} data={runs} app_id={appId} setRunId={setRunId}/>
                        }
                        {runId &&
                                <ErrorBoundary>
                                    <Default appId={appId} runId={runId} />
                                </ErrorBoundary>
                        }
                </div>
                <TrialOrContinue plan={plan} subscription_status={subStatus} />
            </main>
        
        
    )
}