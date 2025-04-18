import React from 'react'
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import routes from './routes';


export default function Navigation() {
  return (
    <Router>
      <Routes>
        {routes.map((route, index) => (
          <Route
            key={index}
            path={route.path}
            element={
              <route.layout>
                <route.component />
              </route.layout>
            }
          />
        ))}
      </Routes>
    </Router>
  )
}
