// Code generated with love by Applicaid
// @ts-expect-error
// @ts-nocheck

import { zodResolver } from "@hookform/resolvers/zod"
import { FormProvider, useFieldArray, useForm } from "react-hook-form"
import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { toast } from "@/components/ui/use-toast"
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover'

import { Card, CardHeader } from '@/components/ui/card'
import { useEffect, useState } from 'react'
import { Label } from '@/components/ui/label'
import Trash from '../../../assets/trash-2.svg?react'
import SvgIcon from '../../../assets/settings.svg?react'
import XIcon from '../../../assets/x.svg?react'
import { TransformedCV, transformCV } from '@/src/utils/codes';

// console.warn = () => {}
// console.error = () => {}


/* 
test data, erase later
*/
import { ProjectFormSchema, ProjectFormValues } from '@/src/utils/applicaid-ts-utils/cv_form_types'
import { deleteProject, postProjects } from '@/src/utils/requests'
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "@/components/ui/alert-dialog"
import { Toggle } from "@/components/ui/toggle"

export function ProjectsEdit({ data, tokens, setcv }: { data: ProjectFormValues['projects'], tokens: number, setcv: (cv: TransformedCV) => void }) {
  const [defaultValues, setDefaultValues] = useState(data)
  const [addProjectOpen, setAddProjectOpen] = useState(false)
  const [addProjectName, setAddProjectName] = useState('')
  const addProjectTypeing = (e) => {
      // e.preventDefault()
      setAddProjectName(e.target.value)
  }
    
    const form = useForm<ProjectFormValues>({
        shouldFocusError: true,
        resolver: zodResolver(ProjectFormSchema),
        defaultValues: {projects: defaultValues},
        mode: "onChange"
    })
    
    const { fields, append, replace, remove } = useFieldArray<ProjectFormValues>({
        name: "projects",
        control: form.control,
    })

  useEffect(() => {
    setDefaultValues(data)
    form.reset({projects: data})
  }, [data])

  const removeHandler = async (proj, projIndex) => {
    if (proj._id) {
      const cv = await deleteProject(proj._id)
      setcv(transformCV(cv.data))
    }
    else {
      remove(projIndex);
    }
  }
    

  async function onSubmit(data: ProjectFormValues) {
    const resp = await postProjects(data)
    
    if (resp.status === 200) {
      try {
        const cv = transformCV(resp.data)
        if (cv) {
          toast({
            title: "You changed your details successfully!",
            description: (
              <pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4">
                <code className="text-white">{JSON.stringify(data, null, 2)}</code>
              </pre>
            ),
          })
          setcv(cv)
        }
        else{
          throw new Error('Could not transform CV')
        }
      } catch (e) {
        toast({
          title: "Something went wrong",
          description: (
            <pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4">
              <code className="text-white">{ }</code>
            </pre>
          ),
        })
      }
    } else {
      toast({
        title: "Bad Request",
        description: (
          <pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4">
            <code className="text-white">{resp.statusText}</code>
          </pre>
        ),
      })
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
       
        <div>
        {fields.map((field, index) => (
            <Card index={index} className='mb-10 bg-primary-50' key={index}>
              <div className='flex justify-end'>
              <div className='padding-2 hover:bg-secondary m-3 rounded-md transition ease-in-out'>
                <AlertDialog>
                  <AlertDialogTrigger asChild>
                    <Trash className='stroke-slate-500 m-1 stroke-2 sm:w-1 sm:h-1 md:h-3 md:w-3 lg:h-5 lg:w-5 flex hover:stroke-red-400 transition ease-in-out' />
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
                      <AlertDialogAction onClick={() => removeHandler(field,index)}> Continue</AlertDialogAction>
                    </AlertDialogFooter>
                  </AlertDialogContent>
                </AlertDialog>
              </div>
              </div>
                <div>
                
                <Label>{field.name}</Label>
                <div className='flex mt-6 mb-6 justify-around'>
                <div className='flex-column w-full relative'>

                {field.takeaways.map((takeaway, inx) => (
                    <div className='flex justify-center ml-3' index={index + '_' +inx}> 
                      <FormField
                      control={form.control}
                      key={index+'-'+inx}
                      name={`projects.${index}.takeaways.${inx}.value`}
                      render={({ field }) => (
                          <FormItem className='flex m-2 relative w-3/4'>
                              <FormControl>
                                <Textarea value={takeaway.value} {...field} />
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
                    const n = [...fields[index].takeaways, {immutabe: false, value: '', _id: undefined}]
                    fields[index].takeaways = n
                    replace(fields)
                }}
            >
                Add takeaway
            </Button>
            </Card>
        ))}
          
          <Popover open={addProjectOpen}>
              <PopoverTrigger>
                <Button variant="outline"
                type="button"
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


export const ProjectsView = ({ data, setcv }: { data: ProjectFormValues['projects'], setcv: Dispatch<SetStateAction<TransformedCV>> }) => {
  const [defaultValues, setDefaultValues] = useState(data)
  const form = useForm<ProjectFormValues>({
    shouldFocusError: true,
    resolver: zodResolver(ProjectFormSchema),
    defaultValues: { projects: defaultValues },
    mode: "onChange"
  })

  const { fields, append, replace, remove } = useFieldArray<ProjectFormValues>({
    name: "projects",
    control: form.control,
  })

  useEffect(() => {
    setDefaultValues(data)
    form.reset({ projects: data })
  }, [data])

  const onSubmit = async (data: WorkFormValues) => {
    const resp = await postProjects(data)
    if (resp.status === 200) {
      try {
        const cv = (transformCV(resp.data))
        if (cv) {
          toast({
            title: "You changed your details successfully!",
            description: (
              <pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4">
                <code className="text-white">{JSON.stringify(data, null, 2)}</code>
              </pre>
            ),
          })
          setcv(cv)
        }
        else {
          throw new Error("Could not transform CV")
        }
      } catch (e) {
        toast({
          title: "Something went wrong",
          description: (
            <pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4">
              <code className="text-white">{ }</code>
            </pre>
          ),
        })
      }
    } else {
      toast({
        title: "Bad Request",
        description: (
          <pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4">
            <code className="text-white">{resp.statusText}</code>
          </pre>
        ),
      })
    }
  }

  return (
    <FormProvider {...form}>
    <form onSubmit={form.handleSubmit(onSubmit)}>
    {
    data.map((project, index) => {
      return (
        (<Card key={index} className="p-6 mb-10">
          <CardHeader className=' font-bold p-0'> {project.name}</CardHeader>
          <div className='my-4'>
            {project.takeaways.map((takeaway, idx) => {
              return (
                <FormField
                    key={idx}
                    control={form.control}
                    name={`projects.${index}.takeaways.${idx}.in`}
                    render={({ field }) => (
                        <FormItem className='flex-grow'>
                            <FormControl>
                          <Toggle className='my-3  h-auto w-full justify-start' variant='outline' defaultPressed={field.value} onPressedChange={field.onChange} >
                              <p key={index} className='my-2 text-justify'>{takeaway.value}</p>
                            </Toggle>
                </FormControl>
                </FormItem>
                )}
                />
              )
            })}
          </div>

        </Card>)
      )
    })
    }
    <Button type="submit">Submit</Button>
    </form>
    </FormProvider>
  ) 
}
  