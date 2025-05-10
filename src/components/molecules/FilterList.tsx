import { useState } from 'react'
import type { Pet } from '../../lib/types/Pet'
import PetGrid from './PetGrid'
import { CustomSelect, genderIcons } from '../atoms/selects/CustomSelect'

interface Props {
  list: Pet[]
}

export default function FilterList({ list }: Props) {
  const [searchTerm, setSearchTerm] = useState('')
  const [cityFilter, setCityFilter] = useState('')
  const [sexFilter, setSexFilter] = useState('') // 'male' | 'female' o similar, depende cómo lo tengas en tu modelo

  const filteredList = list.filter(pet => {
    const term = searchTerm.toLowerCase()
    const matchesSearch = (
      pet.petName.toLowerCase().includes(term) ||
      (pet.breed && pet.breed.toLowerCase().includes(term)) ||
      (pet.description && pet.description.toLowerCase().includes(term))
    )

    const matchesCity = cityFilter ? pet.province?.toLowerCase() === cityFilter.toLowerCase() : true
    const matchesSex = sexFilter ? pet.sex?.toLowerCase() === sexFilter.toLowerCase() : true

    return matchesSearch && matchesCity && matchesSex
  })
  const genderOptions = [
    { value: 'male', label: 'Macho' },
    { value: 'female', label: 'Hembra' }
  ];
  // Para sacar las ciudades únicas automáticamente
  const uniqueCities = Array.from(new Set(list.map(pet => pet.province).filter(Boolean)))

  const cityOptions = uniqueCities.map(city => ({
    value: city,
    label: city
  }));

  return (
    <div>
      <div className="flex flex-wrap gap-4 mb-6 px-2 md:px-0">
        {/* Buscador */}
        <div className="relative w-full md:w-auto">
          <input
            type="text"
            placeholder="Buscar mascota..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="bg-gray-50 transition-all shadow-md border border-gray-100 rounded-lg px-4 py-2 pl-10 focus:border-[#76ca99]
              min-w-80 focus:outline-[#76ca99] w-full md:w-auto 
              appearance-none"
          />
          <svg className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" 
            xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clipRule="evenodd" />
          </svg>
        </div>
        <div className="flex items-center justify-center flex-wrap w-full md:w-auto gap-4">
          {/* Filtro de ciudad - Estilo mejorado */}
          <CustomSelect
            options={cityOptions}
            value={cityFilter}
            onChange={setCityFilter}
            placeholder="Todas las ciudades"
          />

          {/* Filtro de sexo - Con iconos */}
          <CustomSelect
            options={genderOptions}
            value={sexFilter}
            onChange={setSexFilter}
            placeholder="Todos los sexos"
            icons={genderIcons}
          />
        </div>
      </div>

      {!list && (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {[...Array(8)].map((_, idx) => (
            <div key={idx} className="h-80 bg-gray-100 rounded-xl animate-pulse"></div>
          ))}
        </div>
      )}

      <PetGrid pets={filteredList}/>

    </div>
  )
}
