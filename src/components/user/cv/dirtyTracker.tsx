import { createContext, MutableRefObject, Ref, use, useContext, useRef } from "react";
import { CVTracker, DirtyCVTracker } from "./types";
type CVContextValue = MutableRefObject<CVTracker | null>;

export const cleanCV: () => DirtyCVTracker = () => {
    return { achievements_and_awards: false, education: false, work: false, projects: false, skills: false, professional_certifications: false, volunteer: false, languages: false, details: false };
}

export const DirtyContext = createContext<CVContextValue | null>(null);

export const isDirty = (dirty: DirtyCVTracker) => {
    return Object.values(dirty).some((v) => v);
}
export const DirtyCVProvider = ({ children }) => {
    const myRef: Ref<CVTracker> = useRef({dirty: cleanCV(), forms: {details: null, education: null, work: null, projects: null, skills: null, professional_certifications: null, achievements_and_awards: null, volunteer: null, languages: null}});

    return (
        <DirtyContext.Provider value={myRef}>
            {children}
        </DirtyContext.Provider>
    );
};

export const useDirtyCV = () => {
    return useContext(DirtyContext);
}