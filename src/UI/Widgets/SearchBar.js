import './SearchBar.css'

import { useState } from 'react'

import SearchOutlinedIcon from '@mui/icons-material/SearchOutlined';

export default function SearchBar(props) {
    const [input, setInput] = useState('')

    const onInputChange = (e) => {
        setInput(e.target.value)
    }

    return (
        <div className='SearchBar' style={props.style}>
            <SearchOutlinedIcon/>
            <input
              type='text'
              value={input}
              
              onChange={onInputChange}
              placeholder={props.placeholder}/>
        </div>
    )
}