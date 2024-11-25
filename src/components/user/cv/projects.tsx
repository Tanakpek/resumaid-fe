// @ts-expect-error
// @ts-nocheck
import { zodResolver } from "@hookform/resolvers/zod"
import { Controller, FormProvider, useFieldArray, useForm } from "react-hook-form"
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
import { Dispatch, SetStateAction, useEffect, useState } from 'react'
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
    
    const form = useForm({
        shouldFocusError: true,
        resolver: zodResolver(ProjectFormSchema),
        defaultValues: {projects: defaultValues},
        mode: "onChange"
    })
    
    const { control, handleSubmit, reset, register, trigger, formState: { errors } } = form;

    const { fields, append, replace, remove } = useFieldArray({
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
  
  const removeTakeaway = (index, inx) => {
    const data = form.getValues()
    console.log(data.projects)
    const updatedProjects = data.projects.map((project, projectIndex) =>
      projectIndex === index
        ? {
          ...project,
          takeaways: project.takeaways.filter((_, takeawayIndex) => takeawayIndex !== inx),
        }
        : project
    );
    reset({ projects: updatedProjects });
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
              <pre className="tw-mt-2 tw-w-[340px] tw-rounded-md tw-bg-slate-950 tw-p-4">
                <code className="tw-text-white">{JSON.stringify(data, null, 2)}</code>
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
          <pre className="tw-mt-2 tw-w-[340px] tw-rounded-md tw-bg-slate-950 tw-p-4">
            <code className="tw-text-white">{resp.statusText}</code>
          </pre>
        ),
      })
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
       
        <div>
        {fields.map((project, index) => (
          <Card  className='tw-mb-10 tw-bg-primary-50' key={index}>
            <div className='tw-flex tw-justify-end'>
              <div className='tw-padding-2 hover:tw-bg-secondary tw-m-3 tw-rounded-md tw-transition tw-ease-in-out'>
                <AlertDialog>
                  <AlertDialogTrigger asChild>
                    <Trash className='tw-stroke-slate-500 tw-m-1 tw-stroke-2 sm:tw-w-1 sm:tw-h-1 md:tw-h-3 md:tw-w-3 lg:tw-h-5 lg:tw-w-5 tw-flex hover:tw-stroke-red-400 tw-transition tw-ease-in-out' />
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
                      <AlertDialogAction onClick={() => removeHandler(project ,index)}> Continue</AlertDialogAction>
                    </AlertDialogFooter>
                  </AlertDialogContent>
                </AlertDialog>
              </div>
              </div>
                <div>
                
                <Label>{project.name}</Label>
              <div className='tw-flex tw-mt-6 tw-mb-6 tw-justify-around'>
                <div className='tw-flex-column tw-w-full tw-relative'>
                  <Controller
                    control={control}
                    name={`projects.${index}.takeaways`}
                    render={({ field: { value, onChange } }) => (
                      <div>
                        {value.map((_, inx) => (
                          <>
                            <div className='tw-flex tw-justify-center tw-ml-3'>
                              <FormField
                                control={control}
                                name={`projects.${index}.takeaways.${inx}.value`}
                                render={({ field }) => (
                                  <FormItem className='tw-flex m-2 tw-relative tw-w-3/4'>
                                    <FormControl>
                                      <Textarea {...field} />
                                    </FormControl>
                                    <FormMessage />
                                  </FormItem>
                                )}
                              />
                              <div className='tw-flex tw-relative tw-items-center'>

                                <XIcon onClick={() => { removeTakeaway(index, inx) }}
                                  className='tw-stroke-slate-500 tw-m-1 tw-stroke-2 sm:tw-w-1 sm:tw-h-1 md:tw-h-3 md:tw-w-3 lg:tw-h-5 lg:tw-w-5 tw-flex hover:tw-stroke-red-400 tw-transition tw-ease-in-out' />
                              </div>
                            </div>
                          </>
                          // Add your code here
                        ))}
                      </div>
                      )} />
                
                </div>
                </div>
            </div>
            
            <Button
                type="button"
                variant="outline"
                size="sm"
                key={project.id}
              className="tw-mt-2"
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
                className="tw-w-[200px] tw-justify-between">
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
                className="tw-mt-2"
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

  const onSubmit = async (data: ProjectFormValues) => {
    const resp = await postProjects(data)
    if (resp.status === 200) {
      try {
        const cv = (transformCV(resp.data))
        if (cv) {
          toast({
            title: "You changed your details successfully!",
            description: (
              <pre className="tw-mt-2 tw-w-[340px] tw-rounded-md tw-bg-slate-950 tw-p-4">
                <code className="tw-text-white">{JSON.stringify(data, null, 2)}</code>
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
          <pre className="tw-mt-2 tw-w-[340px] tw-rounded-md tw-bg-slate-950 tw-p-4">
            <code className="tw-text-white">{resp.statusText}</code>
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
        (<Card key={index} className="tw-p-6 tw-mb-10">
          <CardHeader className=' tw-font-bold tw-p-0'> {project.name}</CardHeader>
          <div className='tw-my-4'>
            {project.takeaways.map((takeaway, idx) => {
              return (
                <FormField
                    key={idx}
                    control={form.control}
                    name={`projects.${index}.takeaways.${idx}`}
                    render={({ field }) => (
                      <FormItem className='tw-flex-grow'>
                            <FormControl>
                          <Toggle className='tw-my-3  tw-h-auto tw-w-full tw-justify-start' variant='outline' defaultPressed={field.value.sel} onPressedChange={field.onChange} >
                            <p key={index} className='tw-my-2 tw-text-justify'>{takeaway.value}</p>
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
  