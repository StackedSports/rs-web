import SearchOutlinedIcon from '@mui/icons-material/SearchOutlined';
import ClearIcon from '@mui/icons-material/Clear';
import { styled, TextField, Autocomplete, Chip, Avatar,Box } from "@mui/material"

export const StyledBox = styled(Box)(({ theme, expanded}) => {
    if(expanded) {
        return {
            backgroundColor: '#f3f4f8',
            borderRadius: '5px',
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'center',
            // marginRight: '20px',
            padding: '0 8px 0 8px',
            height: '36px',
            width: '250px',
            fontSize: '14px',
            color: '#888'
        }
    } else {
        return {
            '&:hover': {
                cursor: 'pointer'
            }
        }
    }
})

export const StyledSearchIcon = styled(SearchOutlinedIcon)(({ theme, expanded }) => ({
    color: expanded ? '#888' : theme.palette.primary.main,
    marginLeft: expanded ? 0 : 8,
    marginRight: 8
}))

export const StyledTextInput = styled('input')(({ theme, expanded }) => ({
    display: expanded ? 'visible' : 'none',
    flex: 1,
    backgroundColor: 'transparent',
    border: '0px solid transparent',
    outline: '0px solid transparent', 
}))

export const StyledClearIcon = styled(ClearIcon)(({ theme, expanded }) => ({
    display: expanded ? 'visible' : 'none',
    width: 14,
    height: 14,
    '&:hover': {
        opacity: 0.5,
        cursor: 'pointer'
    },
    '.MuiSvgIcon-root': {
        display: expanded ? 'visible' : 'none',
    }
}))

