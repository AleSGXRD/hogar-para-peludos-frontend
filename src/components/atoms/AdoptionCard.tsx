import type { Pet } from '~/lib/types/Pet'
import { parsePetType, parsePetAge } from '../../lib/helpers/PetHelper'

interface Props {
  pet: Pet
}

export default function AdoptionCard({ pet }: Props) {
  return (
    <a
      href={`/pet/${pet.id}`}
      className="group block h-full transition-all hover:scale-[1.02] active:scale-[0.98] relative"
    >
      <div className="h-full rounded-xl  hover:shadow-lg transition-all bg-transparent hover:bg-gray-100  overflow-hidden hover:border border-gray-100 flex flex-col">
        
        {/* Imagen */}
        <div className="relative overflow-hidden aspect-video h-[200px]">
          <img
            alt={`${pet.petName} - ${parsePetType(pet.petType)}`}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
            loading="lazy"
            width={400}
            height={400}
            // src={pet.imageUrl ?? 'https://ptqxhogmwecyueleyhbn.supabase.co/storage/v1/object/public/hogar-para-peludos/adopcion/prueba%20img.jpg'}
            src='/panda.jpg'
          />
        </div>

        {/* Contenido */}
        <div className="p-4 flex flex-col gap-3 flex-1 ">
          
          {/* Encabezado */}
          <div className="flex items-center justify-between">
            <div>
              <h3 className="font-bold text-xl text-gray-800 line-clamp-1">{pet.petName}</h3>
              <p className="text-xs text-gray-500">
                {new Date(pet.createdAt).toLocaleDateString('es-ES', {
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

          {/* Características */}
          <ul className="flex flex-wrap gap-2">
            <li className="flex items-center gap-2 text-xs text-gray-700 font-medium rounded-4xl px-2 py-2 border border-lime-50 bg-[#ecfcca76]">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-lime-600" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
                <path d="M14.7 13.5c-1.1-2-1.441-2.5-2.7-2.5s-1.736.755-2.836 2.747c-.942 1.703-2.846 1.845-3.321 3.291c-.097.265-.145.677-.143.962c0 1.176.787 2 1.8 2c1.259 0 3-1 4.5-1s3.241 1 4.5 1c1.013 0 1.8-.823 1.8-2c0-.285-.049-.697-.146-.962c-.475-1.451-2.512-1.835-3.454-3.538m5.488-5.418A1 1 0 0 0 19.782 8h-.015c-.735.012-1.56.75-1.993 1.866c-.519 1.335-.28 2.7.538 3.052q.196.082.406.082c.739 0 1.575-.742 2.011-1.866c.516-1.335.273-2.7-.54-3.052zM9.474 9c.055 0 .109 0 .163-.011c.944-.128 1.533-1.346 1.32-2.722C10.754 4.97 9.91 4 9.025 4c-.055 0-.109 0-.163.011c-.944.128-1.533 1.346-1.32 2.722C7.746 8.026 8.59 9 9.475 9zm6.982-2.267c.214-1.376-.375-2.594-1.32-2.722A1 1 0 0 0 14.974 4c-.885 0-1.728.97-1.93 2.267c-.214 1.376.375 2.594 1.32 2.722q.081.01.162.011c.885 0 1.73-.974 1.93-2.267M5.69 12.918c.816-.352 1.054-1.719.536-3.052C5.79 8.742 4.955 8 4.217 8q-.211 0-.407.082c-.816.352-1.054 1.719-.536 3.052C3.71 12.258 4.545 13 5.283 13q.211 0 .407-.082"/>
              </svg>
              <span>{parsePetType(pet.petType)}</span>
              {/* {pet.breed && <span className="text-gray-500">· {pet.breed}</span>} */}
            </li>

            <li className="flex items-center gap-2 text-xs text-gray-700 font-medium rounded-4xl px-2 py-2 border border-blue-50 bg-[#dbeafe76]">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-blue-600" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
                <path d="M12 18.5L9 17l-6 3V7l6-3l6 3l6-3v7.5M9 4v13m6-10v5.5m6.121 7.621a3 3 0 1 0-4.242 0Q17.506 20.749 19 22q1.577-1.335 2.121-1.879M19 18v.01"/>
              </svg>
              <span className="line-clamp-1">{pet.province}</span>
            </li>

            <li className="flex items-center gap-2 text-xs text-gray-700 font-medium rounded-4xl px-2 py-2 border border-amber-50 bg-[#fef3c676]">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-amber-600" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
                <path d="M4 7a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2zm12-4v4M8 3v4m-4 4h16m-9 4h1m0 0v3"/>
              </svg>
              <span>{parsePetAge(pet.age)}</span>
            </li>
          </ul>

        </div>
      </div>
    </a>
  )
}
