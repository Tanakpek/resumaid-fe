import { Table, TableCaption, TableHeader, TableRow, TableHead, TableBody, TableCell } from '@/components/ui/table'
import { CVInfo, Takeaway }  from '@/src/utils/applicaid-ts-utils/cv_type'
import testcv from '@/src/test/data/cv.json'
import Link from "next/link"
import { zodResolver } from "@hookform/resolvers/zod"
import validator from "validator"
import { useFieldArray, useForm } from "react-hook-form"
import { z } from "zod"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { CVPartView } from './utils'
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
import { SkillFormValues, skillFormSchema } from '@/src/utils/applicaid-ts-utils/cv_form_types'
import { TransformedCV, transformCV } from '@/src/utils/codes'
import { postSkills } from '@/src/utils/requests'
import { XIcon } from 'lucide-react'
import { use, useEffect } from 'react'
import { useDirtyCV } from './dirtyTracker'

// This can come from your database or API.
// const defaultValues: Partial<SkillFormValues> = {
//   skills: [{immutable: true, value: "JavaScript", _id: undefined}],
// }

export function SkillsEdit({ data, tokens, setcv }: { data: SkillFormValues['skills'], tokens: number, setcv: (cv: TransformedCV) => void }) {
  const DirtyCv = useDirtyCV()
    const form = useForm<SkillFormValues>({
        resolver: zodResolver(skillFormSchema ),
        defaultValues: {skills: data},
        mode: "onChange",
    })
    useEffect(() => {
      const sub = form.watch((v) => {
        if (JSON.stringify(v.skills) !== JSON.stringify(data)) {
          DirtyCv.current.dirty.skills = true
        }
        else {
          DirtyCv.current.dirty.skills = false
        }
      })
      
      return () => {
        sub.unsubscribe()
      }
    }, [])

    const { fields, append } = useFieldArray({
        name: "skills",
        control: form.control,
    })


  const removeSkill = (inx) => {
    const data = form.getValues()
    const certs = data.skills.filter((_, takeawayIndex) => takeawayIndex !== inx)
    form.reset({ skills: certs });
  }

  async function onSubmit(data: SkillFormValues) {
    console.log('data')
    const resp = await postSkills(data)
    console.log(resp)
    if (resp.status === 200) {
      try {
        const cv = (transformCV(resp.data))
        console.log(cv)
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
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="tw-space-y-8">
       
        <div>
          {fields.map((field, index) => (
            <FormField
              control={form.control}
              key={field.id}
              name={`skills.${index}.value`}
            render={({ field }) => (
                <FormItem>
                <FormLabel className={cn(index !== 0 && "tw-sr-only")}>
                        Skills
                    </FormLabel>
                    <FormDescription className={cn(index !== 0 && "tw-sr-only")}>
                        Add your skills.
                    </FormDescription>
                    <div className='tw-flex tw-items-center'>
                    <FormControl>
                        <Input {...field} value={field.value|| ""} />
                    </FormControl>
                    <XIcon onClick={() => { removeSkill(index) }} className='tw-stroke-slate-500 tw-m-1 tw-stroke-2 sm:tw-w-1 sm:tw-h-1 md:tw-h-3 md:tw-w-3 lg:tw-h-5 lg:tw-w-5 tw-flex hover:tw-stroke-red-400 tw-transition tw-ease-in-out' />
                    </div>
                    <FormMessage />
                </FormItem>
            )}
            />
          ))}
          <Button
            type="button"
            variant="outline"
            size="sm"
            className="tw-mt-2"
            onClick={() => append({ value: "", immutable: false, _id: undefined})}
          >
            Add Skill
          </Button>
        </div>
        <Button type="submit">Update profile</Button>
      </form>
    </Form>
  )
}

export const SkillsView: CVPartView = ({ data }: { data: SkillFormValues['skills']}) => {
  return (
    
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Skill</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {data.map((skill, index) => (
            <TableRow key={index}>
              <TableCell>{skill.value}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    
  )
    
}




