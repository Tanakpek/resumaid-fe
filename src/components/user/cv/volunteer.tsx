import React, { Dispatch, SetStateAction, useEffect } from 'react';
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
import { Volunteer } from '@/src/utils/applicaid-ts-utils/cv_type';
import { VolunteerFormValues, volunteerFormSchema } from '@/src/utils/applicaid-ts-utils/cv_form_types';
import { TransformedCV, transformCV } from '@/src/utils/codes';
import { toast } from '@/components/ui/use-toast';
import { deleteVolunteer, postVolunteer } from '@/src/utils/requests';
import Trash from '../../../assets/trash-2.svg?react'
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from '@/components/ui/alert-dialog';
import { Toggle } from '@/components/ui/toggle';
import { on } from 'events';
import moment from 'moment';

export const VolunteerEdit = ({ data, tokens, setcv }: { data: any, tokens: number, setcv:(cv:TransformedCV) => void }) => {
    const [defaultValues, setDefaultValues] = React.useState(data)
    const methods = useForm({
        resolver: zodResolver(volunteerFormSchema),
        mode: 'onChange',
        defaultValues: {
            organizations: defaultValues
        }
    });

    const { control, handleSubmit,reset, register, trigger, formState: { errors } } = methods;
    const { fields: organizationFields, remove,  append: appendWorkplace } = useFieldArray({
        control,
        name: 'organizations'
    });
    useEffect(() => {
        setDefaultValues(data)
        reset({ organizations: data })
    }, [data])

    const addTakeaway = (workplaceIndex) => {
        const fieldArrayName: any = `organizations.${workplaceIndex}.takeaways`;
        methods.setValue(fieldArrayName, [...methods.getValues(fieldArrayName), { description: '', _id: undefined, immutable:false }]);
        trigger(fieldArrayName);
    };

    const removeTakeaway = (workplaceIndex, experienceIndex) => {
        const fieldArrayName: any = `organizations.${workplaceIndex}.takeaways`;
        const updatedTakeaways = methods.getValues(fieldArrayName).filter((_, idx) => idx !== experienceIndex);
        methods.setValue(fieldArrayName, updatedTakeaways);
        trigger(fieldArrayName);
    };

    const removeHandler = async (volunteer, volunteerIndex) => {
        if (volunteer._id) {
            const cv = await deleteVolunteer(volunteer._id)
            setcv(transformCV(cv.data))
        }
        else {
            remove(volunteerIndex);
        }
    }

    const onSubmit = async (data) => {
        const resp = await postVolunteer(data)
        if (resp.status === 200) {
            try {
                const cv = (transformCV(resp.data))
                if (cv) {
                    toast({
                        title: "You changed your details successfully!",
                        description: (
                            <pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4">
                                <code className="text-white">{JSON.stringify(data, null, 2)}</code>
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
                        <code className="text-white">{resp.statusText}</code>
                    </pre>
                ),
            })
        }
    };

    return (
        <FormProvider {...methods}>
            <form onSubmit={handleSubmit(onSubmit)}>
                {organizationFields.map((workplace, workplaceIndex) => (
                    
                    <Card key={workplace.id}>
                        <div className='flex justify-end  mt-3 mr-4'>
                            <AlertDialog>
                                <AlertDialogTrigger asChild>
                                    <Trash className='stroke-slate-500 m-2 stroke-2 sm:w-1 sm:h-1 md:h-3 md:w-3 lg:h-5 lg:w-5 align-right  hover:stroke-red-400 transition ease-in-out' />
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
                                        <AlertDialogAction onClick={() => { removeHandler(workplace, workplaceIndex)}}>Continue</AlertDialogAction>
                                    </AlertDialogFooter>
                                </AlertDialogContent>
                            </AlertDialog>
                            
                        </div>
                        <div className='flex justify-center'>
                            <div className='w-3/4'>
                                <div className='flex'>
                                    <div>
                                        <FormLabel>Start</FormLabel>
                                        <Controller
                                            control={control}
                                            name={`organizations.${workplaceIndex}.startDate`}
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
                                                            {value ? value !== 'PRESENT' ? format(new Date(value), "PPP") : <span>Pick a date</span> : <span>Pick a date</span>}
                                                            <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                                                        </Button>
                                                    </PopoverTrigger>
                                                    <PopoverContent className="w-auto p-0" align="start">
                                                        <Calendar
                                                            mode="single"
                                                            selected={value ? new Date(value) : undefined}
                                                            onSelect={(date) => {
                                                                onChange(date?.toISOString())
                                                            }}
                                                            initialFocus
                                                        />
                                                    </PopoverContent>
                                                </Popover>
                                            )}
                                        />
                                        <FormMessage>{errors?.organizations?.[workplaceIndex]?.startDate?.message}</FormMessage>
                                    </div>
                                    <div>
                                        <FormLabel>End</FormLabel>
                                        <Controller
                                            control={control}
                                            name={`organizations.${workplaceIndex}.endDate`}
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
                                                            {value ? value !== 'PRESENT' ? format(new Date(value), "PPP") : <span>Present</span> : <span>Pick a date</span>}
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
                                        <FormMessage>{errors?.organizations?.[workplaceIndex]?.endDate?.message}</FormMessage>
                                    </div>
                                </div>
                                <FormField
                                    control={control}
                                    name={`organizations.${workplaceIndex}.organization_name`}
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Organization</FormLabel>
                                            <FormControl>
                                                <Input placeholder="Company Name" {...field} />
                                            </FormControl>
                                            <FormMessage>{errors?.organizations?.[workplaceIndex]?.organization_name?.message}</FormMessage>
                                        </FormItem>
                                    )}
                                />
                                <FormField
                                    control={control}
                                    name={`organizations.${workplaceIndex}.role`}
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Role</FormLabel>
                                            <FormControl>
                                                <Input placeholder="Role" {...field} />
                                            </FormControl>
                                            <FormMessage>{errors?.organizations?.[workplaceIndex]?.role?.message}</FormMessage>
                                        </FormItem>
                                    )}
                                />
                                <Label className='my-2'>Takeaways</Label>
                                <Controller
                                    control={control}
                                    name={`organizations.${workplaceIndex}.takeaways`}
                                    render={({ field: { value, onChange } }) => (
                                        <div>

                                            {value.map((experience, experienceIndex) => (
                                                <>
                                                    <div key={experienceIndex} className='flex my-1'>
                                                        <div className='w-full flex justify-around my-1'>
                                                            <FormField
                                                                control={control}
                                                                name={`organizations.${workplaceIndex}.takeaways.${experienceIndex}.value`}
                                                                render={({ field }) => (

                                                                    <FormItem className='flex-grow'>

                                                                        <FormControl>
                                                                            <Textarea placeholder="Description" {...field} />
                                                                        </FormControl>
                                                                        <FormMessage>{errors?.organizations?.[workplaceIndex]?.takeaways?.[experienceIndex]?.value?.message}</FormMessage>
                                                                    </FormItem>
                                                                )}
                                                            />
                                                            <div className='flex align-middle self-center' onClick={() => {
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
                        </div>
                    </Card>
                ))}
                <Button
                    type="button"
                    onClick={() => {
                        appendWorkplace({
                            _id: undefined,
                            organization_name: '',
                            role: '',
                            startDate: '',
                            endDate: '',
                            takeaways: [{ _id: undefined, immutable: false, value: '' }]
                        });
                    }}
                >
                    Add
                </Button>
                <Button type="submit">Submit</Button>
            </form>
        </FormProvider>
    );
};


export const VolunteerView: CVPartView = ({ data, setcv }: { data: VolunteerFormValues['organizations'], setcv: Dispatch<SetStateAction<TransformedCV>> }) => {
    const [defaultValues, setDefaultValues] = React.useState(data)
    const methods = useForm({
        resolver: zodResolver(volunteerFormSchema),
        mode: 'onChange',
        defaultValues: {
            organizations: defaultValues
        }
    });
    const { control, handleSubmit, reset, register, trigger, formState: { errors } } = methods;
    const { fields: organizationFields, remove, append: appendWorkplace } = useFieldArray({
        control,
        name: 'organizations'
    });
    useEffect(() => {
        setDefaultValues(data)
        reset({ organizations: data })
    }, [data])

    const onSubmit = async (data) => {
        console.log('ionsubmit')
        
        const resp = await postVolunteer(data)
        if (resp.status === 200) {
            try {
                const cv = (transformCV(resp.data))
                if (cv) {
                    toast({
                        title: "You changed your details successfully!",
                        description: (
                            <pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4">
                                <code className="text-white">{JSON.stringify(data, null, 2)}</code>
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
                        <code className="text-white">{resp.statusText}</code>
                    </pre>
                ),
            })
        }
    };

    return (
        <FormProvider {...methods}>
        <form onSubmit={handleSubmit(onSubmit, (e) => {
            console.log('here')
            })}>
        {
        data.map((experience, index) => {
            let ed
            let sd
            if (experience.startDate && experience.startDate !== 'Invalid Date') {
                sd = experience.startDate === 'PRESENT' ? 'Present' : moment(experience.startDate).format('MMMM YYYY')
            }
            if (experience.endDate && experience.endDate !== 'Invalid Date') {
                ed = experience.endDate === 'PRESENT' ? 'Present' : moment(experience.endDate).format('MMMM YYYY')
            }
            return (
                (<Card key={index} className="px-6 pb-6 mb-10">
                    <div className='m-4 mr-10'>
                        <p className='text-right italic'> {experience.startDate && experience.endDate ? `${sd} - ${ed}` : sd || ed}</p>
                    </div>
                    <CardHeader className=' font-bold p-0'> {experience.organization_name}</CardHeader>
                    <CardDescription className='!mt-0'>{experience.role}</CardDescription>
                    <div className='my-4'>
                        {experience.takeaways.map((takeaway, idx) => {
                            return (
                                <FormField
                                    control={control}
                                    name={`organizations.${index}.takeaways.${idx}.sel`}
                                    render={({ field }) => (
                                        <FormItem className='flex-grow'>
                                            <FormControl>
                                            <Toggle className=' h-auto w-full justify-start my-2' variant='outline' defaultPressed={takeaway.sel} onPressedChange={field.onChange}>
                                                <p key={index} className='my-2 text-justify'>{takeaway.value}</p>
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
