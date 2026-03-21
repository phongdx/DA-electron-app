import { useDispatch, useSelector } from 'react-redux'
import { AppDispatch, RootState } from './redux/store'
import { useEffect, useState } from 'react'
import { fetchProducts } from './redux/products/productSlice'
import ProductTable from './components/ProductTable'
import { Backdrop, CircularProgress } from '@mui/material'
import useDebounce from './hooks/useDebounce'

function App(): React.JSX.Element {
  const { items, loading, error } = useSelector((state: RootState) => state.products)
  const dispatch = useDispatch<AppDispatch>()
  const [searchTerm, setSearchTerm] = useState<string>('')
  const debouncedSearchTerm = useDebounce(searchTerm)

  useEffect(() => {
    dispatch(fetchProducts(debouncedSearchTerm))
  }, [debouncedSearchTerm, dispatch])

  return (
    <>
      <Backdrop sx={(theme) => ({ color: '#fff', zIndex: theme.zIndex.drawer + 1 })} open={loading}>
        <CircularProgress color="inherit" />
      </Backdrop>
      <div className="app-container">
        <div className="header">
          <button
            className="header__button"
            onClick={() => {
              dispatch(fetchProducts(''))
              setSearchTerm('')
            }}
            disabled={loading}
          >
            Fetch Product
          </button>
          {error && <p style={{ color: 'red' }}>{error}</p>}
          {items.length ? (
            <input
              placeholder="Search by name or SKU"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="header__input"
            />
          ) : null}
        </div>

        <ProductTable items={items} />
      </div>
    </>
  )
}

export default App
