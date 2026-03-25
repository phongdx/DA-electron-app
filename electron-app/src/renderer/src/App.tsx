import { HashRouter, Route, Routes } from 'react-router-dom'
import ProductList from './components/ProductList'
import ProductDisplay from './components/ProductDisplay'
import ProductReordering from './components/ProductReordering'
import MainLayout from './layout/Main'

function App(): React.JSX.Element {
  return (
    <HashRouter>
      <Routes>
        <Route element={<MainLayout />}>
          <Route index element={<ProductList />} />
          <Route path="/products" element={<ProductList />} />
          <Route path="/display" element={<ProductDisplay />} />
          <Route path="/drag" element={<ProductReordering />} />
        </Route>
      </Routes>
    </HashRouter>
  )
}

export default App
