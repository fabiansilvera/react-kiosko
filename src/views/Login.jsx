import { createRef, useState } from "react";
import { Link } from "react-router-dom";
import Alerta from "../components/Alerta";
import { useAuth } from "../hooks/useAuth";

export default function Login() {

  const emailRef = createRef();
  const passwordRef = createRef();

  const [errores, setErrores] = useState([])
  const [cargando, setCargando] = useState(false);

  const {login} = useAuth({
    middleware: 'guest',
    url: '/'
  })

  const handleSubmit = async e => {
    e.preventDefault();
    const datos = {
      email: emailRef.current.value,
      password: passwordRef.current.value
    }
    setCargando(true); // Establece el estado de cargando en true
    await login(datos, setErrores);
    setCargando(false); // Establece el estado de cargando en false
  }
  return (
    <>
      <h1 className="text-4xl font-bold mt-5 md:mt-0 text-center">Iniciar Sesión</h1>
      <p className="text-center">Para crear un pedido debes iniciar sesión</p>

      <div className="bg-orange-400 shadow-lg rounded-md mt-5 px-5 py-5 font-bold">
        <form 
            onSubmit={handleSubmit}
            noValidate
            autoComplete="off"
          >
            {errores ? errores.map((error, i) => <Alerta key={i}>{error}</Alerta>) : null }

          <div className="mb-4">
            <label 
              htmlFor="email"
              className="text-slate-800"

            >Email:</label>
            <input 
              type="email"
              id="email"
              className="mt-2 w-full p-3 bg-gray-50 rounded-md"
              name="email"
              placeholder="Tu Email"
              ref={emailRef}
            />
          </div>

          <div className="mb-4">
            <label 
              htmlFor="password"
              className="text-slate-800"

            >Password:</label>
            <input 
              type="password"
              id="password"
              className="mt-2 w-full p-3 bg-gray-50 rounded-md"
              name="password"
              placeholder="Tu password"
              ref={passwordRef}
            />
          </div>

          <input 
            type="submit"
            value={cargando ? "Cargando..." : "Iniciar Sesión"} // Cambia el texto del botón mientras se carga
            disabled={cargando} // Deshabilita el botón mientras se carga
            className="bg-indigo-600 hover:bg-indigo-800 text-white w-full mt-5 p-3 cursor-pointer uppercase font-bold rounded-lg"
          />
        </form>
      </div>

      <nav className='mt-5 text-center font-bold'>
        <Link to="/auth/registro">
          ¿No tienes cuenta? Crea una
        </Link>
      </nav>
    </>
  )
}
