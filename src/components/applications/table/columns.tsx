import { ColumnDef } from "@tanstack/react-table"
import { ApplicationObject, NestedApplicationJob } from "@/src/utils/applicaid-ts-utils/cv_form_types"
import Linkedin from "@/src/assets/job_boards/linkedin.svg?react"
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import moment from "moment"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Button } from "@/components/ui/button"
import { MoreHorizontal } from "lucide-react"
import { StatusToggle } from "./components/statusToggle"
export const columns: ColumnDef<ApplicationObject>[] = [
    
    {
        accessorKey: "job",
        header: () => <div className="div text-center">  Company </div>,
        cell: ({ row }) => {
            const job = row.getValue("job") as NestedApplicationJob
            return <div className="font-medium my-2"> <div className=" content-center"> 
                <div className="flex m-1">
                    <div className="m-auto">
                        <div className="relative p-2">
                            <Linkedin height={20} width={20} className="z-1 absolute top-0 left-0 " />
                            <img className="top-0 left-0" height={46} width={46} src={job.icon_url} alt="" />
                        </div>
                    </div>
                </div>
                
                {job.company}
                </div>
                <div >
            </div></div>
        },
    },
    {
        accessorKey: "job",
        header: () => <div className="text-center">  Job Title </div>,
        cell: ({ row }) => {
            const job = (row.getValue("job") as NestedApplicationJob)
            //<img src={job.icon_url} alt="" />
            return <div className="text-left font-medium"> {job.title}</div>
        },
    },
    {
        accessorKey: "status",
        header: () => <div className="div text-center">  Applied </div>,
        cell: ({ row }) => {
            const status = row.getValue("status") as ApplicationObject['status']
            return <StatusToggle id={row.original.id} status={status} />
        },
    },
    {
        accessorKey: "creation_dt",
        header: () => <div className="text-center">  Date</div>,
        cell: ({ row }) => {
            const isoString = (row.getValue("creation_dt") as string)
            return <div className="text-center font-medium">{moment(isoString).format('HH:mm, DD MMM')}</div>
        },
    },
    {
        id: "actions",
        cell: ({ row }) => {
            const application = row.original

            return (
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <Button variant="ghost" className="h-8 w-8 p-0">
                            <span className="sr-only">Open menu</span>
                            <MoreHorizontal className="h-4 w-4" />
                        </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                        <DropdownMenuLabel>Actions</DropdownMenuLabel>
                        <DropdownMenuItem
                            onClick={() => navigator.clipboard.writeText(application.id)}
                        >
                            Expand
                        </DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem>View All Documents</DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>
            )
        },
    },
    
]
