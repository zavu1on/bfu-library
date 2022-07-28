export interface IPage {
  id: number
  image: string
  text: string
}

export interface IPublisher {
  id: number
  name: string
  description: string
  years_of_working: string // '1987 - 2000'
  num_of_newspapers: number
  preview_image: string
}

export interface ICategory {
  name: string
}

export interface ITag {
  name: string
}

export interface INewspaper {
  id: number
  name: string
  created_date: string
  publisher: IPublisher
  tags: ITag[]
  is_important: boolean
  category: ICategory // для подборок
  preview_image: string
}

export interface ILearningMaterial {
  id: number
  name: string
  created_date: string
  file: string
}
