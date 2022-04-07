import { default as MuiButton } from '@mui/material/Button';
import { default as MuiIconButton } from '@mui/material/IconButton';
import { Typography } from '@material-ui/core';

export const IconButton = ({ Icon, color = 'primary', name, ...props }) => (
	<MuiIconButton color={color} {...props} aria-label={name}>
		<Icon/>
	</MuiIconButton>
)

export default function Button({ name, style, textColor, ...props }) {
	const outlined = props.variant === 'outlined'

    return (
        <MuiButton
          style={{
            minWidth: 120,
            padding: '8px 16px',
            textTransform: 'Capitalize',
            fontWeight: 'bold',
            ...style
          }}
		  sx={{
			// color: 'text.primary'
			borderColor: outlined ? '#ddd' : '',
			borderWidth: '2px',
			'&:disabled': {
				opacity: 0.8,
				borderWidth: '2px',
			},
			'&:focus': outlined ? ({
				backgroundColor: 'white',
				border: '2px solid #ddd'
			}) : {}
		  }}
          disableElevation
          {...props}
        >
			<Typography
			  style={{
				fontWeight: "bold",
				textTransform: "capitalize",
				color: textColor || (outlined ? (props.disabled ? '#999' : '#333') : 'inherit')
			  }}
			>
				{name}
			</Typography>
        </MuiButton>
    )
}
