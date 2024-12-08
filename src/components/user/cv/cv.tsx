
import { Card, CardContent, CardDescription, CardHeader } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { SidebarNav } from "@/src/components/user/cv/sidebar"
import { PersonalDetailsEdit, PersonalDetailsView } from "./details"
import {  Dispatch, Ref, SetStateAction, use, useCallback, useEffect, useRef, useState } from "react"
import { SkillsEdit, SkillsView } from "./skills"
import { EducationEdit, EducationView } from "./education"
import { ProjectsEdit, ProjectsView } from "./projects"
import { WorkEdit, WorkView } from "./work"
import Edit from "@/src/assets/edit.svg?react"
import { get_encoding } from "tiktoken";
import { getColor } from "@/src/utils/applicaid-ts-utils/tiktoken-box"
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card"
import { Toggle } from "@/components/ui/toggle"
import { max, set } from "date-fns"
import { CertsEdit, CertsView } from "./certifications"
import { AchievementsEdit, AchievementsView } from "./achivements"
import { VolunteerEdit, VolunteerView } from "./volunteer"
import { TransformedCV } from "@/src/utils/codes"
import { cleanCV, isDirty, useDirtyCV } from "./dirtyTracker"
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from "@/components/ui/alert-dialog"

interface SettingsLayoutProps {
  children: React.ReactNode
  data: TransformedCV,
  fetchData: () => void,
  details: { family_name: string, given_name: string, name: string, bio:string, email: string, phone_number: string, website: string, linkedin: string, github: string  }
}
const encoding = get_encoding("cl100k_base");

export default function CV({ data, children, details, fetchData }: SettingsLayoutProps) {
  const cvDirtyState = useDirtyCV()
  const [cv, setCV] = useState(data)
  const setCVAndClearDirty = (cv: TransformedCV) => {
    setCV(cv)
    resetCV()
    // cvDirtyState.current.forms.education.setValue('education', cv.education)
    // cvDirtyState.current.forms.work.setValue('workplaces', cv.work)
    // cvDirtyState.current.forms.projects.setValue('projects', cv.projects)
    // cvDirtyState.current.forms.skills.setValue('skills', cv.skills)
    // cvDirtyState.current.forms.professional_certifications.setValue('certifications', cv.professional_certifications)
    // cvDirtyState.current.forms.achievements_and_awards.setValue('achievements_and_awards', cv.achievements_and_awards)
    // cvDirtyState.current.forms.volunteer.setValue('organizations', cv.volunteer)
    // cvDirtyState.current.forms.languages.setValue('languages', cv.languages)
    // cvDirtyState.current.dirty = cleanCV()

  }
  
  const [tokens, setTokens] = useState(0)
  const [detail, setDetail] = useState(details)
  const setDetailsAndClearDirty = (details) => {
    setDetail(details)
    cvDirtyState.current.forms.details.reset(
      {
        bio: details.bio,
        email: details.email,
        phone_number: details.phone_number,
        linkedin: details.linkedin,
        github: details.github,
        personal_website: details.website,
      }
    )
    cvDirtyState.current.dirty = cleanCV()
  }

  const maxTokens = 64000
  const [manageBackgroundToggleAlert, setManageBackgroundToggleAlert] = useState(false)
  const createForms = () => {
    return [
      [<PersonalDetailsEdit data={detail} tokens={tokens} setdetails={setDetailsAndClearDirty} />, <PersonalDetailsView data={detail} setdetails={setDetailsAndClearDirty} />],
      [<EducationEdit data={cv.education} tokens={tokens} setcv={setCVAndClearDirty} />, <EducationView data={cv.education} setcv={setCVAndClearDirty} />],
      [<WorkEdit data={cv.work} tokens={tokens} setcv={setCVAndClearDirty} />, <WorkView data={cv.work} setcv={setCVAndClearDirty} />],
      [<ProjectsEdit data={cv.projects} tokens={tokens} setcv={setCVAndClearDirty} />, <ProjectsView data={cv.projects} setcv={setCVAndClearDirty} />],
      [<SkillsEdit data={cv.skills} tokens={tokens} setcv={setCVAndClearDirty} />, <SkillsView data={cv.skills} />],
      [<AchievementsEdit data={cv.achievements_and_awards} tokens={tokens} setcv={setCVAndClearDirty} />, <AchievementsView data={cv.achievements_and_awards} />],
      [<CertsEdit data={cv.professional_certifications} tokens={tokens} setcv={setCVAndClearDirty} />, <CertsView data={cv.professional_certifications} />],
      [<VolunteerEdit data={cv.volunteer} tokens={tokens} setcv={setCVAndClearDirty} />, <VolunteerView data={cv.volunteer} setcv={setCVAndClearDirty} />],
    ]
  }
  const [elements, setElements]: [JSX.Element[][] , Dispatch<JSX.Element[][]>] = useState(createForms())
  const sidebarNavItems = [
    {
      title: "Details",
      element: elements[0],
    },
    {
      title: "Education",
      element: elements[1]
    },
    {
      title: "Work Experience",
      element: elements[2]
    },
    {
      title: "Projects",
      element: elements[3],
    },
    {
      title: "Skills",
      element: elements[4]
    },
    {
      title: "Achievements & Awards",
      element: elements[5]
    },
    {
      title: "Professional Certifications",
      element: elements[6]
  
    },
    {
      title: "Volunteering & Extracurriculars",
      element: elements[7]
    },
  ]
  const [activeItem, setActiveItem] = useState(sidebarNavItems[0].title);
  
  const resetCV = () => {
    if (cvDirtyState.current.forms.professional_certifications){
      cvDirtyState.current.forms.professional_certifications.setValue('certifications', cv.professional_certifications)
    }
    if (cvDirtyState.current.forms.skills){
      cvDirtyState.current.forms.skills.setValue('skills', cv.skills)
    }
    if (cvDirtyState.current.forms.projects){
      cvDirtyState.current.forms.projects.setValue('projects', cv.projects)
    }
    if (cvDirtyState.current.forms.work){
      cvDirtyState.current.forms.work.setValue('workplaces', cv.work)
    }
    if (cvDirtyState.current.forms.education){
      cvDirtyState.current.forms.education.setValue('education', cv.education)
    }
    if (cvDirtyState.current.forms.achievements_and_awards){
      cvDirtyState.current.forms.achievements_and_awards.setValue('achievements_and_awards', cv.achievements_and_awards)
    }
    if (cvDirtyState.current.forms.volunteer){
      cvDirtyState.current.forms.volunteer.setValue('organizations', cv.volunteer)
    }
    if (cvDirtyState.current.forms.details){
      cvDirtyState.current.forms.details.reset(
        {
          bio: detail.bio,
          email: detail.email,
          phone_number: detail.phone_number,
          linkedin: detail.linkedin,
          github: detail.github,
          personal_website: detail.website,
        }
      )
    }
    if(cvDirtyState?.current.forms.languages){
      cvDirtyState.current.forms.languages.setValue('languages', cv.languages)
    }
  

    setCV((prev) => {
      return {
        education: cv.education,
        work: cv.work,
        projects: cv.projects,
        skills: cv.skills,
        professional_certifications: cv.professional_certifications,
        achievements_and_awards: cv.achievements_and_awards,
        volunteer: cv.volunteer,
        languages: cv.languages
      }
    })



    setDetail(() => detail)
    if (cvDirtyState?.current) {
      cvDirtyState.current.dirty = cleanCV()
    }
  }

  const [edit, setEdit] = useState(false)
  const clickEditHandler = () => {
    setEdit(!edit)
  }
  const handleItemClick = ( title: string) => {
    setActiveItem(() => title);
  };

  const itemsWithHandlers = sidebarNavItems.map((item)=> {
    const title = item.title
    return {
    ...item,
    onClick: (e) => {
      handleItemClick(title)
    }
  }});

  
  const col = getColor(tokens, maxTokens)
  const colorStyle = {
    color: col,
    backgroundColor: col
  }

  useEffect(() => {
    setDetail(() => detail)
    resetCV()
    const tokens = encoding.encode(JSON.stringify({
      education: cv.education,
      work: cv.work,
      projects: cv.projects,
      skills: cv.skills,
      professional_certifications: cv.professional_certifications,
      achievements_and_awards: cv.achievements_and_awards,
      volunteer: cv.volunteer,
      languages: cv.languages
    })).length
    setTokens(() => maxTokens - tokens)

  }, [])

  return (
  
      <Card>
      <div className="tw-hidden tw-space-y-6 tw-p-10 tw-pb-16 md:tw-block">
      
        <CardHeader className="tw-font-black tw-text-primary">Extended Background</CardHeader>
        <CardDescription>
            Manage your extended background.

            <AlertDialog open={manageBackgroundToggleAlert}>
            <Toggle aria-label="Toggle bold"  onClick={(e) => {
              e.preventDefault()
              console.log('tog')
              console.log(!manageBackgroundToggleAlert, edit)
              if (isDirty(cvDirtyState.current.dirty) && !manageBackgroundToggleAlert && edit) {
                setManageBackgroundToggleAlert(true)
              }
              else {
                if (!isDirty(cvDirtyState.current.dirty)){
                  clickEditHandler()
                }
                
              }
            }}>
              <Edit/>
              <AlertDialogContent>
                <AlertDialogHeader>
                  <AlertDialogTitle>Are you sure?</AlertDialogTitle>
                  <AlertDialogDescription>
                    You are about to discard your changes.
                  </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                  <AlertDialogCancel onClick={(e) => 
                  {
                    console.log(manageBackgroundToggleAlert)
                    e.preventDefault()
                    setManageBackgroundToggleAlert(false)
                  }
                  }>Cancel</AlertDialogCancel>
                  <AlertDialogAction onClick={async (e) => {
                    setManageBackgroundToggleAlert(false)
                    resetCV()
                    clickEditHandler()
                  }}>Accept</AlertDialogAction>
                </AlertDialogFooter>
              </AlertDialogContent>
            </Toggle>
            </AlertDialog>

          </CardDescription>


        <CardContent>
          <Separator className="tw-my-6" />
          <div className="tw-flex tw-flex-col tw-space-y-8 lg:tw-flex-row lg:tw-space-x-12 lg:tw-space-y-0">
            <aside className="tw-mx-4 lg:tw-w-1/5">
              <SidebarNav items={itemsWithHandlers} resetCV={resetCV} ></SidebarNav>
              <HoverCard>
                <HoverCardTrigger asChild>
                  <div className="tw-w-full tw-flex tw-justify-center tw-text-center tw-font-bold tw-my-5">
                    <Card className="lg:tw-w-20 lg:tw-h-20 lg:tw-p-0 tw-pr-3 tw-flex lg:tw-block tw-text-xs lg:tw-text-xl"><span style={colorStyle} className="tw-flex tw-h-2 tw-w-2 tw-rounded-full tw-m-2" /> <p className="tw-m-auto">{tokens}</p>
                  </Card>
                  </div>
                </HoverCardTrigger>
                <HoverCardContent className="tw-w-80">
                  <span className="tw-text-xs tw-text-muted-foreground">
                          This is the amount of context you have left for your background.
                        </span>
                </HoverCardContent>
              </HoverCard>
          </aside>
            <div className="tw-flex-1 lg:tw-max-w-2xl">
            {itemsWithHandlers.map((item, index) => (
              <div key={item.title + (edit ? 'edit' : 'view') + index} className={item.title === activeItem ? '' : 'tw-hidden'}>
                {item.element[edit ? 0 : 1]}
              </div>
            ))}
          </div>
          
        </div>
        </CardContent>
        
      </div>
    

      </Card>
    
  )
}