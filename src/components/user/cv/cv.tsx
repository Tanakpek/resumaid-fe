
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
import { details,work, volunteer,education,projects, skills, professional_certifications, achievements_and_awards, languages } from "@/src/test/data/mock_data"
import { Toggle } from "@/components/ui/toggle"
import { set } from "date-fns"
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
    setTokens(tokens)
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
  
  const col = getColor(tokens, 400)
  // console.log(tokens)
  // console.log(col)
  const colorStyle = {
    color: col,
    backgroundColor: col
  }
  

  return (
  
      <Card>
      <div className="hidden space-y-6 p-10 pb-16 md:block">
      
        <CardHeader><h2 className="text-2xl font-bold tracking-tight">Extended Background</h2></CardHeader>
        <CardDescription><p className="text-muted-foreground">
            Manage your extended background.
          <Toggle onClick={clickEditHandler}  aria-label="Toggle bold">
            <Edit/>
          </Toggle>
          </p></CardDescription>


        <CardContent>
        <Separator className="my-6" />
        <div className="flex flex-col space-y-8 lg:flex-row lg:space-x-12 lg:space-y-0">
          <aside className="-mx-4 lg:w-1/5">
            <SidebarNav items={itemsWithHandlers} ></SidebarNav>
              <HoverCard>
                <HoverCardTrigger asChild>
                  <div className="w-full flex justify-center text-center font-bold my-5">
                  <Card className="lg:w-20 lg:h-20 lg:p-0 pr-3 flex lg:block text-xs lg:text-xl"><span style={colorStyle} className="flex h-2 w-2 rounded-full m-2" /> <p className="m-auto">{tokens}</p>
                  </Card>
                  </div>
                </HoverCardTrigger>
                <HoverCardContent className="w-80">
                        <span className="text-xs text-muted-foreground">
                          This is the amount of tokens you have left.
                        </span>
                </HoverCardContent>
              </HoverCard>
          </aside>
          <div className="flex-1 lg:max-w-2xl">
            {itemsWithHandlers.map((item, index) => (
              <div key={item.title + index} className={item.title === activeItem ? '' : 'hidden'}>
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