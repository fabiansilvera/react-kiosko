import { formatearDinero } from "../helpers"
import useKiosco from "../hooks/useKiosco"

export default function Producto({producto, botonAgregar = false}) {

    const { handleClickModal, handleSetProducto, handleClickProductoAgotado } = useKiosco()
    const {nombre, imagen, precio, disponible} = producto
    let botonDisponible = true;
    if(disponible == 0) {
        botonDisponible = false;
    }

  return (
    <div className="border p-3 shadow bg-white">
        <img 
            src={`/img/${imagen}.jpg`}
            alt={`imagen ${nombre}`} 
            className="w-full"
        />

        <div className="p-5">
            <h3 className="text-2xl font-bold">{nombre}</h3>
            <p className="mt-5 font-black text-4xl text-amber-500">{formatearDinero(precio,)}</p>

            {botonAgregar && (
            <button
                type="button"
                className="bg-indigo-600 hover:bg-indigo-800 text-white w-full mt-5 p-3 uppercase font-bold"
                onClick={() => {
                    handleClickModal();
                    handleSetProducto(producto);
                }}
            >Agregar</button>
            )}

            {!botonAgregar && !botonDisponible && (
                <button
                    type="button"
                    className="bg-indigo-600 hover:bg-indigo-800 text-white w-full mt-5 p-3 uppercase font-bold"
                    onClick={() => {handleClickProductoAgotado(producto.id)}}
                >Habilitar Producto</button>
            )}

            {botonDisponible && !botonAgregar &&(
                <button
                    type="button"
                    className="bg-gray-500 hover:bg-gray-700 text-white w-full mt-5 p-3 uppercase font-bold"
                    onClick={() => {handleClickProductoAgotado(producto.id)}}
                >Agotar Producto</button>
            )}
        </div>
    </div>
  )
}
