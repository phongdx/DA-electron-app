import { useDispatch, useSelector } from 'react-redux'
import { AppDispatch, RootState } from './redux/store'
import { useState } from 'react'
import { fetchProducts } from './redux/products/productSlice'
import ProductTable from './components/ProductTable'
import { Backdrop, CircularProgress } from '@mui/material'

function App(): React.JSX.Element {
  const { items, loading, error } = useSelector((state: RootState) => state.products)
  const dispatch = useDispatch<AppDispatch>()
  const [searchTerm, setSearchTerm] = useState<string>('')
  const filteredProducts = items.filter(
    (p) =>
      p.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      p.sku.toLowerCase().includes(searchTerm.toLowerCase())
  )
  return (
    <>
      <Backdrop sx={(theme) => ({ color: '#fff', zIndex: theme.zIndex.drawer + 1 })} open={loading}>
        <CircularProgress color="inherit" />
      </Backdrop>
      <div className="app-container">
        <div className="header">
          <button
            className="header__button"
            onClick={() => dispatch(fetchProducts())}
            disabled={loading}
          >
            Fetch Product
          </button>
          {error && <p style={{ color: 'red' }}>{error}</p>}
          <input
            placeholder="Search by name or SKU"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="header__input"
          />
        </div>

        <ProductTable items={filteredProducts} />
      </div>
    </>
  )
}

export default App
