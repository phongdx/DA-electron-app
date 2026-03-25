import { useEffect, useRef, useState } from 'react'

interface Item {
  id: number
  label: string
  color: string
}
const ProductReordering = () => {
  const initialItems = [
    { id: 1, label: 'A', color: '#e74c3c' },
    { id: 2, label: 'B', color: '#3498db' },
    { id: 3, label: 'C', color: '#2ecc71' },
    { id: 4, label: 'D', color: '#f1c40f' },
    { id: 5, label: 'E', color: '#9b59b6' }
  ]
  const [items, setItems] = useState<Item[]>(initialItems)
  const containerRef = useRef<HTMLDivElement | null>(null)

  const [dragItemId, setDragItemId] = useState<number | null>(null)
  const [xPosition, setXPosition] = useState<number>(0)
  const [dragDistance, setDragDistance] = useState<number>(0)

  const handleMouseDown = (id: number, e: React.MouseEvent) => {
    setDragItemId(id)
    setXPosition(e.clientX)
  }

  useEffect(() => {
    const handleMove = (e: MouseEvent) => {
      if (dragItemId === null) return
      setDragDistance(e.clientX - xPosition)
      //setXPosition(e.clientX)
      const mousePosition = e.clientX
      setItems((prev) => {
        const draggedIndex = prev.findIndex((i) => i.id === dragItemId)
        const newItems = [...prev]

        const container = containerRef.current
        if (!container) return prev
        const children = container.children

        if (draggedIndex > 0) {
          const leftItem = children[draggedIndex - 1].getBoundingClientRect()
          const leftItemCenter = leftItem.left + leftItem.width / 2

          if (mousePosition < leftItemCenter) {
            const [dragItem] = newItems.splice(draggedIndex, 1)
            newItems.splice(draggedIndex - 1, 0, dragItem)
            setXPosition(e.clientX)
            setDragDistance(0)
            return newItems
          }
        }

        if (draggedIndex < newItems.length - 1) {
          const rightItem = children[draggedIndex + 1].getBoundingClientRect()
          const rightItemCenter = rightItem.left + rightItem.width / 2

          if (mousePosition > rightItemCenter) {
            const [dragItem] = newItems.splice(draggedIndex, 1)
            newItems.splice(draggedIndex + 1, 0, dragItem)
            setXPosition(e.clientX)
            setDragDistance(0)
            return newItems
          }
        }
        return prev
      })
    }

    const handleUp = () => {
      setDragItemId(null)
      setDragDistance(0)
    }

    window.addEventListener('mousemove', handleMove)
    window.addEventListener('mouseup', handleUp)

    return () => {
      window.removeEventListener('mousemove', handleMove)
      window.removeEventListener('mouseup', handleUp)
    }
  }, [dragItemId, xPosition])

  return (
    <div ref={containerRef} className="product-reordering">
      {items.map((item: Item) => {
        const isDragging = item.id === dragItemId
        return (
          <div
            className="item"
            style={{
              background: item.color,
              opacity: isDragging ? 0.5 : 1,
              transform: isDragging ? `translateX(${dragDistance}px)` : 'none',
              transition: isDragging ? 'none' : 'transform 0.2s'
            }}
            onMouseDown={(e) => handleMouseDown(item.id, e)}
          >
            {item.label}
          </div>
        )
      })}
    </div>
  )
}

export default ProductReordering
