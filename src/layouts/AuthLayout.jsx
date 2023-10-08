import { Outlet } from 'react-router-dom'

export default function AuthLayout() {
  return (
    <main className='max-w-4xl m-auto mt-12 flex flex-col md:flex-row items-center md:gap-6'>
      <img src="../img/logo.svg" alt="Logotipo empresa" className='max-w-xs' />
      
      <div className='w-full'>
        <Outlet /> 
      </div>
         
    </main>
  )
}
