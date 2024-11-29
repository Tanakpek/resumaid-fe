import { CVInfo, Education } from '@/src/utils/applicaid-ts-utils/cv_type'
import testcv from '@/src/test/data/cv.json'
import Link from "next/link"
import { zodResolver } from "@hookform/resolvers/zod"
import { Bold, Italic, Underline } from "lucide-react"
import { useFieldArray, useForm } from "react-hook-form"
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
    Collapsible,
    CollapsibleContent,
    CollapsibleTrigger,
} from "@/components/ui/collapsible"

import { toast } from "@/components/ui/use-toast"
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover'
import { Calendar } from '@/components/ui/calendar'
import { CalendarIcon } from '@radix-ui/react-icons'
import { format, set } from 'date-fns'
import { Checkbox } from '@/components/ui/checkbox'
import { Separator } from '@/components/ui/separator'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { ChevronsUpDown, XIcon } from 'lucide-react'
import { Dispatch, SetStateAction, useEffect, useState } from 'react'
import { CVPartView } from './utils'
import { EducationFormValues, educationFormSchema } from '@/src/utils/applicaid-ts-utils/cv_form_types'
import { TransformedCV, transformCV } from '@/src/utils/codes'
import { deleteEducation, postEducation } from '@/src/utils/requests'
import Trash from '../../../assets/trash-2.svg?react'
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from '@/components/ui/alert-dialog'
import { ToggleGroup, ToggleGroupItem } from '@/components/ui/toggle-group'

export function EducationEdit({ data, tokens, setcv }) {
    const [defaultValues, setDefaultValues] = useState({ education: data })
    const [multipleCapError, setMultipleCapError] = useState(false)
    const [multipleGradeError, setMultipleGradeError] = useState(false)
    
    const [isOpenCaps, setIsOpenCaps] = useState<boolean[]>([])
    const [isOpenGrades, setIsOpenGrades] = useState<boolean[]>([])

    // todo: add capstone and grade to the form
    const [capstones, setCapstones] = useState<string[]>([])
    const [grades, setGrades] = useState<string[]>([])
    const [capstone, setCapstone] = useState<string>("none0")
    const [grade, setGrade] = useState<string>("noneGrade0")

    const form = useForm<EducationFormValues>({
        shouldFocusError: true,
        resolver: zodResolver(educationFormSchema),
        defaultValues: { education: data },
        mode: "onChange"
    })

    useEffect(() => {
        const education = data as Education[]
        const capsOpen = new Array(education.length).fill(false)
        const gradesOpen = new Array(education.length).fill(false)
        const capstones = new Array(education.length).fill('')
        const grades = new Array(education.length).fill('')
        
        education.forEach((ed, index) => {
            gradesOpen[index] = (ed.gpa || ed.score || ed.classification) ? true : false
            capsOpen[index] = (ed.thesis || ed.dissertation) ? true : false
            capstones[index] = ed.thesis ? 'thesis' : ed.dissertation ? 'dissertation' : 'none'
            grades[index] = ed.gpa ? 'gpa' : ed.score ? 'score' : ed.classification ? 'classification' : 'none'
            ed['capstone'] = ed.thesis ? { thesis: ed.thesis } : ed.dissertation ? { dissertation: ed.dissertation } : {}
            ed['outcome'] = ed.score ? { score: ed.score } : ed.gpa ? { gpa: ed.gpa } : ed.classification ? { classification: ed.classification } : {}
        })
        
        setIsOpenCaps(() => capsOpen)
        setIsOpenGrades(() =>  gradesOpen)
        setGrades(() => grades)
        setCapstones(() => capstones)
        
        setDefaultValues(data)
        form.reset({ education: data })
        
    }, [data])

    const { fields, append, remove } = useFieldArray({
        name: "education",
        control: form.control,
    })

    const removeHandler = async (ed, edIndex) => {
        if (ed._id) {
            const cv = await deleteEducation(ed._id)
            setcv(transformCV(cv.data))
        }
        else {
            remove(edIndex);
            setIsOpenCaps((prev) => {
                prev.splice(edIndex, 1)
                return prev
            })
            setIsOpenGrades((prev) => {
                prev.splice(edIndex, 1)
                return prev
            })
            setCapstones((prev) => {
                prev.splice(edIndex, 1)
                return prev
            })
            setGrades((prev) => {
                prev.splice(edIndex, 1)
                return prev
            })
        }
    }
    async function onSubmit(data: EducationFormValues) {
        const caps = capstones
        const grds = grades
        console.log(data)
        const resp = await postEducation(data)

        if (resp.status === 200) {
            try {
                const cv = (transformCV(resp.data))


                if (cv) {
                    toast({
                        title: "You changed your details successfully!",
                        description: (
                            <pre className="tw-mt-2 tw-w-[340px] tw-rounded-md tw-bg-slate-950 tw-p-4">
                                <code className="tw-text-white">EDUCATION</code>
                            </pre>
                        ),
                    })
                    setcv(() => cv)
                    form.reset({ education: cv.education })

                }
                else {
                    throw new Error("Could not transform CV")
                }
            } catch (e) {
                toast({
                    title: "Something went wrong",
                    description: (
                        <pre className="tw-mt-2 tw-w-[340px] tw-rounded-md tw-bg-slate-950 tw-p-4">
                            <code className="tw-text-white">{ }</code>
                        </pre>
                    ),
                })
            }
        } else {
            toast({
                title: "Bad Request",
                description: (
                    <pre className="tw-mt-2 w-[340px] tw-rounded-md tw-bg-slate-950 tw-p-4">
                        <code className="tw-text-white">{resp.statusText}</code>
                    </pre>
                ),
            })
        }
    }

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit) //onSubmit
            } className="tw-space-y-8">

                <div>

                    {fields.map((field, index) => (
                    
                        <div className='tw-flex-column tw-m-5' key={index}>
                            <Card>
                                <div className='tw-flex tw-justify-end tw-mt-3 tw-mr-4'>
                                    <AlertDialog>
                                        <AlertDialogTitle className='tw-hidden'>Delete</AlertDialogTitle>
                                        <AlertDialogTrigger asChild>
                                            <Trash className='tw-stroke-slate-500 tw-m-2 tw-stroke-2 sm:tw-w-1 sm:tw-h-1 md:tw-h-3 md:tw-w-3 lg:tw-h-5 lg:tw-w-5 tw-align-right hover:tw-stroke-red-400 tw-transition tw-ease-in-out' />
                                        </AlertDialogTrigger>
                                        <AlertDialogContent>
                                            <AlertDialogHeader>
                                                <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                                                <AlertDialogDescription>
                                                    Are you sure you want to delete this experience? This action cannot be undone.
                                                </AlertDialogDescription>
                                            </AlertDialogHeader>
                                            <AlertDialogFooter>
                                                <AlertDialogCancel>Cancel</AlertDialogCancel>
                                                <AlertDialogAction onClick={() => { removeHandler(field, index) }}>Continue</AlertDialogAction>
                                            </AlertDialogFooter>
                                        </AlertDialogContent>
                                    </AlertDialog>
                                </div>


                                <div className='tw-m-5'>
                                    <div className='tw-flex tw-justify-between'>
                                        <FormField
                                            control={form.control}
                                            name={`education.${index}.start`}
                                            render={({ field }) => (
                                                <FormItem className="tw-flex tw-flex-col">
                                                    <FormLabel>Start Date</FormLabel>
                                                    <Popover>
                                                        <PopoverTrigger asChild>
                                                            <FormControl>
                                                                <Button
                                                                    variant={"outline"}
                                                                    className={cn(
                                                                        "tw-w-[240px] tw-pl-3 tw-text-left tw-font-normal",
                                                                        !field.value && "tw-text-muted-foreground"
                                                                    )}
                                                                >
                                                                    {field.value ? field.value === 'PRESENT' ? <span>Pick a date</span> : format(new Date(field.value), "PPP") : <span>Pick a date</span>}                            <CalendarIcon className="tw-ml-auto tw-h-4 tw-w-4 tw-containeropacity-50" />
                                                                </Button>
                                                            </FormControl>
                                                        </PopoverTrigger>
                                                        <PopoverContent className="tw-w-auto p-0" align="start">
                                                            <Calendar

                                                                // captionLayout='dropdown-buttons'
                                                                captionLayout="dropdown"
                                                                fromYear={1900}
                                                                toYear={new Date().getFullYear() + 1}
                                                                mode="single"

                                                                onSelect={(x) => { field.onChange(x.toISOString()) }}
                                                                disabled={(date) =>
                                                                    date > new Date() || date < new Date("1900-01-01")
                                                                }
                                                                initialFocus
                                                            />
                                                        </PopoverContent>
                                                    </Popover>
                                                    <FormMessage />
                                                </FormItem>
                                            )}
                                        />
                                        <FormField
                                            key={field.id + 'end'}
                                            control={form.control}
                                            name={`education.${index}.end`}
                                            render={({ field }) => (
                                                <FormItem className="tw-flex tw-flex-col">
                                                    <FormLabel>End Date</FormLabel>
                                                    <Popover>
                                                        <PopoverTrigger asChild>
                                                            <FormControl>
                                                                <Button
                                                                    variant={"outline"}
                                                                    className={cn(
                                                                        "tw-w-[240px] tw-pl-3 tw-text-left tw-font-normal",
                                                                        !field.value && "tw-text-muted-foreground"
                                                                    )}
                                                                >
                                                                    {field.value ? field.value === 'PRESENT' ? <span>Present</span> : format(new Date(field.value), "PPP") : <span>Pick a date</span>}
                                                                    <CalendarIcon className="tw-ml-auto tw-h-4 tw-w-4 " />
                                                                </Button>
                                                            </FormControl>
                                                        </PopoverTrigger>
                                                        <PopoverContent className="tw-w-auto p-0" align="start">
                                                            <Calendar
                                                                // captionLayout='dropdown-buttons'
                                                                captionLayout="dropdown"
                                                                fromYear={1900}
                                                                toYear={new Date().getFullYear() + 1}
                                                                mode="single"
                                                                // selected={field.value || null}
                                                                onSelect={(x) => { field.onChange(x.toISOString()) }}
                                                                disabled={(date) =>
                                                                    date > new Date() || date <= new Date("1900-01-01")
                                                                }
                                                                initialFocus
                                                            />
                                                        </PopoverContent>
                                                        <div className='tw-flex tw-self-start'>
                                                            <Checkbox
                                                                className='tw-self-center tw-mx-2'
                                                                checked={field.value === ""}
                                                                onCheckedChange={
                                                                    (checked => {
                                                                        field.value = undefined
                                                                        field.onChange(checked ? "" : field.value)
                                                                    })
                                                                }
                                                            />
                                                            <p className='tw-text-sm'>Present</p>
                                                        </div>
                                                    </Popover>
                                                    <FormMessage />
                                                </FormItem>
                                            )}
                                        />
                                    </div>
                                    <div />
                                    <div className='tw-my-3'>
                                        <FormField
                                            control={form.control}
                                            key={field.id}
                                            name={`education.${index}.institution`}
                                            render={({ field }) => (

                                                <FormItem>
                                                    <FormLabel>
                                                        Institution
                                                    </FormLabel>
                                                    <FormDescription>
                                                        Add your education background.
                                                    </FormDescription>
                                                    <FormControl>
                                                        <Input {...field} value={field.value || ""}  />
                                                    </FormControl>
                                                    <FormMessage />
                                                </FormItem>
                                            )}
                                        />
                                    </div>
                                    <FormField
                                        control={form.control}
                                        key={field.id}
                                        name={`education.${index}.degree`}

                                        render={({ field }) => (

                                            <FormItem>
                                                <FormLabel>
                                                    Degree or Programme
                                                </FormLabel>
                                                <FormDescription>
                                                    Tell us about what you studied.
                                                </FormDescription>
                                                <FormControl>
                                                    <Input {...field} value={field.value || ""} />
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />

                                    <Collapsible
                                        open={(isOpenCaps[index])}
                                        onOpenChange={() => {
                                            //setIsOpen([index, !isOpen[1]]) 
                                            const openCaps = isOpenCaps
                                            openCaps[index] = !isOpenCaps[index]
                                            setIsOpenCaps([...openCaps])
                                            
                                        }}
                                        className="tw-w-full tw-space-y-1 tw-mt-6"
                                    >
                                        <div className="tw-col tw-items-center justify-between tw-space-x-4 tw-px-0 tw-w-full">
                                            <CollapsibleTrigger asChild >
                                                
                                                <Button variant="ghost" size="lg" className={`tw-w-full tw-px-4 ${isOpenCaps[index] && "tw-bg-slate-100"}`} >
                                                    <p>Capstone Project</p> <p className='tw-font-thin tw-text-slate-800'>(Optional)</p>
                                                    {/* {
                                                        form.getValues().education[index].capstone && Object.values(form.getValues().education[index].capstone).filter(e => { return e !== undefined && e !== "" }).length > 1 ? <span className='tw-text-red-500'>Only one field should be filled</span> : ''
                                                    } */}
                                                </Button>
                                            </CollapsibleTrigger>
                                        </div>

                                        <CollapsibleContent className="tw-space-y-2">
                                            <ToggleGroup type="single" className='tw-mb-3'>

                                                <ToggleGroupItem value="italic" aria-label="Toggle italic" className='tw-text-xs' onClick={
                                                    () => { 
                                                        // setCapstone('thesis' + index.toString())
                                                        const currentCapstones = capstones
                                                        currentCapstones[index] = 'thesis'
                                                        setCapstones([...currentCapstones])
                                                     }
                                                }>
                                                    Thesis
                                                </ToggleGroupItem>
                                                <ToggleGroupItem value="strikethrough" aria-label="Toggle strikethrough" className='tw-text-xs' onClick={
                                                    () => { 
                                                        // setCapstone('dissertation' + index.toString()) 
                                                        const currentCapstones = capstones
                                                        currentCapstones[index] = 'dissertation'
                                                        setCapstones([...currentCapstones])
                                                    }
                                                }>
                                                    Dissertation
                                                </ToggleGroupItem>
                                            </ToggleGroup>
                                        </CollapsibleContent>
                                    </Collapsible>
                                    <FormField
                                        control={form.control}
                                        key={field.id + 'dissertation'}
                                        
                                        name={`education.${index}.capstone.dissertation`}
                                        render={({ field }) => (
                                            
                                            <FormItem className={capstones[index] === 'dissertation' ? "" : 'tw-hidden'}>
                                                <FormLabel>
                                                    
                                                </FormLabel>
                                                <div className='tw-grid tw-grid-cols-6 tw-justify-center tw-grow'>
                                                    <FormDescription className='tw-col-span-4 tw-col-start-2 tw-align-middle'>
                                                        What was the title of your dissertation.
                                                    </FormDescription>
                                                    <div className='tw-col-span-1 tw-col-start-6 tw-flex-shrink '>
                                                        
                                                        <div className='tw-flex tw-justify-end '>
                                                        <XIcon onClick={() => { 
                                                            
                                                            field.onChange('')
                                                            // setCapstone('none' + index.toString())
                                                            const currentCapstones = capstones
                                                            currentCapstones[index] = 'none'
                                                            setCapstones([...currentCapstones])
                                                        }} className=' tw-stroke-slate-800 tw-m-2 tw-stroke-3 sm:tw-w-1 sm:tw-h-1 md:tw-h-3 md:tw-w-3 lg:tw-h-5 lg:tw-w-5 tw-flex hover:tw-stroke-red-400 tw-transition tw-ease-in-out ' />
                                                        </div>

                                                    </div>
                                                    
                                                    
                                                    <FormControl className='tw-col-span-6 mt-0'>
                                                    <Input {...field} value={field.value || ""} />
                                                    </FormControl>

                                                    <FormMessage className='tw-col-span-6' />
                                                </div>
                                            </FormItem>
                                        )}
                                    />
                                    <FormField
                                        control={form.control}
                                        key={field.id + 'thesis'}
                                        name={`education.${index}.capstone.thesis`}
                                        render={({ field }) => (

                                            <FormItem className={capstones[index] === 'thesis' ? "" : 'tw-hidden'}>
                                                <FormLabel>

                                                </FormLabel>
                                                <div className='tw-grid tw-grid-cols-6 tw-justify-center tw-grow'>
                                                    <FormDescription className='tw-col-span-4 tw-col-start-2'>
                                                        What was the title of your thesis.
                                                    </FormDescription>
                                                    <div className='tw-col-span-1 tw-col-start-6 tw-flex-shrink'>
                                                        <div className='tw-flex tw-justify-end'>
                                                            <XIcon onClick={() => {

                                                                field.onChange('')
                                                                // setCapstone('none' + index.toString())
                                                                setCapstones((prev) => {
                                                                    prev[index] = 'none'
                                                                    return prev
                                                                })
                                                            }} className=' tw-stroke-slate-800 tw-m-2 tw-stroke-3 sm:tw-w-1 sm:tw-h-1 md:tw-h-3 md:tw-w-3 lg:tw-h-5 lg:tw-w-5 tw-flex hover:tw-stroke-red-400 tw-transition tw-ease-in-out' />
                                                        </div>
                                                    </div>
                                                    
                                                    <FormControl className='tw-col-span-6 mt-0'>
                                                    <Input {...field} value={field.value || ""} />
                                                </FormControl>
                                                    <FormMessage className='tw-col-span-6 mt-0' />
                                                </div>
                                            </FormItem>
                                        )}
                                    />

                                    <Collapsible
                                        open={(isOpenGrades[index])}
                                        onOpenChange={() => {
                                            //setIsOpenGrade([index, !isOpenGrade[1]]) 
                                            const openGrades = isOpenGrades
                                            openGrades[index] = !isOpenGrades[index]
                                            setIsOpenGrades([...openGrades])
                                        }}
                                        className="tw-flex-col tw-space-y-1 tw-mt-1 tw-w-full"
                                    >

                                        <div className="tw-w-full tw-items-center tw-justify-between tw-space-x-4 tw-px-0">
                                            <CollapsibleTrigger asChild className='tw-w-full' >
                                                <Button variant="ghost"  size="default" className={`tw-w-full tw-px-4 ${isOpenGrades[index] && "tw-bg-slate-100"}`}>
                                                    <p>Outcome</p> <p className='tw-font-thin tw-text-slate-800'>(Optional)</p> 
                                                    {/* {
                                                        form.getValues().education[index].outcome && Object.values(form.getValues().education[index].outcome).filter(e => { return e !== undefined && e !== "" }).length > 1 ? <span className='tw-text-red-500'>Only one field should be filled</span> : ''
                                                    } */}
                                                </Button>
                                            </CollapsibleTrigger>
                                        </div>


                                        <CollapsibleContent className="tw-space-y-2">
                                            <ToggleGroup type="single" className='tw-mb-3' >

                                                <ToggleGroupItem value="score" aria-label="Toggle score" className='tw-text-xs' onClick={
                                                    () => { 
                                                        // setGrade('score' + index.toString())
                                                        const currentGrades = grades
                                                        currentGrades[index] = 'score'
                                                        setGrades([...currentGrades])
                                                    }
                                                }>
                                                    Score
                                                </ToggleGroupItem>

                                                <ToggleGroupItem value="grade" aria-label="Toggle grade" className='tw-text-xs' onClick={
                                                    () => { 
                                                        // setGrade('gpa' + index.toString()) 
                                                        const currentGrades = grades
                                                        currentGrades[index] = 'gpa'
                                                        setGrades([...currentGrades])
                                                    }
                                                }>
                                                    GPA
                                                </ToggleGroupItem>
                                                
                                                <ToggleGroupItem value="classification" aria-label="Toggle grade" className='tw-text-xs' onClick={
                                                    () => { 
                                                        // setGrade('classification' + index.toString())
                                                        const currentGrades = grades
                                                        currentGrades[index] = 'classification'
                                                        setGrades([...currentGrades])
                                                     }
                                                }>
                                                    Classification
                                                </ToggleGroupItem>
                                            </ToggleGroup>

                                        </CollapsibleContent>
                                    </Collapsible>
                                    <FormField
                                        control={form.control}
                                        key={field.id + 'gpa'}
                                        name={`education.${index}.outcome.gpa`}
                                        render={({ field }) => (

                                            <FormItem className={grades[index] === 'gpa' ? '' : "tw-hidden"}>
                                                <FormLabel>
                                                </FormLabel>
                                                <div className='tw-grid tw-grid-cols-6'>
                                                    <FormDescription className='tw-col-span-4 tw-col-start-2'>
                                                        What was your GPA.

                                                    </FormDescription>
                                                
                                                    <div className='tw-col-span-1 tw-col-start-6 '>
                                                        <div className='tw-flex tw-justify-end'>
                                                            <XIcon onClick={() => {

                                                                field.onChange('')
                                                                const currentGrades = grades
                                                                currentGrades[index] = 'none'
                                                                setGrades([...currentGrades])
                                                            }} className=' tw-stroke-slate-800 tw-m-2 tw-stroke-3 sm:tw-w-1 sm:tw-h-1 md:tw-h-3 md:tw-w-3 lg:tw-h-5 lg:tw-w-5 tw-flex hover:tw-stroke-red-400 tw-transition tw-ease-in-out' />
                                                        </div>
                                                    </div>
                                                
                                                <FormControl className='tw-col-span-6'>
                                                    <Input {...field} value={field.value || ""} />
                                                    
                                                </FormControl>
                                                <FormMessage className='tw-col-span-6' />
                                                </div>
                                            </FormItem>
                                        )}
                                    />
                                    <FormField
                                        control={form.control}
                                        key={field.id + 'score'}
                                        name={`education.${index}.outcome.score`}
                                        render={({ field }) => (

                                            <FormItem className={ grades[index] === 'score' ? '' : "tw-hidden"}>
                                                <FormLabel>
                                                </FormLabel>
                                                <div className='tw-grid tw-grid-cols-6'>
                                                    <FormDescription className='tw-col-span-4 tw-col-start-2'>
                                                        What was your score out of 100?
                                                    </FormDescription>
                                                    <div className='tw-col-span-1 tw-col-start-6 '>
                                                        <div className='tw-flex tw-justify-end'>
                                                            <XIcon onClick={() => {

                                                                field.onChange('')
                                                                // setGrade('none' + index.toString())
                                                                const currentGrades = grades
                                                                currentGrades[index] = 'none'
                                                                setGrades([...currentGrades])
                                                            }} className=' tw-stroke-slate-800 tw-m-2 tw-stroke-3 sm:tw-w-1 sm:tw-h-1 md:tw-h-3 md:tw-w-3 lg:tw-h-5 lg:tw-w-5 tw-flex hover:tw-stroke-red-400 tw-transition tw-ease-in-out' />
                                                        </div>
                                                    </div>
                                                
                                                <FormControl className='tw-col-span-6'>
                                                    <Input {...field} value={field.value || ""} />
                                                </FormControl>
                                                <FormMessage className='tw-col-span-6' />
                                                </div>
                                            </FormItem>
                                        )}
                                    />
                                    <FormField
                                        control={form.control}
                                        key={field.id + 'classification'}
                                        name={`education.${index}.outcome.classification`}
                                        render={({ field }) => (

                                            <FormItem className={grades[index] === 'classification' ? '' : "tw-hidden"}>
                                                <FormLabel>
                                                </FormLabel>
                                                <div className='tw-grid tw-grid-cols-6'>
                                                    <FormDescription className='tw-col-span-4 tw-col-start-2' >
                                                        What was your classification at graduation?
                                                    </FormDescription>
                                                    <div className='tw-col-span-1 tw-col-start-6 '>
                                                        <div className='tw-flex tw-justify-end'>
                                                            <XIcon onClick={() => {

                                                                field.onChange('')
                                                                // setGrade('none' + index.toString())
                                                                const currentGrades = grades
                                                                currentGrades[index] = 'none'
                                                                setGrades([...currentGrades])
                                                            }} className=' tw-stroke-slate-800 tw-m-2 tw-stroke-3 sm:tw-w-1 sm:tw-h-1 md:tw-h-3 md:tw-w-3 lg:tw-h-5 lg:tw-w-5 tw-flex hover:tw-stroke-red-400 tw-transition tw-ease-in-out' />
                                                        </div>
                                                    </div>
                                                    
                                                    <FormControl className='tw-col-span-6' >
                                                    <Input className='tw-w-full' {...field} value={field.value || ""} />
                                                </FormControl>
                                                    <FormMessage className='tw-col-span-6' />
                                                </div>
                                            </FormItem>
                                        )}
                                    />
                                </div>

                            </Card>
                            <Separator className="tw-my-6" />
                        </div>

                    ))}

                    <Button
                        type="button"
                        variant="outline"
                        size="sm"
                        className="tw-mt-2"
                        onClick={() => {
                            append({ immutable: false, _id: undefined })
                            setIsOpenCaps([...isOpenCaps, false])
                            setIsOpenGrades([...isOpenGrades, false])
                            setCapstones([...capstones, 'none'])
                            setGrades([...grades, 'none'])
                        }}
                    >
                        Add Education
                    </Button>
                </div>
                <Button type="submit">Update profile</Button>
            </form>
        </Form>
    )
}

export const EducationView: CVPartView = ({ data, setcv }: { data: Education[], setcv: Dispatch<SetStateAction<TransformedCV>> }) => {
    return (

        data.map((education, index) => {
            return (<Card key={index + 'view'}>
                <div className='tw-m-4 tw-mr-10'>
                    <p className='tw-text-right tw-italic'> {education.dates ? education.dates.length == 1 ? education.dates : `${education.dates[0]} - ${education.dates[1]}` : ''}</p>
                </div>
                <CardHeader  key={index + 'view'} className=' tw-font-bold !tw-mb-0 tw-p-0'> {education.degree}</CardHeader>
                <CardDescription className='!tw-mt-0'>{education.institution}</CardDescription>
                <CardContent className='tw-mt-10'>
                    {(education.thesis || education.dissertation) &&
                        <div>
                            {
                                education.dissertation && <div><div className='tw-flex'> <p className=' tw-font-bold tw-mr-2'>Dissertation:</p> {education.dissertation}</div> </div> ||
                                education.thesis && <div className='tw-flex'><p className=' tw-font-bold tw-mr-2'>Thesis: </p>{education.thesis}</div>
                            }

                        </div>
                    }

                </CardContent>

            </Card>)
        })
    )

}

