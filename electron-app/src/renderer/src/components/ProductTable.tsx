import { DataGrid, GridColDef } from '@mui/x-data-grid'
import { Product } from '../redux/products/productTypes'

type Props = {
  items: Product[]
}
const ProductTable = ({ items }: Props) => {
  const translateHeaderName = (key: string) => {
    switch (key) {
      case 'name':
        return 'Product Name'
      case 'price':
        return 'Price'
      case 'sku':
        return 'SKU'
      default:
        return key
    }
  }
  const columns: GridColDef[] = items.length
    ? Object.keys(items[0])
        .filter((key) => key !== 'id')
        .map((key: string) => {
          return {
            field: key,
            headerName: translateHeaderName(key),
            editable: false,
            flex: key === 'price' ? 0.5 : 1,
            sortable: false,
            valueFormatter: (value: any) => {
              if (key === 'price') {
                const { amount, currencyCode } = value
                return `${amount} ${currencyCode}`
              }
              return value
            }
          }
        })
    : []
  return (
    <div>
      <DataGrid
        rows={items}
        columns={columns}
        style={{ height: '85vh', width: '100%' }}
        autoHeight={false}
      />
    </div>
  )
}

export default ProductTable
