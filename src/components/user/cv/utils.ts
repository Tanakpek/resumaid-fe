export const generateRandomId = () => {
    return Math.random().toString(36).substring(2, 15);
}
import React, { ReactNode } from 'react';

interface MyComponentProps {
    children?: ReactNode;
    data?: any ;// `children` is optional
}

export type CVPartView<T extends MyComponentProps = MyComponentProps> =  React.FC<T>