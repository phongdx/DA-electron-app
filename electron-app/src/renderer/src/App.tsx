import { useDispatch, useSelector } from 'react-redux'
import { AppDispatch, RootState } from './redux/store'
import { useState } from 'react'
import { fetchProducts } from './redux/products/productSlice'

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
      <div style={{ padding: 20 }}>
        <button onClick={() => dispatch(fetchProducts())} disabled={loading}>
          {loading ? 'Loading...' : 'Fetch'}
        </button>
        {error && <p style={{ color: 'red' }}>{error}</p>}
        <input
          placeholder="Search by name or SKU"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          style={{ marginLeft: 10 }}
        />
        <ul>
          {filteredProducts.map((p) => (
            <li key={p.sku}>
              <strong>{p.name}</strong> — {p.sku} — {Number(p.price.amount).toFixed(2)}{' '}
              {p.price.currencyCode}
            </li>
          ))}
        </ul>
      </div>
    </>
  )
}

export default App
