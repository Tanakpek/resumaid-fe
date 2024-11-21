
import { Card, CardContent, CardDescription, CardHeader } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { SidebarNav } from "@/src/components/user/cv/sidebar"
import { PersonalDetailsEdit, PersonalDetailsView } from "./details"
import {  Dispatch, SetStateAction, useEffect, useState } from "react"
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

interface SettingsLayoutProps {
  children: React.ReactNode
  data: TransformedCV,
  details: { family_name: string, given_name: string, name: string, bio:string, email: string, phone_number: string, website: string, linkedin: string, github: string  }
}
const encoding = get_encoding("cl100k_base");

export default function CV({ data, children, details }: SettingsLayoutProps) {
  const [cv, setCV] = useState(data)
  const [tokens, setTokens] = useState(0)
  const [detail, setDetail] = useState(details)
  const maxTokens = 64000
  useEffect(() => {
    // fetch('/api/cv')
    // .then(response => response.json())
    // .then(data => setCV(data))
    setDetail(detail)
    setCV({
      education : cv.education,
      work: cv.work,
      projects: cv.projects,
      skills: cv.skills,
      professional_certifications: cv.professional_certifications,
      achievements_and_awards : cv.achievements_and_awards,
      volunteer : cv.volunteer,
      languages: cv.languages
    })
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
    
    setTokens(maxTokens - tokens)
  }, [])

  const elements:JSX.Element[][] = [
    [<PersonalDetailsEdit data={detail} tokens={tokens} setdetails={setDetail} />, <PersonalDetailsView data={detail} setdetails={setDetail} />],
    [<EducationEdit data={cv.education} tokens={tokens} setcv={setCV} />, <EducationView data={cv.education} setcv={setCV}  />],
    [<WorkEdit data={cv.work} tokens={tokens} setcv={setCV} />, <WorkView data={cv.work} setcv={setCV} />],
    [<ProjectsEdit data={cv.projects} tokens={tokens} setcv={setCV} />, <ProjectsView data={cv.projects} setcv={setCV} />],
    [<SkillsEdit data={cv.skills} tokens={tokens} setcv={setCV} />, <SkillsView data={cv.skills} />],
    [<AchievementsEdit data={cv.achievements_and_awards} tokens={tokens} setcv={setCV} />, <AchievementsView data={cv.achievements_and_awards} />],
    [<CertsEdit data={cv.professional_certifications} tokens={tokens} setcv={setCV} />, <CertsView data={cv.professional_certifications} />],
    [<VolunteerEdit data={cv.volunteer} tokens={tokens} setcv={setCV} />, <VolunteerView data={cv.volunteer} setcv={setCV} />],
  ]
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
  const [edit, setEdit] = useState(false)
  const clickEditHandler = () => {
    setEdit(!edit)
  }
  const handleItemClick = (title: string) => {
    setActiveItem(title);
  };

  const itemsWithHandlers = sidebarNavItems.map(item => ({
    ...item,
    onClick: (e) => {
      e.preventDefault()
      handleItemClick(item.title)
    }
  }));
  
  const col = getColor(tokens, maxTokens)
  // console.log(tokens)
  // console.log(col)
  const colorStyle = {
    color: col,
    backgroundColor: col
  }
  window.onbeforeinput = function(event) {
    if (event.target instanceof HTMLElement) {
      if (event.target.tagName === 'INPUT' || event.target.tagName === 'TEXTAREA') {
        if (event.inputType === 'insertFromPaste') {
          event.preventDefault();
        }
      }
    }
  }


  return (
  
      <Card>
      <div className="tw-hidden tw-space-y-6 tw-p-10 tw-pb-16 md:tw-block">
      
        <CardHeader>Extended Background</CardHeader>
        <CardDescription>
            Manage your extended background.
          <Toggle onClick={clickEditHandler}  aria-label="Toggle bold">
            <Edit/>
          </Toggle>
          </CardDescription>


        <CardContent>
          <Separator className="tw-my-6" />
          <div className="tw-flex tw-flex-col tw-space-y-8 lg:tw-flex-row lg:tw-space-x-12 lg:tw-space-y-0">
            <aside className="tw-mx-4 lg:tw-w-1/5">
            <SidebarNav items={itemsWithHandlers} ></SidebarNav>
              <HoverCard>
                <HoverCardTrigger asChild>
                  <div className="tw-w-full tw-flex tw-justify-center tw-text-center tw-font-bold tw-my-5">
                    <Card className="lg:tw-w-20 lg:tw-h-20 lg:tw-p-0 tw-pr-3 tw-flex lg:tw-block tw-text-xs lg:tw-text-xl"><span style={colorStyle} className="tw-flex tw-h-2 tw-w-2 tw-rounded-full tw-m-2" /> <p className="tw-m-auto">{tokens}</p>
                  </Card>
                  </div>
                </HoverCardTrigger>
                <HoverCardContent className="tw-w-80">
                  <span className="tw-text-xs tw-text-muted-foreground">
                          This is the amount of tokens you have left.
                        </span>
                </HoverCardContent>
              </HoverCard>
          </aside>
            <div className="tw-flex-1 lg:tw-max-w-2xl">
            {itemsWithHandlers.map((item, index) => (
              <div key={item.title + index} className={item.title === activeItem ? '' : 'tw-hidden'}>
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