import { useAuth } from "../hooks/useAuth"
import useKiosco from "../hooks/useKiosco"
import Categoria from "./Categoria"


export default function Sidebar() {

  const { categorias } = useKiosco()
  const {logout , user} = useAuth({middleware: 'auth'})

  return (
    <aside className="md:w-72 flex flex-col items-center">
      <div className="pt-4">
        <img 
          className="w-40"
          src="img/logo.svg"
          alt="Logotipo" 
        />
      </div>

      <p className="mt-6 font-bold text-xl">Hola: {user?.name}</p>

      <div className="mt-5 w-full">
        {categorias.map( categoria => (
          <Categoria 
            key={categoria.id}
            categoria={categoria}
          />
        ))}
      </div>

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
