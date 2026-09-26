export type PortfolioData = {
    personal: PersonalInfo
    summary: string
    education: Education[]
    experience: Experience[]
    projects: Project[]
    skills: Skills
    additionalInformation: AdditionalInformation
}

export type PersonalInfo = {
    name: string
    title: string
    location: string
    phone: string
    email: string
    linkedin: string
    github: string
}

export type Education = {
    degree: string
    institution: string
    startDate: string
    endDate: string
    location: string
    cgpa: string
    grade: string
}

export type Experience = {
    position: string
    company: string
    type: string
    startDate: string
    endDate: string
    location: string
    demoVideo?: string
    description: string[]
}

export type Project = {
    name: string
    subtitle: string
    technologies: string[]
    demoVideo?: string
    links: {
        liveDemo?: string
        github?: string
        githubFrontend?: string
        githubBackend?: string
    }
    description: string[]
}

export type Skills = {
    languages: string[]
    frontEnd: string[]
    backEnd: string[]
    databases: string[]
    cloudAndDevOps: string[]
    testingAndQA: string[]
    practices: string[]
    security: string[]
    ai: string[]
    professional: string[]
}

export type AdditionalInformation = {
    militaryStatus: string
    languages: Language[]
}

export type Language = {
    name: string
    level: string
}
