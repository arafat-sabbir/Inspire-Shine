export type TService = {
    _id: string
    name: string
    description: string
    price: number
    slots:TSlot[]
    duration: number
    isDeleted: boolean
    createdAt: string
    updatedAt: string
    category:
    | "basic wash"
    | "interior detailing"
    | "exterior shine"
    | "engine cleaning"
    | "headlight restoration"
    | "full service";
  }
  
  export interface TSlot {
    service: string
    date: string
    startTime: string
    endTime: string
    isBooked: string
    _id: string
    createdAt: string
    updatedAt: string
  }
  