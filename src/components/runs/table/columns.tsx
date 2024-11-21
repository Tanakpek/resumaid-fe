import { ColumnDef } from "@tanstack/react-table"
import { ApplicationObject, NestedApplicationJob, NestedApplicationRun } from "@/src/utils/applicaid-ts-utils/cv_form_types"
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
import { ArrowUpDown, MoreHorizontal } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Dispatch } from "react"
export const columns: (setRunId) => ColumnDef<NestedApplicationRun>[] = (setRunId: Dispatch<any>) => [
    
    {
        
        accessorKey: "type",
        filterFn:  (row, columnId, filterValue) => {
            const job = row.getValue("type") as string
            return job.startsWith(filterValue.toLowerCase()) // true or false based on your custom logic 
        },  
        header: ({column}) => <div className="div text-center"> <Button variant="ghost">
            Type
        </Button></div>,
        cell: ({ row }) => {
            const type = row.getValue("type") 
            return <div id={row.id} className="font-medium my-2"> <div className=" content-center"> 
                 <Badge variant="outline">{type as string === 'resume' ? 'Resume' : 'Cover Letter'}</Badge>
                    
                
                </div>
                <div >
            </div></div>
        },
    },
    {
        accessorKey: "input_tokens",
        header: () => <div  className="text-center">  Input Tokens </div>,
        cell: ({ row }) => {
            const input = (row.getValue("input_tokens") as number)
            //<img src={job.icon_url} alt="" />
            return <div className="text-left font-medium"> <Badge variant="secondary">{input}</Badge></div>
        },
    },
    {
        accessorKey: "output_tokens",
        header: () => <div className="text-center">  Output Tokens </div>,
        cell: ({ row }) => {
            const input = (row.getValue("output_tokens") as number)
            //<img src={job.icon_url} alt="" />
            return <div className="text-left font-medium"> <Badge variant="secondary">{input}</Badge></div>
        },
    },
    {
        accessorKey: "dt",
        header: () => <div className="text-center flex"> <div className="flex self-center"> Date</div></div>,
        cell: ({ row }) => {
            const isoString = (row.getValue("dt") as string)
            return <div className="text-center font-medium text-xs flex">{moment(isoString).format('HH:mm, DD MMM')}</div>
        },
    },
    {
        id: "actions",
        cell: ({ row }) => {
            return (
                <DropdownMenu >
                    <DropdownMenuTrigger asChild>
                        <Button variant="ghost" className="h-8 w-8 p-0">
                            <span className="sr-only">Open menu</span>
                            <MoreHorizontal className="h-4 w-4" />
                        </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                        <DropdownMenuLabel >Actions</DropdownMenuLabel>

                        <DropdownMenuSeparator />
                        <DropdownMenuItem> View </DropdownMenuItem>
                        <DropdownMenuItem onClick={() => {
                                console.log(row.original.id)
                                setRunId(row.original.id)
                            }}> Edit </DropdownMenuItem>
                        <DropdownMenuItem>Download as .pdf</DropdownMenuItem>
                        <DropdownMenuItem>Download as .docx</DropdownMenuItem>
                        <DropdownMenuItem className="mt-2 bg-white w-full text-slate-500  shadow-sm hover:bg-red-200/90 dark:bg-red-900 dark:text-slate-50 dark:hover:bg-red-900/90">Delete Generation</DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>
            )
        },
    },
    
]
