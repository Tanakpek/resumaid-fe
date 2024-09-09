
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

// This can come from your database or API.
const defaultValues: Partial<ProfileFormValues> = {
  bio: "I own a computer.",
}
export function PersonalDetailsEdit({ data, tokens, setdetails } : {data: UserDetails, tokens:number, setdetails: (details: any) => void }) {

  const [defaultValues, setDefaultValues] = useState<ProfileFormValues>(data)

  const form = useForm<ProfileFormValues>({
    resolver: zodResolver(profileFormSchema),
    defaultValues: defaultValues,
    mode: "onChange",
  })

  useEffect(() => {
    setDefaultValues(data)
    form.reset(data)
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
              <pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4">
                <code className="text-white">{JSON.stringify(data, null, 2)}</code>
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
            <FormItem className=" justify-start">
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
              <div className="flex">
                <FormLabel>Bio <span>(optional)</span></FormLabel>
              </div>
              <FormControl>
                <Textarea
                  placeholder="Tell us a little bit about yourself"
                  className="resize-none"
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
              <div className="flex">
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
              <div className="flex">
                <FormLabel>LinkedIn <span>(optional)</span></FormLabel>
              </div>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <Input placeholder="your-handle-6a35b21y0" {...field} />
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
            <FormItem className="my-6">
              <div className="flex">
                <FormLabel>Github <span>(optional)</span></FormLabel>
              </div>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                <Input placeholder="username" {...field} />
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
    <Card className='w-full'>
      
      <form>
      <CardHeader>
        <CardTitle>{`${title ? title : ''} ${given_name} ${midde_name ? midde_name[0] + '. ' + family_name : family_name}`}</CardTitle>
      </CardHeader>
      <Separator className="my-4" />
      <CardContent>
       
          <div className="">
            <div className='grid w-full ml-6 gap-4 grid-cols-2 my-3'>
              <div className="flex flex-col  col-start-1 col-end-2 space-y-1.5 mr-auto">
                <CardDescription className='mr-auto'>Details</CardDescription>
              </div>
              <div className="flex flex-col  col-start-2 col-end-3 space-y-1.5 mr-auto">
                <CardDescription className='mr-auto'>In Cover Letter?</CardDescription>
              </div>
            </div>
            
            <div className='grid w-full ml-6 gap-4 grid-cols-2 my-3'>
              <div className="flex flex-col  col-start-1 col-end-2 space-y-1.5 mr-auto">
                <Label className='mr-auto' htmlFor="email">Email</Label> 
                <CardDescription className='mr-auto'>{email}</CardDescription>
              </div>
              <div className="flex flex-col  col-start-2 col-end-3 space-y-1.5 mr-auto">
                <Checkbox id='email' />
              </div>
            </div>
            
            {phone_number && <div className='grid w-full ml-6 gap-4 grid-cols-2 my-3'><div className="mr-auto flex flex-col space-y-1.5 col-start-1 col-end-2">
              <Label className='mr-auto' htmlFor="phone">Phone Number</Label>
              <CardDescription className='mr-auto'>{phone_number}</CardDescription>
              
            </div>
              <div className="flex flex-col  col-start-2 col-end-3 space-y-1.5 mr-auto">
                <Checkbox id='phone'/>
              </div>
              
            </div>}
            
              <Separator className="" />
            
            {linkedin && <div className='grid w-full ml-6 gap-4 grid-cols-2 my-3'><div className="flex flex-col space-y-1.5 mr-auto col-start-1 col-end-2">
              <Label className='mr-auto'>LinkedIn</Label>
              <CardDescription className='mr-auto'>{linkedin}</CardDescription>
            </div></div>}
            {website && <div className='grid w-full ml-6 gap-4 grid-cols-2 my-3'><div className="flex flex-col space-y-1.5 mr-auto col-start-1 col-end-2">
              <Label className='mr-auto'>Website</Label>
              <CardDescription className='mr-auto'>{linkedin}</CardDescription>
            </div></div>}
            {github && <div className='grid w-full ml-6 gap-4 grid-cols-2 my-3'><div className="flex flex-col space-y-1.5 mr-auto col-start-1 col-end-2">
              <Label className='mr-auto'>GitHub</Label>
              <CardDescription className='mr-auto'>{linkedin}</CardDescription>
            </div></div>}
          </div>
        
      </CardContent>
      <CardFooter className="flex justify-between">
        <div></div>
        <Button type="submit">Save Preferences</Button>
      </CardFooter>
      </form>
    </Card>
  );
}