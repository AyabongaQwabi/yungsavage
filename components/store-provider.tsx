'use client'

import {
  createContext,
  useContext,
  useState,
  useRef,
  useEffect,
  useCallback,
  type ReactNode,
} from 'react'
import { TRACKS, type Track } from '@/lib/album'

export type CartItem = {
  id: string
  name: string
  price: number
  qty: number
  kind: 'single' | 'album' | 'merch' | 'ticket'
}

type StoreContextType = {
  // cart
  items: CartItem[]
  cartOpen: boolean
  setCartOpen: (v: boolean) => void
  addItem: (item: Omit<CartItem, 'qty'>) => void
  removeItem: (id: string) => void
  updateQty: (id: string, qty: number) => void
  clearCart: () => void
  total: number
  count: number
  // player
  currentTrack: Track | null
  isPlaying: boolean
  progress: number
  duration: number
  playTrack: (track: Track) => void
  togglePlay: () => void
  seek: (seconds: number) => void
}

const StoreContext = createContext<StoreContextType | null>(null)

export function StoreProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([])
  const [cartOpen, setCartOpen] = useState(false)

  const [currentTrack, setCurrentTrack] = useState<Track | null>(null)
  const [isPlaying, setIsPlaying] = useState(false)
  const [progress, setProgress] = useState(0)
  const [duration, setDuration] = useState(0)
  const audioRef = useRef<HTMLAudioElement | null>(null)

  useEffect(() => {
    const audio = new Audio()
    audio.preload = 'metadata'
    audioRef.current = audio
    const onTime = () => setProgress(audio.currentTime)
    const onMeta = () => setDuration(audio.duration || 0)
    const onEnd = () => setIsPlaying(false)
    audio.addEventListener('timeupdate', onTime)
    audio.addEventListener('loadedmetadata', onMeta)
    audio.addEventListener('ended', onEnd)
    return () => {
      audio.pause()
      audio.removeEventListener('timeupdate', onTime)
      audio.removeEventListener('loadedmetadata', onMeta)
      audio.removeEventListener('ended', onEnd)
    }
  }, [])

  const playTrack = useCallback(
    (track: Track) => {
      if (!track.audio || !audioRef.current) return
      const audio = audioRef.current
      if (currentTrack?.id === track.id) {
        if (audio.paused) {
          void audio.play()
          setIsPlaying(true)
        } else {
          audio.pause()
          setIsPlaying(false)
        }
        return
      }
      audio.src = track.audio
      audio.currentTime = 0
      setCurrentTrack(track)
      void audio.play()
      setIsPlaying(true)
    },
    [currentTrack],
  )

  const togglePlay = useCallback(() => {
    const audio = audioRef.current
    if (!audio || !currentTrack) return
    if (audio.paused) {
      void audio.play()
      setIsPlaying(true)
    } else {
      audio.pause()
      setIsPlaying(false)
    }
  }, [currentTrack])

  const seek = useCallback((seconds: number) => {
    const audio = audioRef.current
    if (!audio) return
    audio.currentTime = seconds
    setProgress(seconds)
  }, [])

  const addItem = useCallback((item: Omit<CartItem, 'qty'>) => {
    setItems((prev) => {
      const existing = prev.find((i) => i.id === item.id)
      if (existing) {
        return prev.map((i) =>
          i.id === item.id ? { ...i, qty: i.qty + 1 } : i,
        )
      }
      return [...prev, { ...item, qty: 1 }]
    })
    setCartOpen(true)
  }, [])

  const removeItem = useCallback((id: string) => {
    setItems((prev) => prev.filter((i) => i.id !== id))
  }, [])

  const updateQty = useCallback((id: string, qty: number) => {
    setItems((prev) =>
      qty <= 0
        ? prev.filter((i) => i.id !== id)
        : prev.map((i) => (i.id === id ? { ...i, qty } : i)),
    )
  }, [])

  const clearCart = useCallback(() => setItems([]), [])

  const total = items.reduce((sum, i) => sum + i.price * i.qty, 0)
  const count = items.reduce((sum, i) => sum + i.qty, 0)

  return (
    <StoreContext.Provider
      value={{
        items,
        cartOpen,
        setCartOpen,
        addItem,
        removeItem,
        updateQty,
        clearCart,
        total,
        count,
        currentTrack,
        isPlaying,
        progress,
        duration,
        playTrack,
        togglePlay,
        seek,
      }}
    >
      {children}
    </StoreContext.Provider>
  )
}

export function useStore() {
  const ctx = useContext(StoreContext)
  if (!ctx) throw new Error('useStore must be used within StoreProvider')
  return ctx
}

export { TRACKS }
