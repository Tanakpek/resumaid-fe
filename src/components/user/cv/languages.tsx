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
import { LanguageFormValues, languageFormSchema } from '@/src/utils/applicaid-ts-utils/cv_form_types'
import { postLanguages } from '@/src/utils/requests'
import { TransformedCV, transformCV } from '@/src/utils/codes'


// This can come from your database or API.
const defaultValues: Partial<LanguageFormValues> = {
    languages: [{ immutable: true, value: "JavaScript" , _id: undefined}],
}

export function LanguagesEdit({ data, tokens, setcv }: { data: Takeaway[], tokens: number, setcv: (cv: TransformedCV) => void}) {
    const form = useForm<LanguageFormValues>({
        resolver: zodResolver(languageFormSchema),
        
        defaultValues: {languages: data},
        mode: "onChange",
    })
    const { fields, append } = useFieldArray({
        name: "languages",
        control: form.control,
    })


    async function onSubmit(data: LanguageFormValues) {
        const resp = await postLanguages(data)
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
                            name={`languages.${index}.value`}
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel className={cn(index !== 0 && "tw-sr-only")}>
                                        Languages
                                    </FormLabel>
                                    <FormDescription className={cn(index !== 0 && "tw-sr-only")}>
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
                        className="tw-mt-2"
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




