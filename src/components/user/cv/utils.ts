export const generateRandomId = () => {
    return Math.random().toString(36).substring(2, 15);
}
import { TransformedCV } from '@/src/utils/codes';
import React, { createContext, Dispatch, ReactNode, Ref, SetStateAction } from 'react';

interface MyComponentProps {
    children?: ReactNode;
    data?: any ;// `children` is optional
    setcv?: Dispatch<SetStateAction<TransformedCV>>
    setdetails?: Dispatch<SetStateAction<any>>
}

export type CVPartView<T extends MyComponentProps = MyComponentProps> =  React.FC<T>

