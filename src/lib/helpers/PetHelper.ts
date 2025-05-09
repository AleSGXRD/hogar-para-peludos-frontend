import { PET_SEX } from "../constants/pet-sex.constant";
import { PET_SIZE } from "../constants/pet-size.constant";

export function parsePetType(value : string){
    switch(value)
    {
        case 'dog':
            return "Perro"
        case 'cat':
            return "Gato"
        case 'rabbit':
            return "Conejo"
        case 'turtle':
            return "Tortuga"
        default: 
            return "Desconocido"
    }
}
export function parsePetAge(age : number){
    if(age <= 1){
        return 1+" Año";
    }
    else{
        return age + " Años"
    }
}
export function parsePetSex(sex:string){
    const petSex = PET_SEX.find(element => element.value == sex)
    return petSex?.label ?? 'Desconocido'
}
export function parsePetSize(size:string){
    const petSize = PET_SIZE.find(element => element.value == size)
    return petSize?.label ?? 'Desconocido'
}