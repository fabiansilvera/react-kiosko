import { Link } from 'react-router-dom'
import { useAuth } from "../hooks/useAuth"

export default function AdminSidebar() {

    const {logout} = useAuth({middleware: 'auth'})

  return (
    <aside className="md:w-72 h-screen">
        <div className="p-4">
            <img 
                src="/img/logo.svg" 
                alt="Imagen Logotipo"
                className="w-40 mx-auto"
            />
        </div>

        <nav className='flex flex-col p-4'>
            <Link to="/admin" className="bg-indigo-500 hover:bg-indigo-700 text-center font-bold text-lg w-full p-3 my-3 text-white" >Ordenes</Link>
            <Link to="/admin/productos" className="bg-indigo-500 hover:bg-indigo-700 text-center font-bold text-lg w-full p-3 my-3 text-white" >Productos</Link>
        </nav>

        <div className="my-5 px-5 w-full">
          <button
            type="button"
            className="text-center bg-red-500 w-full font-bold p-3 text-white truncate"
            onClick={logout}
          >Cerrar Sesión</button>
      </div>
    </aside>
  )
}
