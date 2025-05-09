import { useEffect, useState } from 'react'
import type { Pet } from '~/lib/types/Pet'
import AdoptionCard from '../atoms/AdoptionCard'
import LostPetCard from '../atoms/LostPetCard'

interface Props {
  pets: Pet[]
}

export default function PetGrid({ pets }: Props) {
  const [currentPage, setCurrentPage] = useState(1)
  const petsPerPage = 12


  // Resetear a página 1 cuando cambia el array de pets
  useEffect(() => {
    setCurrentPage(1)
  }, [pets])

  // Calcular mascotas a mostrar
  const indexOfLastPet = currentPage * petsPerPage
  const indexOfFirstPet = indexOfLastPet - petsPerPage
  const currentPets = pets.slice(indexOfFirstPet, indexOfLastPet)

  const totalPages = Math.ceil(pets.length / petsPerPage)

  // Generar rango de páginas para mostrar
  const getPageNumbers = () => {
    const pageNumbers = []
    const maxVisiblePages = 5 // Número máximo de páginas visibles
    
    if (totalPages <= maxVisiblePages) {
      // Mostrar todas las páginas si son pocas
      for (let i = 1; i <= totalPages; i++) {
        pageNumbers.push(i)
      }
    } else {
      // Lógica para mostrar páginas con elipsis
      const leftBound = Math.max(1, currentPage - 2)
      const rightBound = Math.min(totalPages, currentPage + 2)
      
      if (currentPage <= 3) {
        // Mostrar primeras páginas + elipsis + última
        for (let i = 1; i <= 4; i++) {
          pageNumbers.push(i)
        }
        pageNumbers.push('...')
        pageNumbers.push(totalPages)
      } else if (currentPage >= totalPages - 2) {
        // Mostrar primera + elipsis + últimas páginas
        pageNumbers.push(1)
        pageNumbers.push('...')
        for (let i = totalPages - 3; i <= totalPages; i++) {
          pageNumbers.push(i)
        }
      } else {
        // Mostrar primera + elipsis + páginas alrededor + elipsis + última
        pageNumbers.push(1)
        pageNumbers.push('...')
        for (let i = leftBound; i <= rightBound; i++) {
          pageNumbers.push(i)
        }
        pageNumbers.push('...')
        pageNumbers.push(totalPages)
      }
    }
    
    return pageNumbers
  }

  const handlePageChange = (page: number | string) => {
    if (typeof page === 'number' && page >= 1 && page <= totalPages) {
      setCurrentPage(page)
    }
  }

  return (
    <div className="flex flex-col gap-6">
      {/* Grid de mascotas */}
      <div 
        key={`page-${currentPage}`} // <- Añade esta línea
        className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8 px-4"
      >
        {currentPets.map(pet => 
          pet.reportType === 'adoption' 
            ? <AdoptionCard key={pet.id} pet={pet} />
            : <LostPetCard key={pet.id} pet={pet} />
        )}
      </div>
      
      
      {currentPets.length === 0 && (
        <div className="col-span-full text-center py-12">
          <p className="text-gray-500">No se encontraron mascotas disponibles</p>
        </div>
      )}

      {/* Paginación mejorada */}
      {currentPets.length !== 0 && (
        <div className="flex flex-col items-center gap-4 mt-6 relative">
          <div className="flex items-center gap-2">
            {/* Botón Anterior */}
            <button
              onClick={() => handlePageChange(currentPage - 1)}
              disabled={currentPage === 1}
              className="p-2 rounded-full bg-gray-50 hover:bg-teal-50 hover:text-teal-700 text-gray-800 transition-all cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
              aria-label="Página anterior"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6" viewBox="0 0 24 24">
                <path fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11 17h6l-4-5l4-5h-6l-4 5z"/>
              </svg>
            </button>

            {/* Números de página */}
            <div className="flex items-center gap-1">
              {getPageNumbers().map((page, index) => (
                <button
                  key={index}
                  onClick={() => typeof page === 'number' && handlePageChange(page)}
                  className={`w-10 h-10 rounded-full flex items-center justify-center transition-all cursor-pointer ${
                    page === currentPage
                      ? 'bg-[#96f7e479]  shadow-md text-gray-800'
                      : typeof page === 'number'
                        ? 'bg-[#f9fafb] hover:bg-teal-50 hover:text-teal-700 text-gray-800'
                        : 'cursor-default'
                  }`}
                  disabled={page === '...' || page === currentPage}
                  aria-label={typeof page === 'number' ? `Ir a página ${page}` : undefined}
                >
                  {page}
                </button>
              ))}
            </div>

            {/* Botón Siguiente */}
            <button
              onClick={() => handlePageChange(currentPage + 1)}
              disabled={currentPage === totalPages}
              className="p-2 rounded-full bg-gray-50 hover:bg-teal-50 hover:text-teal-700 text-gray-800 transition-all cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
              aria-label="Página siguiente"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6" viewBox="0 0 24 24">
                <path fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 7H7l4 5l-4 5h6l4-5z"/>
              </svg>
            </button>
          </div>

          {/* Contador de páginas */}
          <div className="text-sm text-gray-500">
            Mostrando {indexOfFirstPet + 1}-{Math.min(indexOfLastPet, pets.length)} de {pets.length} mascotas
          </div>
        </div>
      )}
    </div>
  )
}