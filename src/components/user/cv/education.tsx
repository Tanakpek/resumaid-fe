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
import { useState } from 'react'
import { CVPartView } from './utils'

const educationFormSchema = z.object({
    education: z.array(
        z.object({
            _id: z.string().optional(),
            immutable: z.boolean(),
            start: z.coerce.date().or(z.literal("")),
            end: z.date().optional().or(z.literal("").or(z.literal("PRESENT"))),
            institution: z.string(),
            location: z.string().optional().or(z.literal("")),
            degree: z.string().optional().or(z.literal("")),
            capstone: z.object({
                dissertation: z.string().optional().or(z.literal("")),
                thesis: z.string().optional().or(z.literal("")),
            }).default({ 'thesis': "", 'dissertation': "" }).optional().refine(data => {
                let filledFields: string[] | number = ['thesis', 'dissertation'].filter(field => data[field] !== undefined && data[field] !== '');
                filledFields = filledFields.length;
                const good = filledFields <= 1;
                // Return true only if exactly one field is filled
                console.log(`capstone ${filledFields}`)
                return good;
            }, {
                message: "only one field should be filled for capstone project", path: ['thesis', 'dissertation']
            }),
            outcome: z.object({
                gpa: z.number().max(4.3).optional().or(z.literal("")),
                score: z.string().optional().or(z.literal("")),
                classification: z.string().optional().or(z.literal("")),
            }).default({ 'score': "", 'classification': "" }).refine(data => {
                let filledFields: string[] | number = ['gpa', 'score', 'classification'].filter(field => data[field] !== undefined && data[field] !== '')
                filledFields = filledFields.length;
                // Return true only if exactly one field is filled
                const good = filledFields <= 1

                console.log(`scores ${filledFields}`)
                return good;

            }, {
                message: 'Only one field should be filled for education outcome',
            }
            )
        })).default([]).optional(),
})

export type EducationFormValues = z.infer<typeof educationFormSchema>

export function EducationEdit({data, tokens}) {

    const [multipleCapError, setMultipleCapError] = useState(false)
    const [multipleGradeError, setMultipleGradeError] = useState(false)

    
    
    const [isOpen, setIsOpen] = useState<[number, boolean]>([0, false])
    const [isOpenGrade, setIsOpenGrade] = useState<[number, boolean]>([0, false])

    const [capstone, setCapstone] = useState<string>("none0")
    const [grade, setGrade] = useState<string>("noneGrade0")

    const form = useForm<EducationFormValues>({
        shouldFocusError: true,
        resolver: zodResolver(educationFormSchema),
        defaultValues: data,
        mode: "onChange"
    })
    

    const { fields, append } = useFieldArray({
        name: "education",
        control: form.control,
    })


  function onSubmit(data: EducationFormValues) {
    console.log('submitted')
    console.log(data)
    toast({
      title: "You submitted the following values:",
      description: (
        <pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4">
          <code className="text-white">{JSON.stringify(data, null, 2)}</code>
        </pre>
      ),
    })
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit) //onSubmit
      } className="space-y-8">
       
        <div>
            
          {fields.map((field, index) => (
            
            <div className='flex-column m-5'>
                <Card>
                <div className='m-5'>
                <div className='flex justify-between'>
                <FormField
                key={field.id}
                control={form.control}
                name={`education.${index}.start`}
                render={({ field }) => (
                    <FormItem className="flex flex-col">
                    <FormLabel>Start Date</FormLabel>
                    <Popover>
                        <PopoverTrigger asChild>
                        <FormControl>
                            <Button
                            variant={"outline"}
                            className={cn(
                                "w-[240px] pl-3 text-left font-normal",
                                !field.value && "text-muted-foreground"
                            )}
                            >
                            {field.value ? (
                                format(field.value, "PPP")
                            ) : (
                                <span>Pick a date</span>
                            )}
                            <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                            </Button>
                        </FormControl>
                        </PopoverTrigger>
                        <PopoverContent className="w-auto p-0" align="start">
                        <Calendar
                            // captionLayout='dropdown-buttons'
                            captionLayout="dropdown"
                            fromYear={1900}
                            toYear={new Date().getFullYear() + 1}
                            mode="single"
                            // selected={field.value || null}
                            onSelect={field.onChange}
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
                key={field.id}
                control={form.control}
                name={`education.${index}.end`}
                render={({ field }) => (
                    <FormItem className="flex flex-col">
                    <FormLabel>End Date</FormLabel>
                    <Popover>
                        <PopoverTrigger asChild>
                        <FormControl>
                            <Button
                            variant={"outline"}
                            className={cn(
                                "w-[240px] pl-3 text-left font-normal",
                                !field.value && "text-muted-foreground"
                            )}
                            >
                            {field.value ? (
                                format(field.value, "PPP")
                            ) : (
                                <span>{ field.value === "" ? "PRESENT" : "Pick a date" }</span>
                            )}
                            <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                            </Button>
                        </FormControl>
                        </PopoverTrigger>
                        <PopoverContent className="w-auto p-0" align="start">
                        <Calendar
                            // captionLayout='dropdown-buttons'
                            captionLayout="dropdown"
                            fromYear={1900}
                            toYear={new Date().getFullYear() + 1}
                            mode="single"
                            // selected={field.value || null}
                            onSelect={field.onChange}
                            disabled={(date) =>
                            date > new Date() || date <= new Date("1900-01-01")
                            }
                            initialFocus
                        />
                        </PopoverContent>
                        <div className='flex self-start'>
                        <Checkbox
                          className='self-center mx-2'
                            checked={field.value === ""}
                            onCheckedChange={
                                (checked => {
                                    field.value = undefined
                                    field.onChange(checked ? "" : field.value)
                                })
                            }
                          />
                        <p className='text-sm'>Present</p>
                        </div>
                    </Popover>
                    <FormMessage />
                    </FormItem>
                )}
                />
                </div>
            <div/>
            <div className='my-3'>
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
                className="w-[350px] space-y-2 mt-6"
            >
            <div className="flex items-center justify-between space-x-4 px-4">
            <FormLabel>
                 Capstone Project (Optional) {
                   form.getValues().education[index].capstone &&  Object.values(form.getValues().education[index].capstone).filter(e => {return e !== undefined && e !== ""}).length > 1 ? <span className='text-red-500'>Only one field should be filled</span> : ''
                 }
            </FormLabel>
                <CollapsibleTrigger asChild>
                <Button variant="ghost" size="sm" className="w-9 p-0">
                    <ChevronsUpDown className="h-4 w-4" />
                    <span className="sr-only">Toggle</span>
                </Button>
                </CollapsibleTrigger>
            </div>

            <CollapsibleContent className="space-y-2">
                
                <div className=" hover:bg-accent transition ease-in-out rounded-md border px-4 py-3 font-mono text-sm" onClick={ (e) => {
                    e.preventDefault()
                    setCapstone('thesis'+ index.toString())
                    setIsOpen([index, false])
                }}>
                    Thesis
                </div>
                <div className="hover:bg-accent transition ease-in-out rounded-md border px-4 py-3 font-mono text-sm" onClick={(e) => {
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
                <FormItem className={capstone === 'dissertation' + index.toString() ? "" : 'hidden' }>
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
                
                <FormItem className={capstone === 'thesis' + index.toString() ? "" : 'hidden' }>
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
                className="w-[350px] space-y-2 mt-6"
            >
            
            <div className="flex items-center justify-between space-x-4 px-4">
            <FormLabel>
                 Outcome (Optional) {
                   form.getValues().education[index].outcome &&  Object.values(form.getValues().education[index].outcome).filter(e => {return e !== undefined && e !== ""}).length > 1 ? <span className='text-red-500'>Only one field should be filled</span> : ''
                 }
            </FormLabel>
                <CollapsibleTrigger asChild>
                <Button variant="ghost" size="sm" className="w-9 p-0">
                    <ChevronsUpDown className="h-4 w-4" />
                    <span className="sr-only">Toggle</span>
                </Button>
                </CollapsibleTrigger>
            </div>
            
            
            <CollapsibleContent className="space-y-2">
                
                <div className=" hover:bg-accent transition ease-in-out rounded-md border px-4 py-3 font-mono text-sm" onClick={ (e) => {
                    e.preventDefault()
                    setGrade('score' + index.toString())
                    setIsOpenGrade([index, false])
                }}>
                    Score
                </div>
                <div className="hover:bg-accent transition ease-in-out rounded-md border px-4 py-3 font-mono text-sm" onClick={(e) => {
                    e.preventDefault()
                    setGrade('gpa' + index.toString())
                    setIsOpenGrade([index, false])
                }}>
                    GPA
                </div>
                <div className="hover:bg-accent transition ease-in-out rounded-md border px-4 py-3 font-mono text-sm" onClick={(e) => {
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
                
                <FormItem className={ grade === ('gpa' + index.toString()) ? '' : "hidden" }>
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
                
                <FormItem className={ grade === ('score' + index.toString()) ? '' : "hidden" }>
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
                
                <FormItem  className={ grade === ('classification' + index.toString()) ? '' : "hidden" }>
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
            <Separator className="my-6" />
            </div>
            
          ))}
          
          <Button
            type="button"
            variant="outline"
            size="sm"
            className="mt-2"
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

export const EducationView: CVPartView = ({data} : {data: Education[]}) => {
    return (
      data.map((education, index) => {
        return (<Card key={index}>
            <div className='m-4 mr-10'>
                <p className='text-right italic'> {education.dates.length == 1 ? education.dates : `${education.dates[0]} - ${education.dates[1]}`}</p>
            </div>
            <CardHeader className=' font-bold !mb-0 p-0'> {education.degree}</CardHeader>
            <CardDescription className='!mt-0'>{education.institution}</CardDescription>
            <CardContent className='mt-10'>
                { (education.thesis || education.dissertation) &&
                    <div>
                        {   
                            education.dissertation && <div><div className='flex'> <p className=' font-bold mr-2'>Dissertation:</p> {education.dissertation}</div> </div> ||
                            education.thesis && <div className='flex'><p className=' font-bold mr-2'>Thesis: </p>{education.thesis}</div>
                        }
                        
                    </div>
                }
                
            </CardContent>

        </Card>)
      })
    )
    
  }
    
