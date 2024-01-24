import React from 'react'
import { Route, Routes } from 'react-router-dom'
import AdminRoutes from '../routes/Admin.Routes'
import AdminAuth from './auth/AdminAuth'

function AdminRouting() {
    return (
        <>
            <Routes>
                <Route path='/admin' element={<AdminAuth />}>
                    {AdminRoutes.map((item, index) => (
                        <Route key={index} path={item.path} element={item.element} />
                    ))}
                </Route>
            </Routes>
        </>
    )
}

export default AdminRouting