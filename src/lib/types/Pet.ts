// Interfaz base con propiedades comunes
interface BasePet {
    id: string;
    petName: string;
    description: string;
    petType: string;
    province: string;
    address: string;
    age: number;
    sex: string;
    size: string;
    weight?: number; // Opcional ya que no siempre se conoce
    breed: string;
    imageUrl: string;
    createdAt: Date;
    updatedAt: Date;
}

// Tipo para mascotas en adopción
export interface AdoptionPet extends BasePet {
    reportType: 'adoption';
    status: 'available' | 'reserved' | 'adopted';
    ownerName: string;
    ownerEmail: string;
    ownerPhone: string;
    createdByEmail: string;
    // Propiedades específicas de adopción
    vaccinationStatus?: boolean;
    sterilizationStatus?: boolean;
    personalityTraits?: string[];
}

// Tipo para mascotas perdidas
export interface LostPet extends BasePet {
    reportType: 'lost';
    status: 'missing' | 'found' | 'reunited';
    contactName: string; // Puede ser diferente del dueño
    contactPhone: string;
    contactEmail?: string;
    // Propiedades específicas de mascotas perdidas
    lostDate: Date;
    lastSeenLocation: string;
    lastSeenDetails?: string;
    reward?: string;
    distinctiveFeatures?: string[];
    isMicrochipped?: boolean;
}

// Tipo unión para cuando necesites manejar ambos
export type Pet = AdoptionPet | LostPet;

// Guards de tipo para diferenciarlos
export function isAdoptionPet(pet: Pet): pet is AdoptionPet {
    return pet.reportType === 'adoption';
}

export function isLostPet(pet: Pet): pet is LostPet {
    return pet.reportType === 'lost';
}