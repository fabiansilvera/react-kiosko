import { formatearDinero } from "../helpers";
import useKiosco from "../hooks/useKiosco"
import ResumenProducto from "./ResumenProducto";
import { useState } from "react";
import {useNavigate} from 'react-router-dom'

export default function Resumen() {
  const {pedido, total, handleSubmitNuevaOrden} = useKiosco();
  const navigate = useNavigate();

  const comprobarPedido = () => pedido.length === 0;
  const [cargando, setCargando] = useState(false);

  const handleSubmit = async e => {
    e.preventDefault();
    setCargando(true); // Establece el estado de cargando en true
    await handleSubmitNuevaOrden()
    setCargando(false); // Establece el estado de cargando en false
    setTimeout(() => {
      navigate('/mis_pedidos')
    }, 1000)
  }

  return (
    <aside className="w-72 h-screen overflow-y-scroll p-5">

      <h1 className="text-2xl font-black">Mi Pedido</h1>

      <div className="pt-2">
        {pedido.length === 0 ? (
            <p className="text-center text-2xl">No hay elementos en tu pedido aun</p>
        ) : (
            pedido.map(producto => (
              <ResumenProducto 
                key={producto.id}
                producto={producto}
              />
            ))
        )}
      </div>

      <p className="text-xl mt-2">
        Total: {formatearDinero(total)}
      </p>
      
      <form 
        className="w-full"
        onSubmit={handleSubmit}
      >
        <div className="mt-5">
          <input 
            disabled={cargando && comprobarPedido()} // Deshabilita el botón mientras se carga
            type="submit" 
            className={`${comprobarPedido() ?
              'bg-indigo-100' :
              'bg-indigo-600 hover:bg-indigo-800 cursor-pointer'} 
              px-5 py-2 rounded font-bold text-white text-center w-full`}
            value={cargando ? "Cargando..." : "Confirmar Pedido"} // Cambia el texto del botón mientras se carga
          />
        </div>
      </form>
    </aside>
  )
}
