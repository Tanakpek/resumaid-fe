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
import { AxiosResponse } from "axios"
import { downloadBlob } from "@/src/utils/applicaid-ts-utils/file/codes"
import { toast } from "@/hooks/use-toast"
export const columns: (
    setRunId, 
    downloadPdf: (appId: string, runId: string) => Promise<AxiosResponse<any>>,
    downloadWord: (appId: string, runId: string, blob: boolean) => Promise<AxiosResponse<any>>,
    deleteRun: (appId: string, runId: string) => Promise<AxiosResponse<any>>
 ) => ColumnDef<NestedApplicationRun>[] = (
    setRunId: Dispatch<any>, 
    downloadPdf: (appId: string, runId: string) => Promise<AxiosResponse<any>>, 
    downloadWord: (appId: string, runId: string, blob: boolean) => Promise<AxiosResponse<any>>,
    deleteRun: (appId: string, runId: string) => Promise<AxiosResponse<any>>) => [
    
    {
        
        accessorKey: "type",
        filterFn:  (row, columnId, filterValue) => {
            const job = row.getValue("type") as string
            return job.startsWith(filterValue.toLowerCase()) // true or false based on your custom logic 
        },  
        header: ({ column }) => <div className="tw-div tw-text-center"> <Button variant="ghost">
            Type
        </Button></div>,
        cell: ({ row }) => {
            const type = row.getValue("type") 
            return <div id={row.id} className="tw-font-medium tw-my-2"> <div className="tw-content-center"> 
                 <Badge variant="outline">{type as string === 'resume' ? 'Resume' : 'Cover Letter'}</Badge>
                    
                
                </div>
                <div >
            </div></div>
        },
    },
    {
        accessorKey: "input_tokens",
        header: () => <div className="tw-text-center">  Input Tokens </div>,
        cell: ({ row }) => {
            const input = (row.getValue("input_tokens") as number)
            //<img src={job.icon_url} alt="" />
            return <div className="tw-text-left tw-font-medium"> <Badge variant="secondary">{input}</Badge></div>
        },
    },
    {
        accessorKey: "output_tokens",
        header: () => <div className="tw-text-center">  Output Tokens </div>,
        cell: ({ row }) => {
            const input = (row.getValue("output_tokens") as number)
            //<img src={job.icon_url} alt="" />
            return <div className="tw-text-left tw-font-medium"> <Badge variant="secondary">{input}</Badge></div>
        },
    },
    {
        accessorKey: "dt",
        header: () => <div className="tw-text-center tw-flex"> <div className="tw-flex tw-self-center"> Date</div></div>,
        cell: ({ row }) => {
            const isoString = (row.getValue("dt") as string)
            return <div className="tw-text-center tw-font-medium tw-text-xs tw-flex">{moment(isoString).format('HH:mm, DD MMM')}</div>
        },
    },
    {
        id: "actions",
        cell: ({ row }) => {
            return (
                <DropdownMenu >
                    <DropdownMenuTrigger asChild>
                        <Button variant="ghost" className="tw-h-8 tw-w-8 tw-p-0">
                            <span className="tw-sr-only">Open menu</span>
                            <MoreHorizontal className="tw-h-4 tw-w-4" />
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
                        <DropdownMenuItem onClick={async () => {
                            const resp = await downloadPdf(row.original.application, row.original.id)
                            console.log(resp)
                            downloadBlob(resp, 'Document.pdf')
                        }

                        }>Download as .pdf</DropdownMenuItem>
                        <DropdownMenuItem onClick={async () => {
                            const resp = await downloadWord(row.original.application, row.original.id, true)
                            console.log(resp)
                            downloadBlob(resp, 'Document.docx')
                        }}>Download as .docx</DropdownMenuItem>
                        <DropdownMenuItem onClick={async () => {
                            const resp = await deleteRun(row.original.application, row.original.id)
                            if(resp.status === 200) {
                                window.location.reload()
                            }
                            else{
                                toast({
                                    variant: "destructive",
                                    description: "Failed to delete generation",
                                })
                            }

                        }} className="tw-mt-2 tw-bg-white tw-w-full tw-text-slate-500  tw-shadow-sm hover:tw-bg-red-200/90 dark:tw-bg-red-900 dark:tw-text-slate-50 dark:hover:tw-bg-red-900/90">Delete Generation</DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>
            )
        },
    },
    
]
