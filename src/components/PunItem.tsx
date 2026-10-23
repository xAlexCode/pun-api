import { useState } from 'react'
import { capitalize, formatDate } from '../utils/format'
import type { Pun } from '../types'

type PunItemProps = {
  pun: Pun
  onDelete: (punId: string) => void
  onUpdate: (punId: string, content: string) => void
}

const PunItem = ({ pun, onDelete, onUpdate }: PunItemProps) => {
  const [isEditing, setIsEditing] = useState(false)
  const [content, setContent] = useState(pun.content)

  const handleSave = () => {
    onUpdate(pun._id, content)
    setIsEditing(false)
  }

  const handleCancel = () => {
    setContent(pun.content)   // ångra: återställ texten
    setIsEditing(false)
  }

  if (isEditing) {
    return (
        <li className="pun edit-form">
        <textarea value={content} onChange={e => setContent(e.target.value)} />
        <div className="actions">
            <button className="primary" onClick={handleSave}>Save</button>
            <button onClick={handleCancel}>Cancel</button>
        </div>
        </li>
    )
  }

  return (
    <li className="pun">
        <p className="pun-content">{pun.content}</p>
        <p className="pun-meta">
            <span className="tag">{capitalize(pun.category)}</span>
            <span>{formatDate(pun.date)}</span>
        </p>
        <div className="actions">
            <button onClick={() => setIsEditing(true)}>Edit</button>
            <button className="danger" onClick={() => onDelete(pun._id)}>Delete</button>
        </div>
    </li>
   )
}

export default PunItem