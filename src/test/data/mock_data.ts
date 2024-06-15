import { UserDetails } from "@/src/components/user/cv/types"
import { Project, ProjectsSlot, Education, WorkSlot, Volunteer,  } from "@/src/utils/applicaid-ts-utils/cv_type"


export const projects : ProjectsSlot = {'Project 1' : {
    id: '93424243',
    name: 'Project 1',
    takeaways: [
        {
            id: '234234',
            immutable: true,
            description: 'Takeaway 1'
        },
        {
            id: '234234',
            immutable: false,
            description: 'Takeaway 2'
        }
    ]
}}

export const education : Education[] = [{
    id: '93424243',
    institution: 'University of Lagos',
    location: 'Lagos',
    degree: 'BSc Computer Science',
    dates: ['2012', '2016'],
    score: '2:1',
    classification: 'Second Class Upper',
    gpa: 4.5,
    thesis: 'Thesis',
    dissertation: 'On the Topic of Bullshitery'
}]


export const volunteer: Volunteer[] = [{
    id: '93424243',
    organization_name: 'Red Cross',
    role: 'Volunteer',
    dates: ['2012', '2016'],
    takeaways: [
        {
            id: '234234',
            immutable: true,
            description: 'Takeaway 1'
        },
        {
            id: '234234',
            immutable: false,
            description: 'Takeaway 2'
        }
    ]
}]

export const work: WorkSlot = {"Quadra": [{
    id: '93424243',
    role: 'Software Engineer',
    dates: ['2012', '2016'],
    takeaways: [
        {
            id: '234234',
            immutable: true,
            description: 'Takeaway 1'
        },
        {
            id: '234234',
            immutable: false,
            description: 'Takeaway 2'
        }
    ]
}]}

export const details: UserDetails = {
    first_name: 'John',
    last_name: 'Doe',
    midde_name: 'Marge',
    email: 'akpektan@gmail.com',
    phone: '08123456789',
    bio: 'I am a software engineer',
    title: 'Mr.',
    github: 'tanakpek',
    linkedin: 'tanakpek',
    website: 'https://www.tanakpek.com'
}

export const skills= ['React', 'Node', 'Express', 'MongoDB']
export const languages: string[] = ['English', 'Yoruba']
export const professional_certifications = [{id: 'asds', value: 'Certified Scrum Master', immutable: true}, {id: 'ya', immutabe: true, value: 'AWS Certified Developer'}]
export const achievements_and_awards: string[] = ['Best Graduating Student', 'Best Software Engineer']