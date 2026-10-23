import PunList from './components/PunList'
import { useEffect, useState } from 'react'
import { API_URL } from './config'
import { capitalize } from './utils/format'



function App() {
  const [categories, setCategories] = useState<string[]>([]) //förväntas en array med flera strängar
  const [category, setCategory] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  useEffect(() => {
    console.log('UseEffect 1: On mount')

    const fetchCategories = async () => {
      setLoading(true)
      setError('')
      try {
        const response = await fetch(`${API_URL}/categories`)
        const data = await response.json()
     
        setCategories(data)

      } catch (error) {
       setError(error instanceof Error ? error.message : 'Unknown error')
      } finally {
        setLoading(false)
      }
    }

    fetchCategories()
  }, [])

 return (
  <main>
    <h1>😄 Puns</h1>

    <div className="toolbar">
      <label>
        Category
        <select
          id="category"
          value={category}
          onChange={e => setCategory(e.target.value)} // Uppdatera state när användaren väljer en kategori
        >
          <option value="">All categories</option>
          {categories.map(category => (
            <option key={category} value={category}>{capitalize(category)}</option>
          ))}
        </select>
      </label>
    </div>

    {loading && <p>Loading categories...</p>}
    {error && <p className="error">Something went wrong: {error}</p>}

    <PunList category={category} categories={categories} />
  </main>
)
}
export default App

/**
 * Exercise: Puns client v1 (API docs: https://pun-api-with-auth.vercel.app/docs)
 * You will keep building on this app in lectures 10, 11 and 12.
 *
 * Start by opening these in the browser to see what the API returns:
 *   https://pun-api-with-auth.vercel.app/api/puns
 *   https://pun-api-with-auth.vercel.app/api/puns/categories
 *   https://pun-api-with-auth.vercel.app/api/puns?category=food
 * NOTE! The API only answers web pages running on http://localhost:5173, 5174 or 5175 (CORS).
 * If Vite starts on another port, stop your other dev servers.
 *
 * Done for you: the Pun type (src/types.ts), API_URL (src/config.ts), PunItem, and
 * capitalize/formatDate (src/utils/format.ts)
 *
 * Part 1: Fetch on mount (see "14.UseEffectAndFetchingData/PostList")
 * - When the app loads, fetch the categories from /categories with a useEffect (empty dependency array)
 * - Store them in a state and show them as <option>s in the <select> below, after "All categories"
 * - An empty array can't be inferred, so tell useState what it will hold: useState<string[]>([])
 * - Remember: you can't make the effect function itself async. Create an async function INSIDE it and call it
 *
 * Part 2: Loading and error
 * - Show "Loading categories..." while fetching, and an error message if it fails
 * - Test the error: change the URL to a domain that doesn't exist
 *
 * Part 3: Fetch when something changes
 * - Make the <select> controlled with a state "category". '' means "all categories"
 * - In PunList: fetch the puns whenever the category changes (what goes in the dependency array?)
 *   ''     -> /api/puns
 *   'food' -> /api/puns?category=food
 * - Show each pun with <PunItem pun={pun} />, and "Loading puns..." while loading
 *
 * Part 4 (extra hard): Pun of the moment
 * - A new component PunOfTheMoment that gets the puns as a prop, and shows ONE of them in a box above the list
 * - Every 10 seconds it switches to another random pun (setInterval in an effect)
 * - Stop the timer in the cleanup (see "14.UseEffectAndFetchingData/Clock"). What happens if you forget it?
 *   (Hint: change category a few times and add a console.log in the interval)
 */