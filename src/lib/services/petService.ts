
import lostPetsData from '../json/pets-losted.json';
import type { LostPet } from '../types/Pet';

export function getRecentLostPets(limit: number = 4): LostPet[] {
  // Ordena por fecha de creación (más recientes primero)
  const sortedPets = [...lostPetsData.pets]
    .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
    .slice(0, limit);
  
  // Convierte las fechas de string a Date
  return sortedPets.map(pet => ({
    ...pet,
    lostDate: new Date(pet.lostDate),
    createdAt: new Date(pet.createdAt),
    updatedAt: new Date(pet.updatedAt)
  }) as LostPet);
}