import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card"
import { Switch } from "@/components/ui/switch"
import { CVPartView } from "../user/cv/utils"

export const DefaultView: CVPartView = ({ children=undefined }) => {
    return (
        <Card>
            <CardHeader>
                <div className='tw-flex tw-justify-end'>
                    <Switch className='' id="necessary" defaultChecked />
                </div>
            </CardHeader>
            <CardContent className="tw-grid tw-gap-6">
            </CardContent>
            <CardFooter>
                {children || ''}
                
            </CardFooter>
        </Card>
    )
}