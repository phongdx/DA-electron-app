export interface Product {
  id: string
  name: string
  price: {
    amount: string
    currencyCode: string
  }
  sku: string
}
