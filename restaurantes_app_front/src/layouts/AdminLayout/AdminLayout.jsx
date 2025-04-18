import React from 'react'
import LoginAdmin from '../../pages/Admin/LoginAdmin/LoginAdmin';
import { AuthContext } from '../../context/AuthContext';
import { useAuth } from '../../hooks/useAuth';
import TopMenu from './Components/TopMenu/TopMenu';
import SideMenu from './Components/SideMenu/SideMenu';
import './AdminLayout.scss'


export default function AdminLayout(props) {
  const { auth } = useAuth(AuthContext);

  const { children } = props;

  if (auth == null) return <LoginAdmin />

  return (
    <div className="admin-layout">
      <div className="admin-layout__menu">
        <TopMenu/>
      </div>
      <div className="admin-layout__sidemenu">
        <SideMenu/>
      </div>
      <div className="admin-layout__main-content">
        {children}
      </div>
    </div>
  )
}
