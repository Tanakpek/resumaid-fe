import Image from "next/image"
import { Card, CardContent, CardDescription, CardHeader } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { SidebarNav } from "@/src/components/user/cv/sidebar"
import { PersonalDetailsEdit, PersonalDetailsView } from "./details"
import { on } from "events"
import { ReactNode, use, useEffect, useState } from "react"
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
interface SettingsLayoutProps {
  children: React.ReactNode
}

import { details,work, volunteer,education,projects, skills, professional_certifications, achievements_and_awards, languages } from "@/src/test/data/mock_data"
import { Toggle } from "@/components/ui/toggle"
import { set } from "date-fns"
import { CertsEdit, CertsView } from "./certifications"
import { AchievementsEdit, AchievementsView } from "./achivements"
import { VolunteerEdit, VolunteerView } from "./volunteer"
const encoding = get_encoding("cl100k_base");

export default function CV({ children }: SettingsLayoutProps) {
  const [cv, setCV] = useState(null)
  const [tokens, setTokens] = useState(0)
  useEffect(() => {
    // fetch('/api/cv')
    // .then(response => response.json())
    // .then(data => setCV(data))
    setCV({
      details,
      education,
      work,
      projects,
      skills,
      professional_certifications,
      achievements_and_awards,
      volunteer,
      languages
    })
    const tokens = encoding.encode(JSON.stringify({
      details,
      education,
      work,
      projects,
      skills,
      professional_certifications,
      achievements_and_awards,
      volunteer,
      languages
    })).length
    setTokens(tokens)
  }, [])
  
  const elements:JSX.Element[][] = [
    [<PersonalDetailsEdit data={details} tokens={tokens} />, <PersonalDetailsView data={details} />],
    [<EducationEdit data={education} tokens={tokens}/>, <EducationView data={education} />],
    [<WorkEdit data={work} tokens={tokens} />, <WorkView data={work}  />],
    [<ProjectsEdit data={projects} tokens={tokens} />, <ProjectsView data={projects} />],
    [<SkillsEdit data={skills} tokens={tokens} />, <SkillsView data={achievements_and_awards} />],
    [<AchievementsEdit data={skills} tokens={tokens}/>, <AchievementsView data={achievements_and_awards} />],
    [<CertsEdit data={professional_certifications} tokens={tokens}/>, <CertsView data={professional_certifications} />],
    [<VolunteerEdit data={volunteer} tokens={tokens}/>, <VolunteerView data={volunteer} />],
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
    console.log(activeItem)
  };

  const itemsWithHandlers = sidebarNavItems.map(item => ({
    ...item,
    onClick: (e) => {
      e.preventDefault()
      handleItemClick(item.title)
    }
  }));
  
  const col = getColor(tokens, 400)
  console.log(tokens)
  console.log(col)
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
            {itemsWithHandlers.map(item => (
              <div key={item.title} className={item.title === activeItem ? '' : 'hidden'}>
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