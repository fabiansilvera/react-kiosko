import { createContext, useState, useEffect} from "react"
import { toast } from "react-toastify";
import clienteAxios from "../config/axios";

const KioscoContext = createContext();

const KioscoProvider = ({children}) => {

    const [categorias, setCategorias] = useState([]);
    const [categoriaActual, setCategoriaActual] = useState({})
    const [modal, setModal] = useState(false)
    const [producto, setProducto] = useState({})
    const [pedido, setPedido] = useState([])
    const [total, setTotal] = useState([0])

    const handleClickCategoria = id => {
        const categoria = categorias.filter(categoria => categoria.id === id)[0]
        setCategoriaActual(categoria)
    } 

    const handleClickModal = () => {
        setModal(!modal)
    } 

    const handleSetProducto = producto => {
        setProducto(producto)
    } 

    const handleAgregarPedido = ({categoria_id, ...producto}) => {

        if(pedido.some(pedidoState => pedidoState.id === producto.id)) {
            const pedidoActualizado = pedido.map( pedidoState => pedidoState.id === producto.id ? producto : pedidoState)

            setPedido(pedidoActualizado)
            toast('Guardado Correctamente', {
                position: toast.POSITION.BOTTOM_RIGHT
            })
        } else {
            setPedido([...pedido, producto])
            toast('Agregado al Pedido', {
                position: toast.POSITION.BOTTOM_RIGHT
            })
        }
    } 

    const handleEditarCantidad = id => {
        const productoActualizar = pedido.filter(producto => producto.id === id)[0]
        setProducto(productoActualizar)
        setModal(!modal)
    }

    const handleEliminarProductoPedido = id => {
        const pedidoActualizado = pedido.filter(producto => producto.id !== id)
        setPedido(pedidoActualizado)
        toast('Eliminado del Pedido', {
            position: toast.POSITION.BOTTOM_RIGHT
        })
    }

    const handleSubmitNuevaOrden = async () => {
        const token = localStorage.getItem('AUTH_TOKEN')

        try {
            const {data} = await clienteAxios.post('/api/pedidos', 
            {
                total,
                productos: pedido.map(producto => {
                    return {
                        id: producto.id,
                        cantidad: producto.cantidad
                    }
                }),

            }, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })

            toast.success(data.message, {
                position: toast.POSITION.BOTTOM_RIGHT
            });
            setPedido([]);
        } catch (error) {
            console.log(error);
        }
    }

    const handleClickCompletarPedido = async id => {
        const token = localStorage.getItem('AUTH_TOKEN')
        try {
            const {data} = await clienteAxios.put(`/api/pedidos/${id}`, null, {
            headers: {
                Authorization: `Bearer ${token}`
            }
           })

           toast.success(data.message, {
            position: toast.POSITION.BOTTOM_RIGHT
            });
        } catch (error) {
            console.log(error)
        }
    }

    const handleClickProductoAgotado = async id => {
        const token = localStorage.getItem('AUTH_TOKEN')
        try {
            const {data} = await clienteAxios.put(`/api/productos/${id}`, null, {
            headers: {
                Authorization: `Bearer ${token}`
            }
            })

           toast.success(data.message, {
            position: toast.POSITION.BOTTOM_RIGHT
            });
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        const nuevoTotal = pedido.reduce((total, producto) => (producto.precio * producto.cantidad) + total, 0)
        setTotal(nuevoTotal)
    },[pedido])

    const obtenerCategorias = async () => {
        const token = localStorage.getItem('AUTH_TOKEN')
        try {
            const {data} = await clienteAxios("/api/categorias", {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            setCategorias(data.data);
            setCategoriaActual(data.data[0])
        } catch(error) {

        }
    }

    useEffect(() => {
        obtenerCategorias();
    },[])

    return (
        <KioscoContext.Provider
            value={{
                categorias,
                categoriaActual,
                handleClickCategoria,
                modal,
                handleClickModal,
                producto,
                handleSetProducto,
                pedido,
                handleAgregarPedido,
                handleEditarCantidad,
                handleEliminarProductoPedido,
                total,
                handleSubmitNuevaOrden,
                handleClickCompletarPedido,
                handleClickProductoAgotado
            }}
        >{children}</KioscoContext.Provider>
    )
}

export {
    KioscoProvider
}
export default KioscoContext