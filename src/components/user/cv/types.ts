import { AchivevementFormValues, CertFormValues, EducationFormValues, LanguageFormValues, ProfileFormValues, ProjectFormValues, SkillFormValues, VolunteerFormValues, WorkFormValues } from "@/src/utils/applicaid-ts-utils/cv_form_types";
import { UseFormReturn } from "react-hook-form";

export interface UserDetails {
    given_name: string;
    family_name: string;
    midde_name?: string;
    email: string;
    phone_number: string;
    bio: string;
    title?: string;
    github?: string;
    linkedin?: string;
    website?: string;
    // later
    // address?: {
    //     street: string;
    //     city: string;
    //     state?: string;
    //     country: string;
    //     postal_code: string;
    // };

}

export interface ListedItem{
    _id: string;
    immutable: boolean;
    description: string;
}

export interface CVTracker  {
    dirty: DirtyCVTracker
    forms: CVForms | null
}

export interface CVForms {
    details: null | UseFormReturn<ProfileFormValues>
    education: null | UseFormReturn<EducationFormValues>, 
    work: null | UseFormReturn<WorkFormValues>,
    projects: null | UseFormReturn<ProjectFormValues>,
    skills: null | UseFormReturn<SkillFormValues>,
    professional_certifications: null | UseFormReturn<CertFormValues>,
    achievements_and_awards: null | UseFormReturn<AchivevementFormValues>,
    volunteer: null | UseFormReturn<VolunteerFormValues>,
    languages: null | UseFormReturn<LanguageFormValues>,
}
export interface DirtyCVTracker {
    details: boolean;
    education: boolean;
    work: boolean;
    projects: boolean;
    skills: boolean;
    professional_certifications: boolean;
    achievements_and_awards: boolean;
    volunteer: boolean;
    languages: boolean;
}