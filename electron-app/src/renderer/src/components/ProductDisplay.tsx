import { useEffect, useRef, useState } from 'react'
import ChasisImage from '../assets/alpha-omicron-asset/Chasis-1000x1000.webp'
import KnobImage from '../assets/alpha-omicron-asset/Knob-189x189.webp'
import LEDOnImage from '../assets/alpha-omicron-asset/LED-On-119x119.webp'
import LEDOffImage from '../assets/alpha-omicron-asset/LED-Off-119x119.webp'
import PushButtonOn from '../assets/alpha-omicron-asset/Push-Button-On-134x134.webp'
import PushButtonOff from '../assets/alpha-omicron-asset/Push-Button-Off-134x134.webp'
import ActuatorOn from '../assets/alpha-omicron-asset/Actuator-On-166x166.webp'
import ActuatorOff from '../assets/alpha-omicron-asset/Actuator-Off-166x166.webp'

type Layout = 'mobile' | 'tablet' | 'laptop'
interface ImageRect {
  x: number
  y: number
  size: number
}
type KnobName = 'level' | 'blend' | 'mod' | 'drive'

const layouts = {
  mobile: 345,
  tablet: 748,
  laptop: 1000
}

const knobs: Record<KnobName, ImageRect> = {
  level: { x: 245, y: 260, size: 189 },
  blend: { x: 245, y: 85, size: 189 },
  mod: { x: 565, y: 85, size: 189 },
  drive: { x: 565, y: 260, size: 189 }
}

// const knob: ImageRect = {
//   x: 245,
//   y: 260,
//   size: 189
// }
const led: ImageRect = {
  x: 435,
  y: 410,
  size: 119
}
const growlButton: ImageRect = {
  x: 275,
  y: 445,
  size: 134
}
const biteButton: ImageRect = {
  x: 595,
  y: 445,
  size: 134
}
const actuator: ImageRect = {
  x: 435,
  y: 815,
  size: 134
}
const BASE_SIZE = 1000

const ProductDisplay = () => {
  const [layout, setLayout] = useState<Layout>('mobile')
  const [ledOn, setLedOn] = useState<boolean>(false)
  const [levelOn, setLevelOn] = useState<boolean>(false)
  const [driveOn, setDriveOn] = useState<boolean>(false)
  const [actuatorOn, setActuatorOn] = useState<boolean>(false)
  const [knobsRotation, setKnobsRotation] = useState<Record<KnobName, number>>({
    level: 0,
    blend: 0,
    mod: 0,
    drive: 0
  })
  const [activeKnob, setActiveKnob] = useState<KnobName | null>(null)
  const knobRefs = useRef<Record<KnobName, HTMLImageElement | null>>({
    level: null,
    blend: null,
    mod: null,
    drive: null
  })

  const scale = layouts[layout] / BASE_SIZE

  const calculateAngle = (e: MouseEvent) => {
    if (!activeKnob) return

    const knobRef = knobRefs.current[activeKnob]
    if (!knobRef) return

    const knobRect = knobRef.getBoundingClientRect()
    const centerX = knobRect.left + knobRect.width / 2
    const centerY = knobRect.top + knobRect.height / 2

    const adjacent = e.clientX - centerX
    const opposite = e.clientY - centerY

    return (Math.atan2(opposite, adjacent) * 180) / Math.PI
  }

  useEffect(() => {
    const handleMove = (e: MouseEvent) => {
      if (!activeKnob) return
      const angle = calculateAngle(e)
      setKnobsRotation((prev) => ({
        ...prev,
        [activeKnob]: angle
      }))
    }

    const handleUp = () => setActiveKnob(null)

    window.addEventListener('mousemove', handleMove)
    window.addEventListener('mouseup', handleUp)

    return () => {
      window.removeEventListener('mousemove', handleMove)
      window.removeEventListener('mouseup', handleUp)
    }
  }, [activeKnob])

  return (
    <div className="product-display">
      <div className="button-container">
        <button onClick={() => setLayout('mobile')}>Mobile</button>
        <button onClick={() => setLayout('tablet')}>Tablet</button>
        <button onClick={() => setLayout('laptop')}>Laptop</button>
      </div>
      <div
        className="product-container"
        style={{
          width: layouts[layout]
        }}
      >
        <img
          src={ChasisImage}
          style={{
            width: '100%',
            display: 'block'
          }}
        />
        {Object.entries(knobs).map(([key, config]) => {
          const knobName = key as KnobName
          return (
            <img
              key={knobName}
              ref={(el) => {
                knobRefs.current[knobName] = el
              }}
              src={KnobImage}
              draggable={false}
              onMouseDown={() => setActiveKnob(knobName)}
              style={{
                position: 'absolute',
                left: config.x * scale,
                top: config.y * scale,
                width: config.size * scale,
                transform: `rotate(${knobsRotation[knobName]}deg)`,
                transformOrigin: 'center',
                cursor: 'grab'
              }}
            />
          )
        })}
        <img
          src={ledOn ? LEDOnImage : LEDOffImage}
          style={{
            position: 'absolute',
            left: led.x * scale,
            top: led.y * scale,
            width: led.size * scale,
            cursor: 'pointer'
          }}
        />
        <img
          src={levelOn ? PushButtonOn : PushButtonOff}
          onClick={() => setLevelOn((prev) => !prev)}
          style={{
            position: 'absolute',
            left: growlButton.x * scale,
            top: growlButton.y * scale,
            width: growlButton.size * scale,
            cursor: 'pointer'
          }}
        />
        <img
          src={driveOn ? PushButtonOn : PushButtonOff}
          onClick={() => setDriveOn((prev) => !prev)}
          style={{
            position: 'absolute',
            left: biteButton.x * scale,
            top: biteButton.y * scale,
            width: biteButton.size * scale,
            cursor: 'pointer'
          }}
        />
        <img
          src={actuatorOn ? ActuatorOn : ActuatorOff}
          onClick={() => {
            setActuatorOn((prev) => !prev)
            setLedOn((prev) => !prev)
          }}
          style={{
            position: 'absolute',
            left: actuator.x * scale,
            top: actuator.y * scale,
            width: actuator.size * scale,
            cursor: 'pointer'
          }}
        />
      </div>
    </div>
  )
}

export default ProductDisplay
