import {
    ColumnDef,
    ColumnFiltersState,
    flexRender,
    getCoreRowModel,
    getPaginationRowModel,
    getSortedRowModel,
    PaginationState,
    SortingState,
    VisibilityState,
    useReactTable,
    getFilteredRowModel,
} from "@tanstack/react-table"

import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"
import { Button } from "@/components/ui/button"
import { Dispatch, useEffect, useState } from "react"
import { getApplications } from "@/src/utils/requests"
import { ApplicationObject } from "@/src/utils/applicaid-ts-utils/cv_form_types"
import { toast } from "@/components/ui/use-toast"
import { multiplyKeys } from "./utils/fetch"
import { ArrowUpDown } from "lucide-react"
import { Input } from "@/components/ui/input"


interface DataTableProps<TData, TValue> {
    columns: ColumnDef<TData, TValue>[]
    data: TData[]
}

export function ApplicationsDataTable<TData, TValue>({
    columns,
    data,
}: DataTableProps<ApplicationObject, TValue>) {
    const [sorting, setSorting] = useState<SortingState>([])
    const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>(
        []
    )

    const [applications, setApplications] = useState(data)
    
    const [pageIndex, setPageIndex] = useState(0);
    const [pageSize, setPageSize] = useState(10);
    const [hasMore, setHasMore] = useState(Math.floor(applications.length / pageSize) >= 1);
    const [loading, setLoading] = useState(false);
    const [pagination, setPagination] = useState({
        pageIndex: pageIndex, //initial page index
        pageSize: pageSize, //default page size
    });

    const [filterState, setFilterState] = useState({    
        ts: new Date().toISOString(),
        company: '',
        job_title: '',
        job_board: '',
        order: 'desc' as 'asc' | 'desc'
    } );

    

    const fetchData = async (pageintionState: PaginationState, { ts, company, job_board, job_title, order }: { ts: string, company?: string, job_title?: string, job_board?: string, order: 'asc' | 'desc' }) => {
        setLoading(() => true);
        try {
            const params: any = {}
            
            params['company'] = company || ''
            params['job_board'] = job_board || ''
            params['job_title'] = job_title || ''
            params['order'] = order
            
            const response = await getApplications(params, ts)
            
            // Replace with your actual API endpoint
            if (!response) {
                throw new Error('Failed to fetch data');
            }
            const result = multiplyKeys(response.data) //.slice(0, pageSize + 1)

            if (job_board !== filterState?.job_board || company !== filterState.company || job_title !== filterState.job_title) {
                table.setPageIndex(0);
            }
            setHasMore( () => Math.floor(result.length / pageSize) >= 1);
            setApplications(() => result);

        } catch (error) {
            toast({
                variant: 'destructive',
                title: "Error Fetching Data",
                description: 'An error occured while fetching data.Please try again.',
            })
            setLoading(false);
        } finally {
            setLoading(false);
        }
    };
    

    const table = useReactTable({
        data : applications,
        columns,
        // manualPagination: true,
        // pageCount: hasMore ? pageIndex + 2 : pageIndex + 1,
        getCoreRowModel: getCoreRowModel(),
        getPaginationRowModel: getPaginationRowModel(),
        onPaginationChange: setPagination,
        onColumnFiltersChange: setColumnFilters,
        getFilteredRowModel: getFilteredRowModel(),
        
        state: {
            pagination: pagination,
            sorting: sorting,
            columnFilters,
        }
    })

    
    
    useEffect(() => {
        fetchData(pagination, filterState);
    }, [pageIndex, pageSize]);
    
    return (
        <>
            <div className="tw-flex tw-items-center tw-py-4">
        <Input 
          placeholder="Filter Companies..."
            value={
                
                (table.getColumn("company_key")?.getFilterValue() as string) ?? ""
            }
            onChange={(event) =>{
                    table.getColumn("company_key")?.setFilterValue(event.target.value)
                }
            }
                    className="tw-max-w-sm dark:tw-bg-slate-900 tw-bg-white"
        />
      </div>
        <div className="rounded-md border">
            <Table className="bg-white">
                <TableHeader>
                    {table.getHeaderGroups().map((headerGroup) => (
                        <TableRow key={headerGroup.id}>
                            {headerGroup.headers.map((header) => {
                                return (
                                    
                                    <TableHead key={header.id}>

                                        <div className="tw-flex tw-justify-between">
                                        
                                        {
                                        header.isPlaceholder
                                            ? null
                                            : flexRender(
                                                header.column.columnDef.header,
                                                header.getContext(),
                                            )
                                        }

                                            {header.id === 'creation_dt' && <Button variant="ghost"><ArrowUpDown className="tw-h-full  tw-w-4 tw-mx-2" onClick={() => {
                                                setFilterState({...filterState, order: filterState.order === 'asc' ? 'desc' : 'asc' })
                                                fetchData(pagination, {...filterState, order: filterState.order === 'asc' ? 'desc' : 'asc' })
                                                // fetchData(pagination, {...filterState, order: filterState.order === 'asc' ? 'desc' : 'asc' })
                                            }} /> </Button>}
                                            
                                        </div>
                                    </TableHead>
                                    
                                )
                            })}
                        </TableRow>
                    ))}
                </TableHeader>
                <TableBody>
                    {table.getRowModel().rows?.length ? (
                        table.getRowModel().rows.map((row) => {
                            return (<TableRow
                                key={row.id}
                                data-state={row.getIsSelected() && "selected"}
                            >
                                {row.getVisibleCells().map((cell) => {
                                    return (
                                        <TableCell key={cell.id}>
                                            {flexRender(cell.column.columnDef.cell, cell.getContext())}
                                        </TableCell>)
                                    })}
                            </TableRow>)
                    })
                    ) : (
                        <TableRow>
                                    <TableCell colSpan={columns.length} className="tw-h-24 tw-text-center tw-mx-2">
                                No results.
                            </TableCell>
                        </TableRow>
                    )}
                </TableBody>
            </Table>
                <div className="tw-flex tw-items-center tw-justify-end tw-space-x-2 tw-py-4 tw-px-3 tw-bg-white">
                <Button
                    variant="outline"
                    size="sm"
                    onClick={() => table.previousPage()}
                    disabled={!table.getCanPreviousPage() || loading}
                >
                    Previous
                </Button>
                <Button
                    variant="outline"
                    size="sm"
                    onClick={() => table.nextPage()}
                    disabled={!table.getCanNextPage() || loading}
                >
                    Next
                </Button>
            </div>
        
        </div>
        </>
    )
}
