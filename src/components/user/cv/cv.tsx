import Image from "next/image"
import { Card, CardContent, CardDescription, CardHeader } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { SidebarNav } from "@/src/components/user/cv/sidebar"
import { PersonalDetailsEdit, PersonalDetailsView } from "./details"
import { on } from "events"
import { ReactNode, useState } from "react"
import { SkillsEdit, SkillsView } from "./skills"
import { EducationEdit, EducationView } from "./education"
import { ProjectsEdit, ProjectsView } from "./projects"
import Edit from "@/src/assets/edit.svg?react"
interface SettingsLayoutProps {
  children: React.ReactNode
}

import { details,work, volunteer,education,projects, skills, professional_certifications, achievements_and_awards } from "@/src/test/data/mock_data"
import { Toggle } from "@/components/ui/toggle"


export default function CV({ children }: SettingsLayoutProps) {
  const elements:JSX.Element[][] = [
    [<PersonalDetailsEdit data={details} />, <PersonalDetailsView data={details} />],
    [<EducationEdit data={education} />, <EducationView data={education} />],
    [<PersonalDetailsEdit data={details} />, <PersonalDetailsView data={details} />],
    [<ProjectsEdit data={projects} />, <ProjectsView data={projects} />],
    [<PersonalDetailsEdit data={details} />, <PersonalDetailsView data={details} />],
    [<SkillsEdit data={skills} />, <SkillsView data={achievements_and_awards} />],
    [<PersonalDetailsEdit data={details} />, <PersonalDetailsView data={professional_certifications} />],
    [<PersonalDetailsEdit data={details} />, <PersonalDetailsView data={volunteer} />],
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
      title: "Achievements and Awards",
      element: elements[5]
    },
    {
      title: "Professional Certifications",
      element: elements[6]
  
    },
    {
      title: "Volunteering",
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
  return (
  
      <Card>
      <div className="hidden space-y-6 p-10 pb-16 md:block">
      
        <CardHeader><h2 className="text-2xl font-bold tracking-tight">Settings</h2></CardHeader>
        <CardDescription><p className="text-muted-foreground">
            Manage your account settings and set e-mail preferences.
          <Toggle onClick={clickEditHandler}  aria-label="Toggle bold">
            <Edit/>
          </Toggle>
          </p></CardDescription>


        <CardContent>
        <Separator className="my-6" />
        <div className="flex flex-col space-y-8 lg:flex-row lg:space-x-12 lg:space-y-0">
          <aside className="-mx-4 lg:w-1/5">
            <SidebarNav items={itemsWithHandlers} ></SidebarNav>
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