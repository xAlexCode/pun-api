import { useState, type SubmitEvent } from "react"
import { capitalize } from "../utils/format"
// Part 1: make this a controlled form 

type PunFormProps = {
    categories: string[]
    addPun: (
        content: string,
        category: string
    ) => void
}

const PunForm = ({categories, addPun}: PunFormProps) => {
    const [content, setContent] = useState('')
    const [category, setCategory] = useState('')

    const handleSubmit = (e: SubmitEvent<HTMLFormElement>) => {
        e.preventDefault() //Stoppa sidomladdning
        addPun(content, category) // skicka upp till punlist
        setContent('') // töm formuläret
        setCategory('')
    }

  return (
    <form className="pun-form" onSubmit={handleSubmit}>
      <label>
        Your pun
        <textarea value={content} onChange={(e) => setContent(e.target.value)}/>
      </label>

      <div className="row">
        <label>
          Category
          <select value={category} onChange={(e) => setCategory(e.target.value)}>
            <option value="">Choose a category</option>
            {categories.map (c => (
                <option key={c} value={c}>{capitalize(c)}</option>
            ))}
          </select>
        </label>
        <button className="primary">Add pun</button>
      </div>
    </form>
  )
}

export default PunForm