export interface Car {
    username:string;
    id:number;
    model:string;
    brand:string;
    type:string;
    price:number;
    discount:number
    userId:number;
    image1:string;
    image2:string;
    image3:string;
}

//car with observed
export interface CarWithObserved extends Car {
    observed:boolean;
    count: number;
}

//usata in sell-new-car
export type CarDetails = Omit<Car, 'username' | 'id' | 'discount' | 'image1' | 'image2' | 'image3'>

export interface ObservedCar {
    id:number
    userId:number   //user che osserva la car
    carId:number
}