import { Outlet, useNavigate, useLocation } from 'react-router-dom'

const navItems = [
  { label: 'Product List', path: '/products' },
  { label: 'Product Display', path: '/display' },
  { label: 'Drag & Drop', path: '/drag' }
]

export default function MainLayout() {
  const navigate = useNavigate()
  const location = useLocation()
  return (
    <div className="main-layout">
      <nav id="sidenav">
        <h2>My App</h2>

        {navItems.map((item) => {
          const isActive = location.pathname === item.path

          return (
            <div
              key={item.path}
              onClick={() => navigate(item.path)}
              className="path"
              style={{
                background: isActive ? '#333' : 'transparent'
              }}
            >
              {item.label}
            </div>
          )
        })}
      </nav>

      <div>
        <Outlet />
      </div>
    </div>
  )
}
