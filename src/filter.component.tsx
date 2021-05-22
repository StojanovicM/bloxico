/* eslint-disable react-hooks/rules-of-hooks */
import React, { useState } from 'react'
import { useDebounce } from './debounce.component'

export const FilterComponent: React.FC = () => {

  const [text, setText] = useState('')

  const debouncedText = useDebounce(text, 500)

  return (
    <input
     onKeyUp={ e => setText(e.currentTarget.value) }
     className="filter-input"
     placeholder='Filter' />
  )
}

