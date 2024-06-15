// Code generated with love by Applicaid
// @ts-expect-error
// @ts-nocheck

import { Table, TableCaption, TableHeader, TableRow, TableHead, TableBody, TableCell } from '@/components/ui/table'
import { CVInfo, ProjectsSlot }  from '@/src/utils/applicaid-ts-utils/cv_type'
import testcv from '@/src/test/data/cv.json'
import Link from "next/link"
import { zodResolver } from "@hookform/resolvers/zod"
import validator from "validator"
import { FieldArrayWithId, UseFormReturn, useFieldArray, useForm } from "react-hook-form"
import { z } from "zod"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import {
    Collapsible,
    CollapsibleContent,
    CollapsibleTrigger,
  } from "@/components/ui/collapsible"
import { generateRandomId } from './utils'
import { Textarea } from "@/components/ui/textarea"
import { toast } from "@/components/ui/use-toast"
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover'
import { Calendar } from '@/components/ui/calendar'
import { CalendarIcon, CardStackIcon, ChevronDownIcon, PlusIcon } from '@radix-ui/react-icons'
import { format, set } from 'date-fns'
import { Checkbox } from '@/components/ui/checkbox'
import { Separator } from '@/components/ui/separator'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { ChevronsUpDown } from 'lucide-react'
import { useEffect, useState } from 'react'
import { error } from 'console'
import { Label } from '@/components/ui/label'
import { DropdownMenu } from '@radix-ui/react-dropdown-menu'
import { randomBytes, randomUUID } from 'crypto'
import Trash from '../../../assets/trash-2.svg?react'
import SvgIcon from '../../../assets/settings.svg?react'
import XIcon from '../../../assets/x.svg?react'
import { DropdownMenuCheckboxItem, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from '@/components/ui/dropdown-menu'

// console.warn = () => {}
// console.error = () => {}


/* 
test data, erase later
*/
import { projects } from '@/src/test/data/mock_data'
import { Switch } from '@/components/ui/switch'
import { DefaultView } from '@/src/components/ui/defaultView'

const projectSchema = z.object({
    id: z.string().optional(),
    name: z.string(),
    immutable: z.boolean().default(false),
    takeaways: z.array(
        z.object({
            immutabe: z.boolean(),
            takeaway: z.string(),
            id: z.string().optional(),
        })).default([]),
})

type ProjectValues = z.infer<typeof projectSchema>
export function ProjectsEdit({ data, tokens }: { data: ProjectsSlot, tokens:number }) {
    const [addProjectOpen, setAddProjectOpen] = useState(false)
    const [addProjectName, setAddProjectName] = useState('')
    const ProjectFormSchema = z.object({
        projects: z.array(projectSchema).default([]),
    })

    const addProjectTypeing = (e) => {
      e.preventDefault()
      console.log(e)
      setAddProjectName(e.target.value)
  }

    
    type ProjectFormValues = z.infer<typeof ProjectFormSchema>
    
    // This can come from your database or API.
    const defaultValues: Partial<ProjectFormValues> = { projects: [] }

    const form = useForm<ProjectFormValues>({
        shouldFocusError: true,
        resolver: zodResolver(ProjectFormSchema),
        defaultValues,
        mode: "onChange"
    })
    
    const { fields, append, replace, remove } = useFieldArray<ProjectFormValues>({
        name: "projects",
        control: form.control,
    })

  function onSubmit(data: ProjectFormValues) {
    console.log('submitted')
    // toast({
    //   title: "You submitted the following values:",
    //   description: (
    //     <pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4">
    //       <code className="text-white">{JSON.stringify(data, null, 2)}</code>
    //     </pre>
    //   ),
    // })
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit) //onSubmit
      } className="space-y-8">
       
        <div>
        {fields.map((field, index) => (
            console.log(fields),
            <Card className='mb-10 bg-primary-50'>
              <div className='flex justify-end'>
              <div className='padding-2 hover:bg-secondary m-3 rounded-md transition ease-in-out'>
              {/* <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="secondary" className="px-2 shadow-none">
                  <ChevronDownIcon className="h-4 w-4 text-secondary-foreground" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent
                align="end"
                alignOffset={-5}
                className="w-[200px]"
                forceMount
              >
                <DropdownMenuLabel>Suggested Lists</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuCheckboxItem checked>
                  Future Ideas
                </DropdownMenuCheckboxItem>
                <DropdownMenuCheckboxItem>My Stack</DropdownMenuCheckboxItem>
                <DropdownMenuCheckboxItem>Inspiration</DropdownMenuCheckboxItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem>
                  <PlusIcon className="mr-2 h-4 w-4" /> Create List
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu> */}
              <Trash className='stroke-slate-500 m-2 stroke-2 sm:w-1 sm:h-1 md:h-3 md:w-3 lg:h-5 lg:w-5 align-right'/>
              </div>
              </div>
                <div>
                
                <Label>{field.name}</Label>
                <div className='flex mt-6 mb-6 justify-around'>
                <div className='flex-column w-full relative'>

                {field.takeaways.map((takeaway, inx) => (
                    <div className='flex justify-center ml-3'> 
                      <FormField
                      control={form.control}
                      key={field.id}
                      name={`projects.${index}.takeaways.${inx}.takeaway`}
                      render={({ field }) => (

                          <FormItem className='flex m-2 relative w-3/4'>
                              <FormControl>
                                  <Textarea  {...field} value={takeaway.takeaway || ""}/>
                              </FormControl>
                              <FormMessage />
                          </FormItem>
                      )}
                      />
                      <div className='flex relative items-center'>

                        <XIcon className='stroke-slate-500 m-1 stroke-2 sm:w-1 sm:h-1 md:h-3 md:w-3 lg:h-5 lg:w-5 flex hover:stroke-red-400 transition ease-in-out'/>
                      </div>
                    </div>
                    // Add your code here
                ))}
                </div>
                </div>
            </div>
            
            <Button
                type="button"
                variant="outline"
                size="sm"
                key={field.id}
                className="mt-2"
                onClick={(e) => {
                    e.preventDefault()
                    console.log(fields)
                    const n = [...fields[index].takeaways, {immutabe: false, takeaway: ''}]
                    fields[index].takeaways = n
                    remove(fields)
                    setTimeout(() => {
                        replace(fields)
                    }, 200)
                    
                }}
            >
                Add takeaway
            </Button>
            </Card>
        ))}
          
          <Popover open={addProjectOpen}>
              <PopoverTrigger>
                <Button variant="outline"
                onClick={() => setAddProjectOpen(!addProjectOpen)}
                role="combobox"
                aria-expanded={addProjectOpen}
                className="w-[200px] justify-between">
                Add Project
                </Button>
              </PopoverTrigger>
               <PopoverContent>
               <Input onChange={addProjectTypeing}>
               </Input>
               <Button
                type="button"
                variant="outline"
                size="sm"
                className="mt-2"
                onClick={() => {
                  setAddProjectOpen(false)
                  append({ name: addProjectName, takeaways: [], immutable: false})
                  setTimeout(() => {
                    setAddProjectName('')
                  },300)
                  
                }}
                >
                Add Project
              </Button>
               </PopoverContent>
            </Popover>
          
        </div>
        <Button type="submit">Update profile</Button>
      </form>
    </Form>
  )
}


export const ProjectsView = ({ data }: {data:ProjectsSlot}) => {
  return (
    <DefaultView>

    </DefaultView>
  )
}
  