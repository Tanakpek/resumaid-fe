import { Table, TableCaption, TableHeader, TableRow, TableHead, TableBody, TableCell } from '@/components/ui/table'
import { CVInfo }  from '@/src/utils/applicaid-ts-utils/cv_type'
import testcv from '@/src/test/data/cv.json'
import Link from "next/link"
import { zodResolver } from "@hookform/resolvers/zod"
import validator from "validator"
import { useFieldArray, useForm } from "react-hook-form"
import { any, z } from "zod"
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
import { Textarea } from "@/components/ui/textarea"
import { toast } from "@/components/ui/use-toast"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { Label } from '@/components/ui/label'
import { Switch } from '@/components/ui/switch'
import { DefaultView } from '@/src/components/ui/defaultView'
import { CVPartView } from './utils'
import { UserDetails } from './types'
import { Checkbox } from '@/components/ui/checkbox'
import { Separator } from '@radix-ui/react-dropdown-menu'


const profileFormSchema = z.object({
  email: z
    .string({
      required_error: "Please select an email to display.",
    })
    .email(),
  phone: z.string().refine(validator.isMobilePhone).nullish().or(z.literal("")),
//   address: z.string().optional(),
  bio: z.string().max(160, "Maximum 160 characters.").min(4, 'Minimum 4 characters.').optional().or(z.literal("")),
  personal_website: z.string().url('Please Enter a valid url.').optional().or(z.literal("")),
  linkedin: z.string().url().refine((e) => { e.startsWith('https://www.linkedin.com/in/')}, 'must be a LinkedIn profile').optional().or(z.literal("")),
  github: z.string().refine((e) => { e.startsWith('https://github.com/')}, 'Must be a GitHub Profile').optional().or(z.literal("")),
})
type ProfileFormValues = z.infer<typeof profileFormSchema>
// This can come from your database or API.
const defaultValues: Partial<ProfileFormValues> = {
  bio: "I own a computer.",
}
export function PersonalDetailsEdit({data} : {data: UserDetails}) {

  const form = useForm<ProfileFormValues>({
    resolver: zodResolver(profileFormSchema),
    defaultValues,
    mode: "onChange",
  })

  function onSubmit(data: ProfileFormValues) {
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
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                <Input placeholder="shadcn" {...field} />
                </FormControl>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="phone"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Phone Number</FormLabel>
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
              <FormLabel>Bio <span>(optional)</span></FormLabel>
              <FormControl>
                <Textarea
                  placeholder="Tell us a little bit about yourself"
                  className="resize-none"
                  {...field}
                />
              </FormControl>
              <FormDescription>
                You can <span>@mention</span> other users and organizations to
                link to them.
              </FormDescription>
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
              <FormLabel>Website <span>(optional)</span> </FormLabel>
              <Select onValueChange={field.onChange}>
                <FormControl>
                <Input placeholder="shadcn" {...field} />
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
            <FormItem>
              <FormLabel>LinkedIn <span>(optional)</span></FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                <Input placeholder="shadcn" {...field} />
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
            <FormItem>
              <FormLabel>Github <span>(optional)</span></FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                <Input placeholder="shadcn" {...field} />
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


export const PersonalDetailsView: CVPartView = ({ data }: { data: UserDetails }) => {
  const { first_name, last_name, midde_name, email, phone, bio, title, github, linkedin, website } = data

  return (
    <Card className='w-full'>
      <CardHeader>
        <CardTitle>{`${title} ${first_name} ${midde_name ? midde_name[0] + '. ' + last_name : last_name}`}</CardTitle>
      </CardHeader>
      <CardContent>
        <form>
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
            
            {phone && <div className='grid w-full ml-6 gap-4 grid-cols-2 my-3'><div className="mr-auto flex flex-col space-y-1.5 col-start-1 col-end-2">
              <Label className='mr-auto' htmlFor="phone">Phone Number</Label>
              <CardDescription className='mr-auto'>{phone}</CardDescription>
            </div>
              <div className="flex flex-col  col-start-2 col-end-3 space-y-1.5 mr-auto">
                <Checkbox id='phone'/>
              </div>
            </div>}
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
        </form>
      </CardContent>
      <CardFooter className="flex justify-between">
        <div></div>
        <Button>Save Preferences</Button>
      </CardFooter>
    </Card>
  );
}