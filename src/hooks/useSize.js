import { useRef, useState, useEffect } from 'react'


// eslint-disable-next-line
export function useSize () {
  const ref = useRef()
  const [size, setSize] = useState(undefined)

  useEffect(() => {
    const rect = ref.current.getBoundingClientRect()
    setSize({
      width: rect.width,
      height: rect.height
    })
    ref.current.addEventListener(
      'resize',
      (e) => {
        const rect = ref.current.getBoundingClientRect()
        setSize({
          width: rect.width,
          height: rect.height
        })
      }
    )
  }, [])

  return [ref, size]
}
