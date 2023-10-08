import { Link } from "react-router-dom";
import useSWR from "swr"
import clienteAxios from "../config/axios"
import { formatearDinero } from "../helpers"

export default function Pedidos() {
  const token = localStorage.getItem('AUTH_TOKEN')
  const fetcher = () => clienteAxios('/api/pedidos/mis_pedidos', {
    headers: {
      Authorization: `Bearer ${token}`
    }
  })

  const {data, error, isLoading} = useSWR('/api/pedidos/mis_pedidos', fetcher, {refreshInterval: 5000})

  if(isLoading) return 'cargando...';

  return (
    <div>
      <div className='flex flex-row justify-between text-center items-center pb-10'>
        <h1 className="text-3xl font-black">Pedidos</h1>
        <Link 
          to="/"
          className='text-center border bg-red-500 rounded-lg'
        ><p className='font-bold text-2xl px-2 py-2'>Hacer Pedido</p></Link>
      </div>


    <div className="grid grid-cols-2 gap-5">
        {data.data.data.map(pedido => (
          <div key={pedido.id} className="p-5 shadow bg-white space-y-2 border-b">
            <p className="text-xl font-bold text-slate-600">
              Contenido del Pedido:
            </p>

            {pedido.productos.map(producto => (
              <div
                key={producto.id}
                className="border-b border-b-slate-200 last-of-type:border-none py-4"
              >
                <p>{producto.nombre}</p>
                <p>
                  Cantidad: {''}
                  <span className="font-bold">{producto.pivot.cantidad}</span>
                </p>
              </div>
            ))}

            <p className="text-lg font-bold text-amber-600">
              Total a Pagar: {''}
              <span className="font-normal text-slate-600">{formatearDinero(pedido.total)}</span>
            </p>

            <p className="text-lg font-bold text-amber-600">
              Estado: {''}
            </p>
          </div>
        ))}
      </div>
    </div>

    
  )
}
