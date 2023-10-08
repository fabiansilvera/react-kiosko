import useKiosco from "../hooks/useKiosco"


export default function Categoria({categoria}) {

    const {handleClickCategoria, categoriaActual} = useKiosco() 
    const {icono, id, nombre} = categoria
    
  return (
    <button 
          type="button"
          onClick={() => handleClickCategoria(id)}
          className={`${categoriaActual.id === id ? "bg-amber-400" : "bg-white"} flex items-center gap-4 border w-full p-3 hover:bg-amber-400 cursor-pointer`}
          >
        <img 
          src={`/img/icono_${icono}.svg`}
          alt="Imagen Icono" 
          className="w-12"
        />

       <p className="text-lg font-bold text-center w-full">{nombre}</p>
    </button>
  )
}
