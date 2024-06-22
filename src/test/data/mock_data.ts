import { UserDetails } from "@/src/components/user/cv/types"
import { Project, ProjectsSlot, Education, WorkSlot, Volunteer,  } from "@/src/utils/applicaid-ts-utils/cv_type"


export const projects : ProjectsSlot = {'Project 1' : {
    _id: '93424243',
    name: 'Project 1',
    immutable: true,
    takeaways: [
        {
            _id: '234234',
            immutable: true,
            value: 'Takeaway 1'
        },
        {
            _id: '234234',
            immutable: false,
            value: 'Takeaway 2'
        }
    ]
}}

export const education : Education[] = [{
    _id: '93424243',
    immutable: true,
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
    immutable: true,
    _id: '93424243',
    organization_name: 'Red Cross',
    role: 'Volunteer',
    dates: ['2012', '2016'],
    takeaways: [
        {
            _id: '234234',
            immutable: true,
            value: 'Takeaway 1'
        },
        {
            _id: '234234',
            immutable: false,
            value: 'Takeaway 2'
        }
    ]
}]

export const work: WorkSlot = {"Quadra": [{
    _id: '93424243',
    immutable: true,
    role: 'Software Engineer',
    dates: ['2012', '2016'],
    takeaways: [
        {
            _id: '234234',
            immutable: true,
            value: 'Takeaway 1'
        },
        {
            _id: '234234',
            immutable: false,
            value: 'Takeaway 2'
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

export const skills= [{ _id: 'asdsd', immutable: true, value: 'React'}]
export const languages = [{_id: 'asddsdsc', value: 'English', immutable: true}, {_id: 'asdsdc', value: 'Yoruba', immutable: true}]
export const professional_certifications = [{_id: 'asds', value: 'Certified Scrum Master', immutable: true}, {_id: 'ya', immutable: true, value: 'AWS Certified Developer'}]
export const achievements_and_awards = [{_id: 'yass',value: 'Best Graduating Student', immutable: false}, {_id: '3121332', value: "Best Software Engineer" , immutable: true}]