import './SearchBar.css'
import { useState } from 'react'

import SearchOutlinedIcon from '@mui/icons-material/SearchOutlined';
import ClearIcon from '@mui/icons-material/Clear';

// export const useSearch = () => {
//     const [searchTerm, setSearchTerm] = useState('')


// }

export default function SearchBar(props) {
    const [input, setInput] = useState('')

    const onInputChange = (e) => {
        setInput(e.target.value)

        // TODO: this is broken for some reason
        if(props.searchOnChange) {
            if(e.target.value === '')
                props.onClear()
            else
                props.onSearch(e.target.value)
        }
            
    }

    const onKeyPress = (e) => {
        if(e.key === 'Enter')
            props.onSearch(input)
    }

    const onClear = (e) => {
        setInput('')

        if(props.onClear)
            props.onClear()
    }

    return (
        <div className='SearchBar' style={props.style}>
            <SearchOutlinedIcon/>
            <input
              type='text'
              value={input}
              onChange={onInputChange}
              onKeyPress={onKeyPress}
              placeholder={props.placeholder}/>
            {input && input !== '' && (
                <ClearIcon onClick={onClear} style={{ fontSize: 18 }}/>
            )}
        </div>
    )
}