import { useEffect, useState } from 'react'
import { API_URL } from '../config'
import type { Pun } from '../types'
import PunItem from './PunItem'

type PunListProps = {
  category: string
}

const PunList = ({ category }: PunListProps) => {
  const [puns, setPuns] = useState<Pun[]>([])
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState('')

  useEffect(() => {
    const fetchPuns = async () => {
      setIsLoading(true)
      setError('')
      try {
        const url = category ? `${API_URL}?category=${category}` : API_URL
        const response = await fetch(url)
        if (!response.ok) throw new Error(`HTTP ${response.status}`)
        const data = await response.json()
        console.log('puns:', data)
        setPuns(data)
      } catch (error) {
        setError(error instanceof Error ? error.message : 'Unknown error')
      } finally {
        setIsLoading(false)
      }
    }

    fetchPuns()
  }, [category])

  return (
    <>
      {isLoading && <p>Loading puns...</p>}
      {error && <p className="error">Something went wrong: {error}</p>}

      {!isLoading && !error && (
        <ul className="puns">
          {puns.map(pun => (
            <PunItem key={pun._id} pun={pun} />
          ))}
        </ul>
      )}
    </>
  )
}
export default PunList