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
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuRadioGroup, DropdownMenuRadioItem, DropdownMenuSeparator, DropdownMenuSub, DropdownMenuSubContent, DropdownMenuSubTrigger, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Button } from "@/components/ui/button"
import { ArrowUpDown, Eye, MoreHorizontal } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Dispatch } from "react"
import { AxiosResponse } from "axios"
import { downloadBlob } from "@/src/utils/applicaid-ts-utils/file/codes"
import { toast } from "@/hooks/use-toast"
import Docx from "@/src/assets/util/file-text.svg?react"
import Pdf from "@/src/assets/util/file.svg?react"
import View from "@/src/assets/util/eye.svg?react"
const DEFAULT_CLASS = "tw-bg-primary-500 tw-text-slate-200 hover:tw-bg-primary"
export const columns: (
    setRunId, 
    downloadPdf: (appId: string, runId: string) => Promise<AxiosResponse<any>>,
    downloadWord: (appId: string, runId: string, blob: boolean) => Promise<AxiosResponse<any>>,
    setUsed: (appId: string, runId: string) => Promise<AxiosResponse<any>>,
    deleteRun: (appId: string, runId: string) => Promise<AxiosResponse<any>>,
    defaultRuns: [string | null, string | null],
    setDefaultRun: (resume: boolean, id: string) => void
 ) => ColumnDef<NestedApplicationRun>[] = (
    setRunId: Dispatch<any>, 
    downloadPdf: (appId: string, runId: string) => Promise<AxiosResponse<any>>, 
    downloadWord: (appId: string, runId: string, blob: boolean) => Promise<AxiosResponse<any>>,
    setUsed: (appId: string, runId: string) => Promise<AxiosResponse<any>>,
    deleteRun: (appId: string, runId: string) => Promise<AxiosResponse<any>>,
    defaultRuns: [string | null, string | null],
    setDefaultRun: (resume: boolean, id: string | null) => void
    
) => [
         {

             accessorKey: "id",
             filterFn: (row, columnId, filterValue) => {
                 const job = row.getValue("id") as string
                 return job.startsWith(filterValue.toLowerCase()) // true or false based on your custom logic 
             },
            header: ({ column }) => <div className="tw-div tw-text-center tw-text-primary-foreground-300 tw-mx-4"> 
                 ID
       </div>,
             cell: ({ row }) => {
                 const id = row.original.id
                 return <div id={row.id} className="tw-font-medium tw-my-2 tw-text-slate-900"> <div className="tw-content-left tw-flex tw-mx-3">
                     {id}


                 </div>
                     <div >
                     </div></div>
             },
         },
    {
        
        accessorKey: "type",
        filterFn:  (row, columnId, filterValue) => {
            const job = row.getValue("type") as string
            return job.startsWith(filterValue.toLowerCase()) // true or false based on your custom logic 
        },  
        header: ({ column }) => <div className="tw-div tw-text-center tw-text-primary-foreground-300 tw-mx-4"> 
            Type
      </div>,
        cell: ({ row }) => {
            const type = row.getValue("type")
            const defaultRun = type === 'resume' ? defaultRuns[0] === row.original.id  ? DEFAULT_CLASS : '' : defaultRuns[1] === row.original.id ? DEFAULT_CLASS : ''
            return <div id={row.id} className="tw-font-medium tw-my-2 "> <div className="tw-content-left tw-flex tw-mx-3"> 
                 <Badge variant="outline" className={defaultRun}>{type as string === 'resume' ? 'Resume' : 'Cover Letter'}</Badge>
                </div>
                <div >
            </div></div>
        },
    },
    {
        accessorKey: "input_tokens",
        header: () => <div className="tw-text-center tw-text-primary-foreground-300">  Input Tokens </div>,
        cell: ({ row }) => {
            const input = (row.getValue("input_tokens") as number)
            //<img src={job.icon_url} alt="" />
            return <div className="tw-text-left tw-font-medium"> <Badge variant="secondary">{input}</Badge></div>
        },
    },
    {
        accessorKey: "output_tokens",
        header: () => <div className="tw-text-center tw-text-primary-foreground-300">  Output Tokens </div>,
        cell: ({ row }) => {
            const input = (row.getValue("output_tokens") as number)
            //<img src={job.icon_url} alt="" />
            return <div className="tw-text-left tw-font-medium"> <Badge variant="secondary">{input}</Badge></div>
        },
    },
    {
        accessorKey: "dt",
        header: () => <div className="tw-text-center tw-flex tw-text-primary-foreground-300"> <div className="tw-flex tw-self-center"> Date</div></div>,
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
                        <DropdownMenuItem>
                            View </DropdownMenuItem>
                        <DropdownMenuItem onClick={() => {
                                console.log(row.original.id)
                                setRunId(row.original.id)
                        }}> Edit </DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuSub>
                            <DropdownMenuSubTrigger>Download as</DropdownMenuSubTrigger>
                            <DropdownMenuSubContent>
                                <DropdownMenuRadioGroup>
                                    <DropdownMenuItem onClick={async () => {
                                            const resp = await downloadPdf(row.original.application, row.original.id)
                                            console.log(resp)
                                            downloadBlob(resp, 'Document.pdf')
                                        }} key={'1'} >
                                        <Pdf className="tw-h-4 tw-w-4 tw-text-red-800" /><p className="tw-text-sm">Download .pdf</p>
                                    </DropdownMenuItem>
                                    <DropdownMenuItem key={'2'} className="tw-text-left tw-content-start" onClick={async () => {
                                        const resp = await downloadWord(row.original.application, row.original.id, true)
                                        console.log(resp)
                                        downloadBlob(resp, 'Document.docx')
                                    }}>
                                       
                                     
                                    <Docx className="tw-h-4 tw-w-4 tw-text-primary" /> Download .docx
                                            
                                      
                                    </DropdownMenuItem>
                                </DropdownMenuRadioGroup>
                            </DropdownMenuSubContent>
                        </DropdownMenuSub>
                

                        
                        <DropdownMenuSeparator />
                        <DropdownMenuItem onClick={async () => {
                            const resp = await setUsed(row.original.application, row.original.id)
                            
                            console.log(resp)
                            if(resp.status !== 200) {
                                toast({
                                    variant: "destructive",
                                    description: "Failed to set as defualt",
                                })
                            }
                            
                            else{
                                if(row.original.type === 'resume'){
                                    setDefaultRun(true, row.original.id)
                                }
                                else{
                                    setDefaultRun(false, row.original.id)
                                }
                                
                            }
                        }}>
                            Set Used</DropdownMenuItem>
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
