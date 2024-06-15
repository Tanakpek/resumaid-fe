import { Table, TableCaption, TableHeader, TableRow, TableHead, TableBody, TableCell } from '@/components/ui/table'
import { CVInfo }  from '@/src/utils/applicaid-ts-utils/cv_type'
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

const skillFormSchema = z.object({
  skills: z.array(z.object({
    id: z.string().optional(),
    immutable: z.boolean().default(false),
    value: z.string().optional(),
  })).default([]).optional(),
})

type SkillFormValues = z.infer<typeof skillFormSchema>

// This can come from your database or API.
const defaultValues: Partial<SkillFormValues> = {
  skills: [{immutable: true, value: "JavaScript"}],
}

export function SkillsEdit({data, tokens} : {data: string[], tokens:number}) {
    const form = useForm<SkillFormValues>({
        resolver: zodResolver(skillFormSchema ),
        defaultValues,
        mode: "onChange",
    })
    const { fields, append } = useFieldArray({
        name: "skills",
        control: form.control,
    })


  function onSubmit(data: SkillFormValues) {
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
       
        <div>
          {fields.map((field, index) => (
            <FormField
              control={form.control}
              key={field.id}
              name={`skills.${index}.value`}
            render={({ field }) => (
                <FormItem>
                    <FormLabel className={cn(index !== 0 && "sr-only")}>
                        Skills
                    </FormLabel>
                    <FormDescription className={cn(index !== 0 && "sr-only")}>
                        Add your skills.
                    </FormDescription>
                    <FormControl>
                        <Input {...field} value={field.value|| ""} />
                    </FormControl>
                    <FormMessage />
                </FormItem>
            )}
            />
          ))}
          <Button
            type="button"
            variant="outline"
            size="sm"
            className="mt-2"
            onClick={() => append({ value: "" })}
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
        <TableCaption>Skills</TableCaption>
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




