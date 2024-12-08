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
import React, { Dispatch, useEffect, useState } from "react"
import { getApplications, getRuns } from "@/src/utils/requests"
import { ApplicationObject, NestedApplicationRun } from "@/src/utils/applicaid-ts-utils/cv_form_types"
import { toast } from "@/components/ui/use-toast"
import { multiplyKeys } from "./utils/fetch"
import { ArrowUpDown } from "lucide-react"
import { Input } from "@/components/ui/input"
type RowPinningPosition = false | 'top' | 'bottom'
type RowPinningState = {
    top?: string[]
    bottom?: string[]
}
type RowPinningRowState = {
    rowPinning: RowPinningState
}

interface RunsDataTableProps<TData, TValue, AppId> {
    columns: ColumnDef<TData, TValue>[]
    data: TData[],
    app_id: string
    setRunId: Dispatch<any>,
    defaultRuns: [string|null, string|null],
    setDefaultRuns: Dispatch<[string|null, string|null]>
}

export function RunsDataTable<TData, TValue, AppId, FRunId>({
    columns,
    data,
    app_id,
    setRunId,
    defaultRuns,
    setDefaultRuns
}: RunsDataTableProps<NestedApplicationRun, TValue, string>) {
    const [sorting, setSorting] = useState<SortingState>([])
    const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>(
        []
    )

    const [runs, setRuns] = useState(data)
    // const [pinnedRuns, setPinnedRuns] = useState([null,null])
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

    const [rowPinning, setRowPinning] = useState<RowPinningState>({
        top: [],
        bottom: [],
    })

    

    

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
            if( result.runs.length !== 0){
                setDefaultRuns([result.runs[0].applications.resume_used, result.runs[0].applications.cover_letter_used])
            }
            console.log('rows')
            console.log(defaultRuns[0], defaultRuns[1])
            setRuns(() => result.runs);
            let pinned = []
            result.runs.forEach((run, idx) => {
                if(run.id === defaultRuns[0] || run.id === defaultRuns[1]){
                    pinned.push(idx.toString())
                }
            })
            setRowPinning({
                top: pinned,
                bottom: [],
            })

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
        enableRowPinning: true,
        keepPinnedRows: false,
        onRowPinningChange: setRowPinning,
        state: {
            pagination: pagination,
            sorting: sorting,
            columnFilters,
            rowPinning,
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
            <div className="tw-rounded-sm tw-border">
                <Table className="tw-bg-white">
                    <TableHeader className="tw-bg-primary">
                    {table.getHeaderGroups().map((headerGroup) => (
                        <TableRow className="hover:tw-bg-primary"key={headerGroup.id}> 
                            {headerGroup.headers.map((header) => {
                                return (
                                    
                                    <TableHead key={header.id}>

                                        <div className="tw-flex tw-justify-between ">
                                        
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
                    {
                        table.getTopRows().map((row) => {
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
                    }
                    {table.getRowModel().rows?.length ? (
                        table.getCenterRows().map((row) => {
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
