
import { Button } from "@/components/ui/button"

import { ProfileFormValues} from "@/src/utils/applicaid-ts-utils/cv_form_types"

import { createCustomerBillingPortal, getProfile, postDetails } from "@/src/utils/requests"
import {  use, useEffect, useState } from "react"
import { useAuth } from "../../auth"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { Label } from "@/components/ui/label"
import { AlertDialog, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "@/components/ui/alert-dialog"
import { AlertDialogOverlay, AlertDialogPortal } from "@radix-ui/react-alert-dialog"
import { Link } from "react-router-dom"
import { XIcon } from "lucide-react"


export const Settings = () => {
    const {user, login, logout }= useAuth()
    const goToBillingManagement = async () => { 
        const resp = await createCustomerBillingPortal()
        console.log(resp.status)
        console.log(resp.data)
        if(resp.status === 200){
            window.location.href = resp.data.url
        }
    }
    let status
    if( user && typeof user !== 'string' ){
        const letters = user.subscription_status.split('')
        status = letters[0] = letters[0].toUpperCase() + letters.slice(1).join('')
    }


    return (
        <>
             <AlertDialog open={true}>
                <AlertDialogTrigger asChild>
                    <div>Settings</div>
                </AlertDialogTrigger> 
                
                <AlertDialogContent >
                    <AlertDialogHeader>
                        <div className="tw-flex tw-justify-between">
                            <AlertDialogTitle className="tw-align-bottom tw-px-4">Settings</AlertDialogTitle>
                            
                            <Link to='/profile' className="tw-border-none tw-shadow-none"><XIcon/></Link>
                            

                        </div>

                    </AlertDialogHeader>
                    <AlertDialogDescription className="tw-flex tw-px-4" >Your user information</AlertDialogDescription>
                    <div className="">
                        <div className="tw-flex tw-px-4">
                        <h3 className=" tw-font-medium">Email</h3> <p className="tw-mx-3 tw-font-normal tw-text-slate-500">{ user && typeof user !== 'string' ? user.email : "" }</p>
                        </div>
                        <div className="tw-flex tw-px-4">
                            <h3 className=" tw-font-medium">Plan</h3> <p className="tw-mx-3 tw-font-normal tw-text-slate-500">{user && typeof user !== 'string' ? user.plan ? 'Standard' : 'None' : "None"}</p>
                        </div>
                        <div className="tw-flex tw-px-4">
                            <h3 className=" tw-font-medium">Status</h3> <p className="tw-mx-3 tw-font-normal tw-text-slate-500">{user && typeof user !== 'string' ? status : 'Inactive'}</p>
                        </div>
                        <Button variant="link" className='tw-p-0' onClick={goToBillingManagement}>Manage Billing</Button>

                        <div className="tw-flex tw-px-4 tw-justify-end">
                            {user && <Button onClick={logout}>Logout</Button>}
                        </div>
                            
                    </div>
                    <AlertDialogFooter>
                        
                    </AlertDialogFooter>
                </AlertDialogContent>
           
            </AlertDialog>
        
        </>
    )
}

