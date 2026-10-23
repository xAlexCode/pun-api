import { useEffect, useState } from 'react'
import { API_URL } from '../config'
import type { Pun } from '../types'
import PunItem from './PunItem'
import PunOfTheMoment from './PunOfTheMoment'
import PunForm from './PunForm'

type PunListProps = {
  category: string
  categories: string[]
}

const PunList = ({ category, categories }: PunListProps) => {
  const [puns, setPuns] = useState<Pun[]>([])
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState('')

  const addPun = async (content: string, punCategory: string) => {
    try {
        const response = await fetch(`${API_URL}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ content, category: punCategory })
        })
        const newPun = await response.json()
        setPuns([...puns, newPun]) // gör en ny lista med alla gamla puns plus den nya
    } catch (error) {
        setError(error instanceof Error ? error.message : 'Unknown error')
    }
  }

  const deletePun = async (punId: string) => {

    try {
      const response = await fetch(`${API_URL}/${punId}`, { method: 'DELETE' })
      
      if (response.ok) {
        setPuns(puns.filter(pun => pun._id !== punId))
      }
    } catch (error) {
      setError(error instanceof Error ? error.message : 'Unknown error')
    }
  }

  const updatePun = async (punId: string, content: string) => {
    try {
      const response = await fetch(`${API_URL}/${punId}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ content })
      })
      if (response.ok) {
        const updatedPun = await response.json()
        setPuns(puns.map(pun => pun._id === punId ? updatedPun : pun))
      }
    } catch (error) {
      setError(error instanceof Error ? error.message : 'Unknown error')
    }
  }

  useEffect(() => {
    console.log('UseEffect 2: Category changed')

    const fetchPuns = async () => {
      setIsLoading(true)
      setError('')
      try {
        const url = category ? `${API_URL}?category=${category}` : API_URL
        const response = await fetch(url)
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
      {error && <p className="error">Could not load the puns: {error}</p>}

      <PunForm categories={categories} addPun={addPun} />

      <PunOfTheMoment puns={puns} />
      
      <ul className="puns">
        {
          puns.map(pun => (
            <PunItem key={pun._id} pun={pun} onDelete={deletePun} onUpdate={updatePun} />
          ))}
        </ul>
    </>
  )
}
export default PunList