import { AchivevementFormValues } from "../components/user/cv/achivements";
import { CertFormValues } from "../components/user/cv/certifications";
import { EducationFormValues } from "../components/user/cv/education";
import { LanguageFormValues } from "../components/user/cv/languages";
import { ProjectFormValues, ProjectValues } from "../components/user/cv/projects";
import { SkillFormValues } from "../components/user/cv/skills";
import { VolunteerFormValues } from "../components/user/cv/volunteer";
import { WorkFormValues } from "../components/user/cv/work";
import { StringToISO } from "./applicaid-ts-utils/dates/codes";
import { FE_ORIGIN } from "./config";

export const fetchRed = async (url, options = {}) => {
  try {
    const response = await fetch(url, {
      ...options,
      credentials: 'include', // Include credentials (cookies) in requests
    });

    if (response.status === 401) {
      // If the response status is 401, redirect to the login page
      window.location.href = FE_ORIGIN; // Your login URL
      return;
    }

    return response;
  } catch (error) {
    console.error('Fetch error:', error);
    throw error;
  }
};

export interface TransformedCV {
    details?: any // need to flesh out the details type
    work: WorkFormValues['workplaces']
    education: EducationFormValues['education']
    projects: ProjectFormValues['projects']
    skills: SkillFormValues['skills']
    achievements_and_awards: AchivevementFormValues['achievements_and_awards']
    professional_certifications: CertFormValues['certifications']
    languages: LanguageFormValues['languages']
    volunteer: VolunteerFormValues['organizations']
}

export const transformCV = (cv: any) : TransformedCV  => {
    let t_work = []
    let t_projects = []    
    let projects = cv.projects
    let work = cv.work

    if (cv.projects) {
      if (Array.isArray(cv.projects)) {
        t_projects = cv.projects
      }
      else {
        t_projects = []
        Object.keys(projects).forEach((key) => {
          const project = projects[key]
          const proj = {
            name: key,
            takeaways: project.takeaways,
            immutabel: project.immutable ?? false,
            _id: project._id,
          }
          t_projects.push(proj)
        })
      }
    }

  if (cv.work) {
    if (Array.isArray(cv.work)) {
      t_work = cv.work
    }
    else {
      t_work = []
      console.log(work)
      Object.keys(work).forEach((key) => {
        work[key].forEach((exp) => {
          console.log('exp')
          console.log(exp)
          const work_ex = {
            role: exp.role,
            startDate: exp.dates ?? [0] ? StringToISO(exp.dates[0]) : null,
            endDate: exp.dates ?? [1] ? StringToISO(exp.dates[1]) : null,
            takeaways: exp.takeaways,
            company: key,
            _id: exp._id,
          }
          t_work.push(work_ex)
        })
      })
    }
  }
  else{
    t_work = []
  }

 
    
    return {
        work: t_work,
        education: cv.education,
        projects: t_projects,
        skills: cv.skills,
        achievements_and_awards: cv.achievements_and_awards,
        professional_certifications: cv.professional_certifications,
        languages: cv.languages,
        volunteer: cv.volunteer
    }
}