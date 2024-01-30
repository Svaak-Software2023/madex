import { useEffect, useState } from 'react'
import './App.css'
import Header from './components/header/Header'
import LeftMenu from './components/leftMenu/LeftMenu'
import { Route, Routes, useLocation } from 'react-router-dom'
import UserRoutes from './routes/User.Routes'
import { useDispatch, useSelector } from 'react-redux'
import { setUser } from './redux/featurs/authSlice'
// import AdminRouting from './Admin/AdminRouting'
import PrivateRoute from './auth/PrivateRoute'
import { setmenu } from './utils/globalFunction/GlobalFunctionSlice'

function App() {
  // const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const dispatch=useDispatch();
  const isSidebarOpen=useSelector((state)=>state.globalFunction.isMenuOpen);
  const { pathname } = useLocation()

  useEffect(() => {
    window.scrollTo(0, 0)
    // setIsSidebarOpen(false);
  }, [pathname])

  const openSidebar = () => {
    dispatch(setmenu(!isSidebarOpen));
    console.log("called:",isSidebarOpen);
  };

  // set login user value

  const user = JSON.parse(localStorage.getItem('accessToken'))
  useEffect(() => {
    dispatch(setUser(user&&user.user))
  })

  return (
    <>
      
      <Header toggle={openSidebar} />
      <div className="main">
        <LeftMenu data={isSidebarOpen} />

        <div style={{ width: isSidebarOpen ? '80%' : '100%' }}>
          <Routes>
            {UserRoutes.map((item, index) => (
              item.isPrivate?
              <Route key={index} path={item.path} element={<PrivateRoute>{item.element}</PrivateRoute>} />
             : <Route key={index} path={item.path} element={item.element} />
            ))}
          </Routes>
          {/* <AdminRouting/> */}
        </div>
      </div>
    </>
  )
}

export default App
