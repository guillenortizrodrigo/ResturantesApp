import React from 'react'
import "./LoginAdmin.scss"
import LoginForm from './LoginForm'
export default function LoginAdmin() {
  return (
    <div className='login-admin'>
      <div className="login-admin__content">
        <h1>Inicio de Sesion</h1>
        <LoginForm/>
      </div>
    </div>
  )
}
