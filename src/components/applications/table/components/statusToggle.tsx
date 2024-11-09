import { ApplicationObject, statusMaps } from "@/src/utils/applicaid-ts-utils/cv_form_types";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import { useState } from "react";
import { putApplicationStatus } from "@/src/utils/requests";
import { toast } from "@/components/ui/use-toast";
import { set } from "date-fns";

export function StatusToggle (props: {id: string, status: ApplicationObject['status']}) {
    const [status, setStatus] = useState(props.status)
    const [loading, setLoading] = useState(false)
    console.log(status)
    const handleStatusChange = async (newStatus: string) => {
        setStatus(newStatus as ApplicationObject['status']);
        console.log(newStatus);
        setLoading(() => true)
        putApplicationStatus(props.id, newStatus).then((data) => {
            if(data.status = 200){
                toast({
                    variant: 'default',
                    description: 'Status Updated Successfully',
                })
            }
            else{
                toast({
                    variant: 'destructive',
                    description: 'Status Update Failed',
                })
            }
        }).catch((err) => {
            console.log(err)
            toast({
                variant: 'destructive',
                description: 'Please try again later',
            })
        }).finally(() => {
            setLoading(() => false)
        })
        // try {
        //     // Replace with your actual API endpoint and configuration
        //     const response = await fetch('/api/update-status', {
        //         method: 'POST',
        //         headers: {
        //             'Content-Type': 'application/json',
        //         },
        //         body: JSON.stringify({ status: newStatus }),
        //     });

        //     if (!response.ok) {
        //         throw new Error('Failed to update status');
        //     }

        //     console.log('Status updated successfully');
        // } catch (error) {
        //     console.error('Error updating status:', error);
        // }
    };
    
    return (
        <Select value={status} onValueChange={handleStatusChange} defaultValue="New">
            <SelectTrigger className={loading ? "bg-slate-200 transition-colors duration-200 ease-in-out " : "transition-colors duration-200 ease-in-out"}>
                
                <SelectValue  placeholder={statusMaps[status]} />
            </SelectTrigger>
            <SelectContent>
                <SelectItem value="new">{statusMaps['new']}</SelectItem>
                <SelectItem value="applied">{statusMaps['applied']}</SelectItem>
                <SelectItem value="rejected">{statusMaps["rejected"]}</SelectItem>
                <SelectItem value="interview">{statusMaps["interview"]}</SelectItem>
                <SelectItem value="accepted">{statusMaps["accepted"]}</SelectItem>
            </SelectContent>
        </Select>
    ) 

}