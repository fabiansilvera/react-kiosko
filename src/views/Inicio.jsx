import useSWR from 'swr';
import Producto from "../components/Producto";
import useKiosco from "../hooks/useKiosco";
import clienteAxios from '../config/axios';
import { Link } from 'react-router-dom';


export default function Inicio() {

  const {categoriaActual} = useKiosco()

  //Consulta SWR
  const token = localStorage.getItem('AUTH_TOKEN')
  const fetcher = () => clienteAxios('api/productos', {
    headers: {
      Authorization: `Bearer ${token}`
    }
  }).then(data => data.data)
  const { data, error, isLoading } = useSWR('/api/productos', fetcher)
  
  if(isLoading) return 'Cargando ...'

  const productos = data.data.filter(producto => producto.categoria_id === categoriaActual.id)

  return (
    <>
      <div className='flex flex-row justify-between text-center items-center'>
        <h1 className="text-3xl font-black">{categoriaActual.nombre}</h1>
        <Link 
          to="/mis_pedidos"
          className='text-center border bg-red-500 rounded-lg'
        ><p className='font-bold text-2xl px-2 py-2'>Mis Pedidos</p></Link>
      </div>
      <p className="text-2xl my-5 text-center">
        Elige y personaliza tu pedido a continuación.
      </p>

      <div className="grid gap-4 grid-cols-1 md:grid-cols-2 xl:grid-cols-3">
        {productos.map(producto => (
          <Producto
            key={producto.imagen}
            producto={producto}
            botonAgregar={true}
          />
        ))}
      </div>
    </>
  )
}
