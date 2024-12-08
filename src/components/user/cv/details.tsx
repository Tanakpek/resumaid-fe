
import { zodResolver } from "@hookform/resolvers/zod"
import validator from "validator"
import {  useForm } from "react-hook-form"
import {  z } from "zod"
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
import { Select } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { toast } from "@/components/ui/use-toast"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { Label } from '@/components/ui/label'

import { DefaultView } from '@/src/components/ui/defaultView'
import { CVPartView } from './utils'
import { UserDetails } from './types'
import { Checkbox } from '@/components/ui/checkbox'

import { ToastDemo } from "../../ui/toast/submit"
import { Separator } from "@/components/ui/separator"
import { ProfileFormValues, profileFormSchema } from "@/src/utils/applicaid-ts-utils/cv_form_types"
import { TransformedCV, transformCV } from "@/src/utils/codes"
import { postDetails } from "@/src/utils/requests"
import { useEffect, useState } from "react"
import { useDirtyCV } from "./dirtyTracker"
import { Dir } from "fs"

// This can come from your database or API.
const defaultValues: Partial<ProfileFormValues> = {
  bio: "I own a computer.",
}
export function PersonalDetailsEdit({ data, tokens, setdetails } : {data: UserDetails, tokens:number, setdetails: (details: any) => void }) {
  const DirtyCv = useDirtyCV()
  const [defaultValues, setDefaultValues] = useState<ProfileFormValues>(data)

  
  const form = useForm<ProfileFormValues>({
    resolver: zodResolver(profileFormSchema),
    defaultValues: defaultValues,
    mode: "onChange",
  })

  DirtyCv.current.forms.details = form
  useEffect(() => {
    setDefaultValues(data)
    form.reset(data)

    const sub = form.watch((v) => {
      if (JSON.stringify(v) !== JSON.stringify(data)) {
        DirtyCv.current.dirty.details = true
      }
      else {
        DirtyCv.current.dirty.details = false
      }
    })
    return () => {
      sub.unsubscribe()
    }

  }, [data])
  
  async function onSubmit(data: ProfileFormValues) {
    const resp = await postDetails(data)
    if (resp.status === 200) {
      try {
        const deets = resp.data.details
        if (deets) {
          toast({
            title: "You changed your details successfully!",
            description: (
              <pre className="tw-mt-2 tw-w-[340px] tw-rounded-md bg-slate-950 tw-p-4">
                <code className="tw-text-white">{JSON.stringify(data, null, 2)}</code>
              </pre>
            ),
          })
          
          setdetails(deets)
        }else{
          throw new Error("Something went wrong")
        }
      } catch (e) {
        console.log(e)
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
            <code className="text-white">{ resp.statusText }</code>
          </pre>
        ),
      })
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit, (e) => {console.log(e)})} className="space-y-8">
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <div className="flex">
                <FormLabel>Email</FormLabel>
              </div>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                <Input  {...field} />
                </FormControl>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="phone_number"
          render={({ field }) => (
            <FormItem className=" tw-justify-start">
              <div className="flex">
                <FormLabel>Phone Number (optional)</FormLabel>
              </div>
              <Select onValueChange={field.onChange}>
                <FormControl>
                <Input {...field} />
                </FormControl>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="bio"
          render={({ field }) => (
            <FormItem>
              <div className="tw-flex">
                <FormLabel>Bio <span>(optional)</span></FormLabel>
              </div>
              <FormControl>
                <Textarea
                  placeholder="Tell us a little bit about yourself"
                  className="tw-resize-none"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <div>
          
        <FormField
          control={form.control}
          name="personal_website"
          render={({ field }) => (
            <FormItem>
              <div className="tw-flex">
                <FormLabel>Website <span>(optional)</span> </FormLabel>
              </div>
              <Select onValueChange={field.onChange}>
                <FormControl>
                <Input placeholder="https://www.mypage.com" {...field} />
                </FormControl>
              </Select>
              <FormDescription>
                Insert the URL to your personal website.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        
        <FormField
          control={form.control}
          name="linkedin"
          render={({ field }) => (
            <FormItem className="my-6">
              <div className="tw-flex">
                <FormLabel>LinkedIn <span>(optional)</span></FormLabel>
              </div>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <Input placeholder="https://www.linkedin.com/in/johndoe-za3c9k1a1" {...field} />
                </FormControl>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="github"
          render={({ field }) => (
            <FormItem className="tw-my-6">
              <div className="tw-flex">
                <FormLabel>Github <span>(optional)</span></FormLabel>
              </div>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <Input placeholder="https://github.com/JohnDoe" {...field} />
                </FormControl>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />
        </div>
        <Button type="submit">Update profile</Button>
      </form>
    </Form>
  )
}


export const PersonalDetailsView: CVPartView = ({ data, setdetails }: { data: UserDetails , setdetails: (d:any) => void }) => {
  const { given_name, family_name, midde_name, email, phone_number, bio, title, github, linkedin, website } = data

  return (
    <Card className='tw-w-full'>
      
      <form>
      <CardHeader>
        <CardTitle>{`${title ? title : ''} ${given_name} ${midde_name ? midde_name[0] + '. ' + family_name : family_name}`}</CardTitle>
      </CardHeader>
        <Separator className="tw-my-4" />
      <CardContent>
       
          <div className="">
            <div className='tw-grid tw-w-full tw-ml-6 tw-gap-4 tw-grid-cols-2 tw-my-3'>
              <div className="tw-flex tw-flex-col  tw-col-start-1 tw-col-end-2 tw-space-y-1.5 tw-mr-auto">
                <CardDescription className='tw-mr-auto'>Details</CardDescription>
              </div>
              <div className="tw-flex tw-flex-col  tw-col-start-2 tw-col-end-3 tw-space-y-1.5 tw-mr-auto">
                <CardDescription className='tw-mr-auto'>In Cover Letter?</CardDescription>
              </div>
            </div>
            
            <div className='tw-grid tw-w-full tw-ml-6 tw-gap-4 tw-grid-cols-2 tw-my-3'>
              <div className="tw-flex tw-flex-col  tw-col-start-1 tw-col-end-2 tw-space-y-1.5 tw-mr-auto">
                <Label className='tw-mr-auto' htmlFor="email">Email</Label> 
                <CardDescription className='tw-mr-auto'>{email}</CardDescription>
              </div>
              <div className="tw-flex tw-flex-col  tw-col-start-2 tw-col-end-3 tw-space-y-1.5 tw-mr-auto">
                <Checkbox id='email' />
              </div>
            </div>
            
            {phone_number && <div className='tw-grid tw-w-full tw-ml-6 tw-gap-4 tw-grid-cols-2 tw-my-3'><div className="tw-mr-auto tw-flex tw-flex-col tw-space-y-1.5 tw-col-start-1 tw-col-end-2">
              <Label className='tw-mr-auto' htmlFor="phone">Phone Number</Label>
              <CardDescription className='tw-mr-auto'>{phone_number}</CardDescription>
              
            </div>
              <div className="tw-flex tw-flex-col  tw-col-start-2 tw-col-end-3 tw-space-y-1.5 tw-mr-auto">
                <Checkbox id='phone'/>
              </div>
              
            </div>}
            
              <Separator className="" />
            
            {linkedin && <div className='tw-grid tw-w-full tw-ml-6 tw-gap-4 tw-grid-cols-2 tw-my-3'><div className="tw-flex tw-flex-col tw-space-y-1.5 tw-mr-auto tw-col-start-1 tw-col-end-2">
              <Label className='tw-mr-auto'>LinkedIn</Label>
              <CardDescription className='tw-mr-auto'>{linkedin}</CardDescription>
            </div></div>}
            {website && <div className='tw-grid tw-w-full tw-ml-6 tw-gap-4 tw-grid-cols-2 my-3'><div className="tw-flex tw-flex-col tw-space-y-1.5 tw-mr-auto tw-col-start-1 tw-col-end-2">
              <Label className='tw-mr-auto'>Website</Label>
              <CardDescription className='tw-mr-auto'>{linkedin}</CardDescription>
            </div></div>}
            {github && <div className='tw-grid tw-w-full tw-ml-6 tw-gap-4 tw-grid-cols-2 tw-my-3'><div className="tw-flex tw-flex-col tw-space-y-1.5 tw-mr-auto tw-col-start-1 tw-col-end-2">
              <Label className='tw-mr-auto'>GitHub</Label>
              <CardDescription className='tw-mr-auto'>{linkedin}</CardDescription>
            </div></div>}
          </div>
        
      </CardContent>
        <CardFooter className="tw-flex tw-justify-between">
        <div></div>
        <Button type="submit">Save Preferences</Button>
      </CardFooter>
      </form>
    </Card>
  );
}