import { CVInfo, Education }  from '@/src/utils/applicaid-ts-utils/cv_type'
import testcv from '@/src/test/data/cv.json'
import Link from "next/link"
import { zodResolver } from "@hookform/resolvers/zod"

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
import { format } from 'date-fns'
import { Checkbox } from '@/components/ui/checkbox'
import { Separator } from '@/components/ui/separator'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { ChevronsUpDown } from 'lucide-react'
import { Dispatch, SetStateAction, useEffect, useState } from 'react'
import { CVPartView } from './utils'
import { EducationFormValues, educationFormSchema } from '@/src/utils/applicaid-ts-utils/cv_form_types'
import { TransformedCV, transformCV } from '@/src/utils/codes'
import { deleteEducation, postEducation } from '@/src/utils/requests'
import Trash from '../../../assets/trash-2.svg?react'
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from '@/components/ui/alert-dialog'

export function EducationEdit({data, tokens, setcv}) {
    const [defaultValues, setDefaultValues] = useState({education: data})
    const [multipleCapError, setMultipleCapError] = useState(false)
    const [multipleGradeError, setMultipleGradeError] = useState(false)

    const [isOpen, setIsOpen] = useState<[number, boolean]>([0, false])
    const [isOpenGrade, setIsOpenGrade] = useState<[number, boolean]>([0, false])

    const [capstone, setCapstone] = useState<string>("none0")
    const [grade, setGrade] = useState<string>("noneGrade0")

    const form = useForm<EducationFormValues>({
        shouldFocusError: true,
        resolver: zodResolver(educationFormSchema),
        defaultValues: {education: data},
        mode: "onChange"
    })
    
    useEffect(() => {
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
        }
    }
  async function onSubmit(data: EducationFormValues) {
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
                  setcv(cv)
              }
              else{
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
                key={field.id + 'start'}
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
                            {field.value ? field.value === 'PRESENT' ? <span>Pick a date</span> : format(new Date(field.value), "PPP") : <span>Pick a date</span>}                            <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
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
                            onSelect={(x) => {field.onChange(x.toISOString()) }}
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
                                !field.value && "text-muted-foreground"
                            )}
                            >
                            {field.value ? field.value === 'PRESENT' ? <span>Present</span> : format(new Date(field.value), "PPP") : <span>Pick a date</span>}
                                        <CalendarIcon className="tw-ml-auto tw-h-4 tw-w-4 tw-opacity-50" />
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
            <div/>
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
                        <Input {...field} value={field.value || ""} />
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
                open={(isOpen[0] === index && isOpen[1])}
                onOpenChange={() => setIsOpen([index, !isOpen[1]])}
                              className="tw-w-[350px] space-y-2 mt-6"
            >
                              <div className="tw-flex items-center justify-between space-x-4 px-4">
            <FormLabel>
                 Capstone Project (Optional) {
                                          form.getValues().education[index].capstone && Object.values(form.getValues().education[index].capstone).filter(e => { return e !== undefined && e !== "" }).length > 1 ? <span className='tw-text-red-500'>Only one field should be filled</span> : ''
                 }
            </FormLabel>
                <CollapsibleTrigger asChild>
                                      <Button variant="ghost" size="sm" className="tw-w-9 p-0">
                                          <ChevronsUpDown className="tw-h-4 w-4" />
                                          <span className="tw-sr-only">Toggle</span>
                </Button>
                </CollapsibleTrigger>
            </div>

                              <CollapsibleContent className="tw-space-y-2">
                
                                  <div className=" hover:tw-bg-accent tw-transition tw-ease-in-out tw-rounded-md tw-border tw-px-4 tw-py-3 tw-font-mono tw-text-sm" onClick={ (e) => {
                    e.preventDefault()
                    setCapstone('thesis'+ index.toString())
                    setIsOpen([index, false])
                }}>
                    Thesis
                </div>
                                  <div className="hover:tw-bg-accent tw-transition tw-ease-in-out tw-rounded-md tw-border tw-px-4 tw-py-3 tw-font-mono tw-text-sm" onClick={(e) => {
                    e.preventDefault()
                    setCapstone('dissertation'+ index.toString())
                    setIsOpen([index,false])
                }}>
                    Dissertation
                </div>
            </CollapsibleContent>
            </Collapsible>
             <FormField
              control={form.control}
              key={field.id}
              name={`education.${index}.capstone.dissertation`}
            render={({ field }) => (
                <FormItem className={capstone === 'dissertation' + index.toString() ? "" : 'tw-hidden' }>
                    <FormLabel>
                        Dissertation
                    </FormLabel>
                    <FormDescription>
                        What was the title of your dissertation.
                    </FormDescription>
                    <FormControl>
                        <Input {...field} value={field.value || ""} />
                    </FormControl>
                    <FormMessage />
                </FormItem>
            )}
            />
            <FormField
              control={form.control}
              key={field.id}
              name={`education.${index}.capstone.thesis`}
            render={({ field }) => (
                
                <FormItem className={capstone === 'thesis' + index.toString() ? "" : 'tw-hidden' }>
                    <FormLabel>
                        Thesis
                    </FormLabel>
                    <FormDescription>
                        What was the title of your thesis.
                    </FormDescription>
                    <FormControl>
                        <Input {...field} value={field.value || ""} />
                    </FormControl>
                    <FormMessage />
                </FormItem>
            )}
            />

            <Collapsible
                open={(isOpenGrade[0] === index && isOpenGrade[1])}
                onOpenChange={() => setIsOpenGrade([index, !isOpenGrade[1]])}
                              className="tw-w-[350px] tw-space-y-2 tw-mt-6"
            >
            
                              <div className="tw-flex tw-items-center tw-justify-between tw-space-x-4 tw-px-4">
            <FormLabel>
                 Outcome (Optional) {
                   form.getValues().education[index].outcome &&  Object.values(form.getValues().education[index].outcome).filter(e => {return e !== undefined && e !== ""}).length > 1 ? <span className='text-red-500'>Only one field should be filled</span> : ''
                 }
            </FormLabel>
                <CollapsibleTrigger asChild>
                                      <Button variant="ghost" size="sm" className="tw-w-9 tw-p-0">
                                          <ChevronsUpDown className="tw-h-4 tw-w-4" />
                    <span className="sr-only">Toggle</span>
                </Button>
                </CollapsibleTrigger>
            </div>
            
            
                              <CollapsibleContent className="tw-space-y-2">
                
                                  <div className=" hover:tw-bg-accent tw-transition tw-ease-in-out tw-rounded-md tw-border tw-px-4 tw-py-3 tw-font-mono tw-text-sm" onClick={ (e) => {
                    e.preventDefault()
                    setGrade('score' + index.toString())
                    setIsOpenGrade([index, false])
                }}>
                    Score
                </div>
                                  <div className="hover:tw-bg-accent tw-transition tw-ease-in-out tw-rounded-md tw-border tw-px-4 tw-py-3 tw-font-mono tw-text-sm" onClick={(e) => {
                    e.preventDefault()
                    setGrade('gpa' + index.toString())
                    setIsOpenGrade([index, false])
                }}>
                    GPA
                </div>
                                  <div className="hover:tw-bg-accent tw-transition tw-ease-in-out tw-rounded-md tw-border tw-px-4 tw-py-3 tw-font-mono tw-text-sm" onClick={(e) => {
                    e.preventDefault()
                    setGrade('classification' + index.toString())
                    setIsOpenGrade([index, false])
                }}>
                    Classification
                </div>
            </CollapsibleContent>
            </Collapsible>
            <FormField
              control={form.control}
              key={field.id}
              name={`education.${index}.outcome.gpa`}
            render={({ field }) => (
                
                <FormItem className={grade === ('gpa' + index.toString()) ? '' : "tw-hidden" }>
                    <FormLabel>
                        GPA
                    </FormLabel>
                    <FormDescription>
                        What was your GPA.
                    </FormDescription>
                    <FormControl>
                        <Input {...field} value={field.value || ""} />
                    </FormControl>
                    <FormMessage />
                </FormItem>
            )}
            />
            <FormField
              control={form.control}
              key={field.id}
              name={`education.${index}.outcome.score`}
            render={({ field }) => (
                
                <FormItem className={grade === ('score' + index.toString()) ? '' : "tw-hidden" }>
                    <FormLabel>
                        Score
                    </FormLabel>
                    <FormDescription>
                        What was your score out of 100?
                    </FormDescription>
                    <FormControl>
                        <Input {...field} value={field.value || ""} />
                    </FormControl>
                    <FormMessage />
                </FormItem>
            )}
            />
            <FormField
              control={form.control}
              key={field.id}
              name={`education.${index}.outcome.classification`}
            render={({ field }) => (
                
                <FormItem className={grade === ('classification' + index.toString()) ? '' : "tw-hidden" }>
                    <FormLabel>
                        Classification
                    </FormLabel>
                    <FormDescription>
                        What was your classification at graduation?
                    </FormDescription>
                    <FormControl>
                        <Input {...field} value={field.value || ""} />
                    </FormControl>
                    <FormMessage />
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
            onClick={() => append({ immutable: false, _id: undefined})}
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
        return (<Card key={index}>
            <div className='tw-m-4 tw-mr-10'>
                <p className='tw-text-right tw-italic'> {education.dates ? education.dates.length == 1 ? education.dates : `${education.dates[0]} - ${education.dates[1]}` : ''}</p>
            </div>
            <CardHeader className=' tw-font-bold !tw-mb-0 tw-p-0'> {education.degree}</CardHeader>
            <CardDescription className='!tw-mt-0'>{education.institution}</CardDescription>
            <CardContent className='tw-mt-10'>
                { (education.thesis || education.dissertation) &&
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
    
