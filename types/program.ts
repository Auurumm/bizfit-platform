// types/program.ts

export interface GovernmentProgram {
  id: string
  title: string
  organization: string
  ministry: string
  category: string
  budget: string
  deadline: string
  registrationDate: string
  description: string
  requirements: string[]
  applicationUrl: string
  contactInfo: string
  status: "active" | "closing" | "upcoming" | "closed"
  tags: string[]
  region: string
  targetCompany: string
  supportType: string
  daysLeft: number | null
  matching?: ProgramMatching
}

export interface ProgramMatching {
  businessTypes: string[]
  industries: string[]
  challenges: string[]
  goals: string[]
}

export interface ProgramsResponse {
  success: boolean
  programs: GovernmentProgram[]
  totalCount: number
  dataSource: string
  error?: string
}