// src/components/Sidebar.tsx
import { useStore } from '@nanostores/preact';
import { isSidebarOpen } from '../../lib/stores/sidebarStore';

export default function Sidebar(){
  const $isSidebarOpen = useStore(isSidebarOpen);

  return (
    <aside
      className={`fixed top-0 left-0 h-full w-64 bg-gray-900 text-white p-4 
                 transform transition-transform duration-300 z-50
                 ${$isSidebarOpen ? 'translate-x-0' : '-translate-x-full'}`}
    >
      <button
        onClick={() => isSidebarOpen.set(false)}
        className="absolute top-4 right-4 text-white hover:text-gray-300"
      >
        ✕
      </button>
      <ul className="mt-8">
        <li className="py-2"><a href="#">Inicio</a></li>
        <li className="py-2"><a href="#">Acerca de</a></li>
        <li className="py-2"><a href="#">Contacto</a></li>
      </ul>
    </aside>
  );
}