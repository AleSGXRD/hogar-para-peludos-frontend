import type { LostPet, Pet } from '~/lib/types/Pet'
import { parsePetType, parsePetAge } from '../../lib/helpers/PetHelper'

interface Props {
  pet: LostPet
}

export default function LostPetCard({ pet }: Props) {
  return (
    <a
      href={`/lost-pet/${pet.id}`}
      className="group block h-full transition-all hover:scale-[1.02] active:scale-[0.98] relative"
    >
      {/* Ribbon de "Perdido" */}
      <div className="absolute top-0 right-0 bg-red-600 text-white px-3 py-1 text-sm font-bold z-10 shadow-md">
        ¡PERDIDO!
      </div>
      
      <div className="h-full rounded-xl hover:shadow-lg transition-all hover:bg-red-50 overflow-hidden hover:border border-red-100 flex flex-col">
        
        {/* Imagen con overlay */}
        <div className="relative overflow-hidden aspect-video h-[200px]">
          <img
            alt={`${pet.petName} - ${parsePetType(pet.petType)} perdido`}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
            loading="lazy"
            width={400}
            height={400}
            // src={pet.imageUrl ?? 'https://ptqxhogmwecyueleyhbn.supabase.co/storage/v1/object/public/hogar-para-peludos/adopcion/prueba%20img.jpg'}
            src='/panda.jpg'
          />
          <div className="absolute inset-0 bg-red-900/10"></div>
        </div>

        {/* Contenido */}
        <div className="p-4 flex flex-col gap-3 flex-1">
          
          {/* Encabezado */}
          <div className="flex items-center justify-between">
            <div>
              <h3 className="font-bold text-xl text-gray-800 line-clamp-1">{pet.petName}</h3>
              <p className="text-xs text-gray-500">
                Perdido el {new Date(pet.createdAt).toLocaleDateString('es-ES', {
                  year: 'numeric',
                  month: 'short',
                  day: 'numeric'
                })}
              </p>
            </div>

            {/* Icono de sexo */}
            {pet.sex && (
              <div className="flex-shrink-0 ml-2">
                {pet.sex.toLowerCase() === 'male' ? (
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-blue-600" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}>
                    <path d="M5 14a5 5 0 1 0 10 0a5 5 0 1 0-10 0m14-9l-5.4 5.4M19 5h-5m5 0v5"/>
                  </svg>
                ) : (
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-pink-600" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}>
                    <path d="M7 9a5 5 0 1 0 10 0A5 5 0 1 0 7 9m5 5v7m-3-3h6"/>
                  </svg>
                )}
              </div>
            )}
          </div>

          {/* Ubicación destacada */}
          <div className="bg-red-100 text-red-800 px-3 py-2 rounded-lg flex text-xs items-center gap-2">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
              <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0"/>
              <circle cx="12" cy="10" r="3"/>
            </svg>
            <span className="font-medium">Visto por última vez en {pet.province}</span>
          </div>

          {/* Características */}
          <ul className="flex flex-wrap gap-2">
            <li className="flex items-center gap-2 text-xs text-gray-700 font-medium rounded-4xl px-2 py-2 border border-lime-50 bg-[#ecfcca76]">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-lime-600" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
                <path d="M14.7 13.5c-1.1-2-1.441-2.5-2.7-2.5s-1.736.755-2.836 2.747c-.942 1.703-2.846 1.845-3.321 3.291c-.097.265-.145.677-.143.962c0 1.176.787 2 1.8 2c1.259 0 3-1 4.5-1s3.241 1 4.5 1c1.013 0 1.8-.823 1.8-2c0-.285-.049-.697-.146-.962c-.475-1.451-2.512-1.835-3.454-3.538m5.488-5.418A1 1 0 0 0 19.782 8h-.015c-.735.012-1.56.75-1.993 1.866c-.519 1.335-.28 2.7.538 3.052q.196.082.406.082c.739 0 1.575-.742 2.011-1.866c.516-1.335.273-2.7-.54-3.052zM9.474 9c.055 0 .109 0 .163-.011c.944-.128 1.533-1.346 1.32-2.722C10.754 4.97 9.91 4 9.025 4c-.055 0-.109 0-.163.011c-.944.128-1.533 1.346-1.32 2.722C7.746 8.026 8.59 9 9.475 9zm6.982-2.267c.214-1.376-.375-2.594-1.32-2.722A1 1 0 0 0 14.974 4c-.885 0-1.728.97-1.93 2.267c-.214 1.376.375 2.594 1.32 2.722q.081.01.162.011c.885 0 1.73-.974 1.93-2.267M5.69 12.918c.816-.352 1.054-1.719.536-3.052C5.79 8.742 4.955 8 4.217 8q-.211 0-.407.082c-.816.352-1.054 1.719-.536 3.052C3.71 12.258 4.545 13 5.283 13q.211 0 .407-.082"/>
              </svg>
              <span>{parsePetType(pet.petType)}</span>
            </li>

            <li className="flex items-center gap-2 text-xs text-gray-700 font-medium rounded-4xl px-2 py-2 border border-amber-50 bg-[#fef3c676]">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-amber-600" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
                <path d="M4 7a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2zm12-4v4M8 3v4m-4 4h16m-9 4h1m0 0v3"/>
              </svg>
              <span>{parsePetAge(pet.age)}</span>
            </li>

            {/* Chip de recompensa */}
            {pet.reward && (
              <li className="flex items-center gap-2 text-xs font-medium rounded-4xl px-2 py-2 border border-amber-200 bg-amber-100 text-amber-800">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
                  <path d="M12 2v4m0 12v4M6.3 17.7l-2.8 2.8M17.7 6.3l2.8-2.8M17.7 17.7l2.8 2.8M6.3 6.3l-2.8-2.8M20 12h4M4 12h4m4 4a4 4 0 1 0 0-8a4 4 0 0 0 0 8"/>
                </svg>
                <span>Recompensa: {pet.reward}</span>
              </li>
            )}
          </ul>

          {/* Información de contacto */}
          <div className="mt-auto pt-2 ">
            <p className="text-sm text-gray-600 flex items-center gap-2">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
                <path d="M22 16.92v3a2 2 0 0 1-2.18 2a19.79 19.79 0 0 1-8.63-3.07a19.5 19.5 0 0 1-6-6a19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72a12.84 12.84 0 0 0 .7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45a12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/>
              </svg>
              Número: {pet.contactPhone || 'No especificado'}
            </p>
            {
              pet.contactEmail &&
              <p className="text-sm text-gray-600 flex items-center gap-2">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 24 24"><path fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 8l7.89 5.26a2 2 0 0 0 2.22 0L21 8M5 19h14a2 2 0 0 0 2-2V7a2 2 0 0 0-2-2H5a2 2 0 0 0-2 2v10a2 2 0 0 0 2 2"/></svg>
                Correo: {pet.contactEmail || 'No especificado'}
              </p>
            }
          </div>
        </div>
      </div>
    </a>
  )
}