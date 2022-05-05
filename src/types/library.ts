interface IPage {
  imageUrl: string
  text: string
}

export interface IPublisher {
  id: number
  name: string
  description: string
  yearsOfWorking: string // '1987 - 2000'
  numOfNewspapers: number
  previewImageUrl: string
}

export interface INewspaper {
  id: number
  name: string
  createdDate: Date
  publisher: IPublisher
  pages: IPage[]
  tags: string[]
  isImportant: boolean
  category: string // для подборок
  previewImageUrl: string
}
