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
import { getApplications, getRuns } from "@/src/utils/requests"
import { ApplicationObject, NestedApplicationRun } from "@/src/utils/applicaid-ts-utils/cv_form_types"
import { toast } from "@/components/ui/use-toast"
import { multiplyKeys } from "./utils/fetch"
import { ArrowUpDown } from "lucide-react"
import { Input } from "@/components/ui/input"


interface RunsDataTableProps<TData, TValue, AppId> {
    columns: ColumnDef<TData, TValue>[]
    data: TData[],
    app_id: string
    setRunId: Dispatch<any>
}

export function RunsDataTable<TData, TValue, AppId, FRunId>({
    columns,
    data,
    app_id,
    setRunId
}: RunsDataTableProps<NestedApplicationRun, TValue, string>) {
    const [sorting, setSorting] = useState<SortingState>([])
    const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>(
        []
    )

    const [runs, setRuns] = useState(data)
    
    const [pageIndex, setPageIndex] = useState(0);
    const [pageSize, setPageSize] = useState(10);
    const [hasMore, setHasMore] = useState(Math.floor(runs.length / pageSize) >= 1);
    const [loading, setLoading] = useState(false);
    const [pagination, setPagination] = useState({
        pageIndex: pageIndex, //initial page index
        pageSize: pageSize, //default page size
    });

    const [filterState, setFilterState] = useState({    
        ts: new Date().toISOString(),
        app_id,
        order: 'desc' as 'asc' | 'desc'
    } );

    

    const fetchData = async (pageintionState: PaginationState, { ts, app_id, order }: { ts: string, app_id: string, order: 'asc' |'desc' }) => {
        setLoading(() => true);
        try {

         
            const response = await getRuns(app_id, ts)
            
            // Replace with your actual API endpoint
            if (!response) {
                throw new Error('Failed to fetch data');
            }
            const result = response.data
            setHasMore( () => Math.floor(result.runs.length / pageSize) >= 1);
            console.log(result.runs)
            setRuns(() => result.runs);

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
        data : runs,
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
        {/* <div className="flex items-center py-4">
        <Input 
          placeholder="Filter Companies..."
            value={
                
                (table.getColumn("company_key")?.getFilterValue() as string) ?? ""
            }
            onChange={(event) =>{
                    table.getColumn("company_key")?.setFilterValue(event.target.value)
                }
            }
          className="max-w-sm dark:bg-slate-900 bg-white"
        />
      </div> */}
        <div className="rounded-md border">
            <Table className="bg-white">
                <TableHeader>
                    {table.getHeaderGroups().map((headerGroup) => (
                        <TableRow key={headerGroup.id}>
                            {headerGroup.headers.map((header) => {
                                return (
                                    
                                    <TableHead key={header.id}>

                                        <div className="flex justify-between">
                                        
                                        {
                                        header.isPlaceholder
                                            ? null
                                            : flexRender(
                                                header.column.columnDef.header,
                                                header.getContext(),
                                            )
                                        }

                                            {header.id === 'creation_dt' && <Button variant="ghost"><ArrowUpDown className="h-full  w-4 mx-2" onClick={() => {
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
                            <TableCell colSpan={columns.length} className="h-24 text-center mx-2">
                                No results.
                            </TableCell>
                        </TableRow>
                    )}
                </TableBody>
            </Table>
            <div className="flex items-center justify-end space-x-2 py-4 px-3 bg-white">
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
