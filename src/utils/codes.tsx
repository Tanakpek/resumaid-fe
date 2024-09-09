import { AchivevementFormValues, CertFormValues, EducationFormValues, LanguageFormValues, ProjectFormValues, SkillFormValues, VolunteerFormValues, WorkFormValues } from "./applicaid-ts-utils/cv_form_types";
import { StringToISO } from "./applicaid-ts-utils/dates/codes";
import { FE_ORIGIN } from "./config";

export const fetchA = async (url, options = {}) => {
  try {
    let token = undefined
    let cookies = document.cookie.split(';')
    for(const cookie of cookies){
      const contents = cookie.split('=')
      if(contents[0].trim() === 'token'){
        token = contents[1]
        break
      }
    }
    
    
    const response = await fetch(url, {
      ...options,
      headers: {
        authorization: `Bearer ${token}`,
      }
      // credentials: 'include', // Include credentials (cookies) in requests
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

export const transformCV = (cv: TransformedCV) : TransformedCV  => {
    let t_work = []
    let t_projects = []    
    let projects = cv.projects
    let work = cv.work
    const l_vol = []
    if(cv.volunteer){
      cv.volunteer.forEach((vol:any) => {
        const new_vol = {
          ...vol,
          startDate: vol.dates ?? [0] ? StringToISO(vol.dates[0]) : null,
          endDate: vol.dates ?? [1] ? StringToISO(vol.dates[1]) : null,
          takeaways: vol.takeaways,
        }
        l_vol.push(new_vol)
      })
    }
    if(cv.education){
      cv.education.forEach((ed) => { 
        if(!ed.start){
          if(ed.dates && ed.dates[0]){
              ed.start = StringToISO(ed.dates[0])
            if(!ed.end && ed.dates[1]){
              ed.end = StringToISO(ed.dates[1])
            }
            else if(!ed.end){
              ed.end = null
            }
          }
        }
      })
    }
    
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
            immutable: project.immutable ?? false,
            on: project.on ?? false,
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
      Object.keys(work).forEach((key) => {
        work[key].forEach((exp) => {
          const work_ex = {
            role: exp.role,
            startDate: exp.dates ?? [0] ? StringToISO(exp.dates[0]) : null,
            endDate: exp.dates ?? [1] ? StringToISO(exp.dates[1]) : null,
            takeaways: exp.takeaways,
            company: key,
            on: exp.on ?? false,
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
        volunteer: l_vol
    }
}
