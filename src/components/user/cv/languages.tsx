import { Table, TableCaption, TableHeader, TableRow, TableHead, TableBody, TableCell } from '@/components/ui/table'
import { CVInfo, Takeaway } from '@/src/utils/applicaid-ts-utils/cv_type'
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

const languageFormSchema = z.object({
    languages: z.array(z.object({
        _id: z.string().optional(),
        immutable: z.boolean().default(false),
        value: z.string().optional(),
    })).default([]).optional(),
})

export type LanguageFormValues = z.infer<typeof languageFormSchema>

// This can come from your database or API.
const defaultValues: Partial<LanguageFormValues> = {
    languages: [{ immutable: true, value: "JavaScript" , _id: undefined}],
}

export function LanguagesEdit({ data, tokens }: { data: Takeaway[], tokens: number }) {
    const form = useForm<LanguageFormValues>({
        resolver: zodResolver(languageFormSchema),
        
        defaultValues: {languages: data},
        mode: "onChange",
    })
    const { fields, append } = useFieldArray({
        name: "languages",
        control: form.control,
    })


    function onSubmit(data: LanguageFormValues) {
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
                            name={`languages.${index}.value`}
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel className={cn(index !== 0 && "sr-only")}>
                                        Languages
                                    </FormLabel>
                                    <FormDescription className={cn(index !== 0 && "sr-only")}>
                                        What languages do you speak?.
                                    </FormDescription>
                                    <FormControl>
                                        <Input {...field} value={field.value || ""} />
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
                        onClick={() => append({ _id: undefined, immutable: false, value: "" })}
                    >
                        Add Language
                    </Button>
                </div>
                <Button type="submit">Update profile</Button>
            </form>
        </Form>
    )
}

export const LanguagesView: CVPartView = ({ data }: { data: LanguageFormValues['languages'] }) => {
    return (
        <DefaultView>
            <Table>
                <TableCaption>Languages</TableCaption>
                <TableHeader>
                    <TableRow>
                        <TableHead>Language</TableHead>
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
        </DefaultView>
    )

}




