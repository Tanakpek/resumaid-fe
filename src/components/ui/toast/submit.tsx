import { Button } from "@/components/ui/button"
import { useToast } from "@/components/ui/use-toast"

interface ToastProps {
    buttonText: string,
    description: string
}
interface ToastWTitleProps extends ToastProps {
    title?: string
}

interface ToastAlertProps extends ToastWTitleProps {
    variant?: 'destructive'
}


export const ToastDemo = (data: ToastAlertProps) => {
    const { toast } = useToast()
    return (
        <Button 
            onClick={() => {
                toast({
                    variant: data.variant ? data.variant : 'default',
                    title: data.title ? data.title : undefined,
                    description: data.description,
                })
            }}
        >
            {data.buttonText}
        </Button>
    )
}