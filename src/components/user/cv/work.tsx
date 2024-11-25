import React, { Dispatch, SetStateAction, use, useEffect, useState } from 'react';
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
import { format, set } from 'date-fns';
import { Input } from '@/components/ui/input';
import XIcon from '../../../assets/x.svg?react'
import { Label } from '@radix-ui/react-dropdown-menu';
import { Textarea } from '@/components/ui/textarea';
import { CVPartView } from './utils';
import moment from 'moment';
import { WorkFormValues, workFormSchema } from '@/src/utils/applicaid-ts-utils/cv_form_types';
import { TransformedCV, transformCV } from '@/src/utils/codes';
import { toast } from '@/components/ui/use-toast';
import { deleteEducation, deleteWork, postWork } from '@/src/utils/requests';
import Trash from '../../../assets/trash-2.svg?react'
import { Transform } from 'stream';
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from '@/components/ui/alert-dialog';
import { Toggle } from '@/components/ui/toggle';
import { Checkbox } from '@/components/ui/checkbox';
import exp from 'constants';
import { work } from '@/src/test/data/mock_data';

export const WorkEdit = ({ data, tokens, setcv }: { data: WorkFormValues['workplaces'], tokens: number, setcv: Dispatch<SetStateAction<TransformedCV>> }) => {
    const [defaultValues, setDefaultValues] = useState(data)

    let methods = useForm({
        resolver: zodResolver(workFormSchema),
        mode: 'onChange',
        defaultValues: {
            workplaces: defaultValues
        }
    });
    
    const { control, handleSubmit, register, trigger, reset, formState: { errors } } = methods;

    const { fields: workplaceFields, append: appendWorkplace, remove } = useFieldArray({
        control,
        name: 'workplaces'
    });
    
    useEffect(() => {
        setDefaultValues(data)
        reset({ workplaces: data })
    }, [data])

    const addTakeaway = (workplaceIndex) => {
        const fieldArrayName :any= `workplaces.${workplaceIndex}.takeaways`;
        methods.setValue(fieldArrayName, [...methods.getValues(fieldArrayName), { value: '' }]);
        trigger(fieldArrayName);
    };

    const removeTakeaway = (workplaceIndex, experienceIndex) => {        
        const workplaces = methods.getValues();
        const takeaways = workplaces.workplaces[workplaceIndex].takeaways;
        const updatedTakeaways = takeaways.filter((_, index) => index !== experienceIndex);
        workplaces.workplaces[workplaceIndex].takeaways = updatedTakeaways;
        methods.setValue('workplaces', workplaces.workplaces);
        trigger('workplaces');
        // const updatedTakeaways = takeaways.filter((_, index) => index !== experienceIndex);
        // methods.setValue(`workplaces.${workplaceIndex}.takeaways`, updatedTakeaways);
        // trigger(`workplaces.${workplaceIndex}.takeaways`);
        
    };

    const removeHandler = async (workplace, workplaceIndex) => {
        if(workplace._id){
            const cv = await deleteWork(workplace._id)
            const t_cv = transformCV(cv.data)
            setcv(transformCV(cv.data))
        }
        else{
            remove(workplaceIndex);
        }
    }

    const onSubmit = async  (data: WorkFormValues) => {
        const resp = await postWork(data)
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
                    <pre className="tw-mt-2 tw-w-[340px] rounded-md tw-bg-slate-950 tw-p-4">
                        <code className="text-white">{resp.statusText}</code>
                    </pre>
                ),
            })
        }}
        
    return (
        <FormProvider {...methods}>
            <form onSubmit={handleSubmit(onSubmit)}>
                {workplaceFields.map((workplace, workplaceIndex) => (
                    <Card key={workplace.id}>
                        <div className='tw-flex tw-justify-end tw-mt-3 tw-mr-4'>
                            <AlertDialog>
                                <AlertDialogTrigger asChild>
                                    <Trash className='tw-stroke-slate-500 tw-m-1 tw-stroke-2 sm:tw-w-1 sm:tw-h-1 md:tw-h-3 md:tw-w-3 lg:tw-h-5 lg:tw-w-5 tw-flex hover:tw-stroke-red-400 tw-transition tw-ease-in-out'/>
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
                                        <AlertDialogAction onClick={() => removeHandler(workplace, workplaceIndex)}> Continue</AlertDialogAction>
                                    </AlertDialogFooter>
                                </AlertDialogContent>
                            </AlertDialog>
                            
                        </div>
                        <div className='tw-flex tw-justify-center'>
                            <div className='tw-w-3/4'>
                                <div className='tw-flex tw-justify-between'>
                                    <div className='tw-flex tw-justify-between tw-w-full'>
                                        <div className='tw-w-2/4'>
                                            <FormLabel>Start</FormLabel>
                                            
                                            <Controller
                                                control={control}
                                                name={`workplaces.${workplaceIndex}.startDate`}
                                                render={({ field: { value, onChange } }) => (
                                                    <div className='tw-flex'>
                                                    <Popover>
                                                        <PopoverTrigger asChild>
                                                            <Button
                                                                variant={"outline"}
                                                                className={cn(
                                                                    "tw-w-[240px] tw-pl-3 tw-text-left tw-font-normal",
                                                                    !value && "tw-text-muted-foreground"
                                                                )}
                                                            >   
                                                                {value ? value === 'PRESENT' ? <span>Pick a date</span> : format(new Date(value), "PPP") : <span>Pick a date</span>}
                                                                    <CalendarIcon className="tw-ml-auto tw-h-4 tw-w-4 tw-opacity-50" />
                                                            </Button>
                                                        </PopoverTrigger>
                                                            <PopoverContent className="tw-w-auto p-0" align="start">
                                                            <Calendar
                                                                mode="single"
                                                                selected={value ? new Date(value) : undefined}
                                                                onSelect={(date) => onChange(date?.toISOString())}
                                                                initialFocus
                                                            />
                                                        </PopoverContent>
                                                    </Popover>
                                                    </div>
                                                )}
                                            />
                                            <FormMessage>{errors?.workplaces?.[workplaceIndex]?.startDate?.message}</FormMessage>
                                        </div>
                                        <div className='tw-w-2/4'>
                                            <FormLabel>End</FormLabel>
                                            <Controller
                                                control={control}
                                                name={`workplaces.${workplaceIndex}.endDate`}
                                                render={({ field: { value, onChange } }) => (
                                                    <div className='tw-flex tw-justify-end'>
                                                    <Popover>
                                                        <PopoverTrigger asChild>
                                                            <Button
                                                                variant={"outline"}
                                                                className={cn(
                                                                    "tw-w-[240px] tw-pl-3 tw-text-left ftw-ont-normal",
                                                                    !value && "tw-text-muted-foreground"
                                                                )}
                                                            >
                                                                    {value ? value !== 'PRESENT' ? format(new Date(value), "PPP") : <span>Present</span> : <span>Pick a date</span>}
                                                                    <CalendarIcon className="tw-ml-auto tw-h-4 tw-w-4 tw-opacity-50" />
                                                            </Button>
                                                        </PopoverTrigger>
                                                            <PopoverContent className="tw-w-auto tw-p-0" align="start">
                                                            <Calendar
                                                                mode="single"
                                                                selected={value ? new Date(value) : undefined}
                                                                onSelect={(date) => onChange(date?.toISOString())}
                                                                initialFocus
                                                            />
                                                        </PopoverContent>
                                                    </Popover>
                                                    </div>
                                                )}
                                            />
                                            
                                            <FormMessage>{errors?.workplaces?.[workplaceIndex]?.endDate?.message}</FormMessage>
                                            
                                        </div>
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
                                <Label className='tw-my-2'>Takeaways</Label>
                                <Controller
                                    control={control}
                                    name={`workplaces.${workplaceIndex}.takeaways`}
                                    render={({ field: { value, onChange } }) => (
                                        <div>
                                            
                                            {value.map((experience, experienceIndex) => (
                                                <>
                                                    <div key={experienceIndex} className='tw-flex tw-my-1'>
                                                        <div className='tw-w-full tw-flex tw-justify-around tw-my-1'>
                                                        <FormField
                                                            control={control}
                                                            name={`workplaces.${workplaceIndex}.takeaways.${experienceIndex}`}
                                                            render={({ field }) => (
                                                                
                                                                <FormItem className='tw-flex-grow'> 
                                                                    
                                                                    <FormControl>
                                                                        <Textarea placeholder="Description" {...field.value} />
                                                                    </FormControl>
                                                                    <FormMessage>{errors?.workplaces?.[workplaceIndex]?.takeaways?.[experienceIndex]?.value?.message}</FormMessage>
                                                                </FormItem>
                                                            )}
                                                        />
                                                            <div className='tw-flex tw-align-middle tw-self-center' onClick={() => {
                                                                console.log(experienceIndex)
                                                                removeTakeaway(workplaceIndex, experienceIndex)
                                                        }}>
                                                                <XIcon className='tw-stroke-slate-500 tw-m-1 tw-stroke-2 sm:tw-w-1 sm:tw-h-1 md:tw-h-3 md:tw-w-3 lg:tw-h-5 lg:tw-w-5 tw-flex hover:tw-stroke-red-400 tw-transition tw-ease-in-out' />
                                                        </div>
                                                    </div>
                                                </div>
                                                    
                                                </>
                                            ))}
                                            <Button
                                                className='tw-bg-transparent hover:tw-bg-slate-200 tw-text-black tw-m-4'
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


export const WorkView: CVPartView = ({ data, setcv }: { data: WorkFormValues['workplaces'], setcv: Dispatch<SetStateAction<TransformedCV>> }) => {
    const [defaultValues, setDefaultValues] = useState(data)
    let methods = useForm({
        resolver: zodResolver(workFormSchema),
        mode: 'onChange',
        defaultValues: {
            workplaces: defaultValues
        }
    });
    const { control, handleSubmit, register, trigger, reset, formState: { errors } } = methods;
    const { fields: workplaceFields, append: appendWorkplace, remove } = useFieldArray({
        control,
        name: 'workplaces'
    });
    useEffect(() => {
        setDefaultValues(data)
        reset({ workplaces: data })
    }, [data])

    const onSubmit = async (data: WorkFormValues) => {
        const resp = await postWork(data)
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
    <FormProvider {...methods}>
        <form onSubmit={handleSubmit(onSubmit)}>
        {
          data.map((experience, index) => {
                let ed
                let sd
                if(experience.startDate && experience.startDate !== 'Invalid Date'){
                    sd = experience.startDate === 'PRESENT' ? 'PRESENT' :moment(experience.startDate).format('MMMM YYYY')
                }
                if (experience.endDate && experience.endDate !== 'Invalid Date') {
                    ed = experience.endDate === 'PRESENT' ? 'PRESENT' : moment(experience.endDate).format('MMMM YYYY')
                }
                
                return(
                    (<Card key={index} className="tw-px-6 tw-pb-6 tw-mb-10">
                        <div key={index} className='tw-m-4 tw-mr-10'>
                            <p className='tw-text-right tw-italic'> {experience.startDate && experience.endDate ? `${sd} - ${ed}` : sd || ed}</p>
                        </div>
                        <CardHeader className=' tw-font-bold tw-p-0'> {experience.company}</CardHeader>
                        <CardDescription className='!tw-mt-0'>{experience.role}</CardDescription>
                        <div className='tw-my-4'>
                        {experience.takeaways.map((takeaway, idx) => {
                            return (
                                <FormField
                                key={idx}
                                control={control}
                                name={`workplaces.${index}.takeaways.${idx}.sel`}
                                render={({ field }) => (
                                    <FormItem className='tw-flex-grow'> 
                                        <FormControl>
                                            <Toggle className='tw-m-3  tw-h-auto tw-w-full tw-justify-start' variant='outline' defaultPressed={field.value} onPressedChange={field.onChange}>
                                                <p key={idx} className='tw-my-2 tw-text-justify'>{takeaway.value}</p>
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
        <Button type="submit">Save Preferences</Button>
        </form>
    </FormProvider>
            
            
    )

}
