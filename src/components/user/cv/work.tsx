import React from 'react';
import { useForm, useFieldArray, Controller, FormProvider } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { Card, CardContent, CardDescription, CardHeader } from '@/components/ui/card';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Button } from '@/components/ui/button';
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Calendar } from '@/components/ui/calendar';
import { CalendarIcon } from '@radix-ui/react-icons';
import { cn } from '@/lib/utils';
import { format } from 'date-fns';
import { Input } from '@/components/ui/input';
import XIcon from '../../../assets/x.svg?react'
import { Label } from '@radix-ui/react-dropdown-menu';
import { Textarea } from '@/components/ui/textarea';
import { CVPartView } from './utils';
import { WorkExperience, WorkSlot } from '@/src/utils/applicaid-ts-utils/cv_type';
import moment from 'moment';
const experienceSchema = z.object({
    _id: z.string().optional(),
    immutable: z.boolean().default(false),
    value: z.string().min(1, 'Description is required')
});

const workplaceSchema = z.object({
    _id: z.string().optional(),
    company: z.string().min(1, 'Company name is required'),
    role: z.string().min(1, 'Role is required'),
    immutable: z.boolean().default(false).optional(),
    startDate: z.string({
        required_error: 'Start date is required'
    }).min(1, 'Start date is required'),
    endDate: z.string().min(1, 'End date is required').or(z.literal('PRESENT')),
    takeaways: z.array(experienceSchema)
}).refine((data) => {
        if(data.endDate === 'PRESENT') return true
        const startDate = new Date(data.startDate);
        const endDate = new Date(data.endDate);
        return startDate < endDate
    }
    , 
    {
        message: 'Start date must be before end date',
        path: ['endDate']
    }
);

const formSchema = z.object({
    workplaces: z.array(workplaceSchema)
});
export type WorkFormValues = z.infer<typeof formSchema>

export const WorkEdit = ({ data, tokens }: { data: WorkFormValues['workplaces'], tokens: number }) => {
    const methods = useForm({
        resolver: zodResolver(formSchema),
        mode: 'onChange',
        defaultValues: {
            workplaces: data
        }
    });

    const { control, handleSubmit, register, trigger, formState: { errors } } = methods;

    const { fields: workplaceFields, append: appendWorkplace } = useFieldArray({
        control,
        name: 'workplaces'
    });

    const addTakeaway = (workplaceIndex) => {
        const fieldArrayName :any= `workplaces.${workplaceIndex}.takeaways`;
        methods.setValue(fieldArrayName, [...methods.getValues(fieldArrayName), { value: '' }]);
        trigger(fieldArrayName);
    };

    const removeTakeaway = (workplaceIndex, experienceIndex) => {
        const fieldArrayName:any = `workplaces.${workplaceIndex}.takeaways`;
        const updatedTakeaways = methods.getValues(fieldArrayName).filter((_, idx) => idx !== experienceIndex);
        methods.setValue(fieldArrayName, updatedTakeaways);
        trigger(fieldArrayName);
    };

    return (
        <FormProvider {...methods}>
            <form onSubmit={handleSubmit(data => console.log(data))}>
                {workplaceFields.map((workplace, workplaceIndex) => (
                    <Card key={workplace.id} className='flex justify-center'>
                        <div className='w-3/4'>
                            <div className='flex'>
                                <div>
                                    <FormLabel>Start</FormLabel>
                                    <Controller
                                        control={control}
                                        name={`workplaces.${workplaceIndex}.startDate`}
                                        render={({ field: { value, onChange } }) => (
                                            
                                            <Popover>
                                             
                                                <PopoverTrigger asChild>
                                                    <Button
                                                        variant={"outline"}
                                                        className={cn(
                                                            "w-[240px] pl-3 text-left font-normal",
                                                            !value && "text-muted-foreground"
                                                        )}
                                                    >   
                                                        {value ? format(new Date(value), "PPP") : <span>Pick a date</span>}
                                                        <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                                                    </Button>
                                                </PopoverTrigger>
                                                <PopoverContent className="w-auto p-0" align="start">
                                                    <Calendar
                                                        mode="single"
                                                        selected={value ? new Date(value) : undefined}
                                                        onSelect={(date) => onChange(date?.toISOString())}
                                                        initialFocus
                                                    />
                                                </PopoverContent>
                                            </Popover>
                                        )}
                                    />
                                    <FormMessage>{errors?.workplaces?.[workplaceIndex]?.startDate?.message}</FormMessage>
                                </div>
                                <div>
                                    <FormLabel>End</FormLabel>
                                    <Controller
                                        control={control}
                                        name={`workplaces.${workplaceIndex}.endDate`}
                                        render={({ field: { value, onChange } }) => (
                                            <Popover>
                                                <PopoverTrigger asChild>
                                                    <Button
                                                        variant={"outline"}
                                                        className={cn(
                                                            "w-[240px] pl-3 text-left font-normal",
                                                            !value && "text-muted-foreground"
                                                        )}
                                                    >
                                                        {value ? format(new Date(value), "PPP") : <span>Pick a date</span>}
                                                        <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                                                    </Button>
                                                </PopoverTrigger>
                                                <PopoverContent className="w-auto p-0" align="start">
                                                    <Calendar
                                                        mode="single"
                                                        selected={value ? new Date(value) : undefined}
                                                        onSelect={(date) => onChange(date?.toISOString())}
                                                        initialFocus
                                                    />
                                                </PopoverContent>
                                            </Popover>
                                        )}
                                    />
                                    <FormMessage>{errors?.workplaces?.[workplaceIndex]?.endDate?.message}</FormMessage>
                                </div>
                            </div>
                            <FormField
                                control={control}
                                name={`workplaces.${workplaceIndex}.company`}
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Company</FormLabel>
                                        <FormControl>
                                            <Input placeholder="Company Name" {...field} />
                                        </FormControl>
                                        <FormMessage>{errors?.workplaces?.[workplaceIndex]?.company?.message}</FormMessage>
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={control}
                                name={`workplaces.${workplaceIndex}.role`}
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Role</FormLabel>
                                        <FormControl>
                                            <Input placeholder="Role" {...field} />
                                        </FormControl>
                                        <FormMessage>{errors?.workplaces?.[workplaceIndex]?.role?.message}</FormMessage>
                                    </FormItem>
                                )}
                            />
                            <Label className='my-2'>Takeaways</Label>
                            <Controller
                                control={control}
                                name={`workplaces.${workplaceIndex}.takeaways`}
                                render={({ field: { value, onChange } }) => (
                                    <div>
                                        
                                        {value.map((experience, experienceIndex) => (
                                            <>
                                            <div key={experienceIndex} className='flex my-1'>
                                                <div className='w-full flex justify-around my-1'>
                                                    <FormField
                                                        control={control}
                                                        name={`workplaces.${workplaceIndex}.takeaways.${experienceIndex}.value`}
                                                        render={({ field }) => (
                                                            
                                                            <FormItem className='flex-grow'> 
                                                                
                                                                <FormControl>
                                                                    <Textarea placeholder="Description" {...field} />
                                                                </FormControl>
                                                                <FormMessage>{errors?.workplaces?.[workplaceIndex]?.takeaways?.[experienceIndex]?.value?.message}</FormMessage>
                                                            </FormItem>
                                                        )}
                                                    />
                                                    <div  className='flex align-middle self-center' onClick={() => {
                                                        removeTakeaway(workplaceIndex, experienceIndex)
                                                    }}>
                                                    <XIcon className='stroke-slate-500 m-1 stroke-2 sm:w-1 sm:h-1 md:h-3 md:w-3 lg:h-5 lg:w-5 flex hover:stroke-red-400 transition ease-in-out' />
                                                    </div>
                                                </div>
                                            </div>
                                                
                                            </>
                                        ))}
                                        <Button
                                            className='bg-transparent hover:bg-slate-200 text-black m-4'
                                            type="button"
                                            onClick={() =>
                                                addTakeaway(workplaceIndex)
                                            }
                                        >
                                            Add Takeaway
                                        </Button>
                                    </div>
                                )}
                            />
                        </div>
                    </Card>
                ))}
                <Button
                    type="button"
                    onClick={() => {
                        appendWorkplace({
                            _id: undefined,
                            company: '',
                            role: '',
                            startDate: '',
                            endDate: '',
                            takeaways: [{ value: '', immutable: false, _id: undefined}]
                        });
                    }}
                >
                    Add Workplace
                </Button>
                <Button type="submit">Submit</Button>
            </form>
        </FormProvider>
    );
};


export const WorkView: CVPartView = ({ data }: { data: WorkFormValues['workplaces'] }) => {
    return (
       
        data.map((experience, index) => {
                let ed
                let sd
                if(experience.startDate && experience.startDate !== 'Invalid Date'){
                    sd = experience.startDate === 'PRESENT' ? 'PRESENT' :moment(experience.startDate).format('MMMM YYYY')
                }
                if (experience.endDate && experience.endDate !== 'Invalid Date') {
                    ed = experience.endDate === 'PRESENT' ? 'PRESENT' : moment(experience.endDate).format('MMMM YYYY')
                }
                console.log(sd)
                return(
                    (<Card key={index}>
                        <div className='m-4 mr-10'>
                            <p className='text-right italic'> {experience.startDate && experience.endDate ? `${sd} - ${ed}` : sd || ed}</p>
                        </div>
                        <CardHeader className=' font-bold p-0'> {experience.company}</CardHeader>
                        <CardDescription className='!mt-0'>{experience.role}</CardDescription>
                        <div className='my-4'>
                        {experience.takeaways.map((takeaway, index) => {
                            return (
                                    <p key={index} className='my-2'>{takeaway.value}</p>
                            )
                        })}
                        </div>

                    </Card>)
                )
            })
            
    )

}
