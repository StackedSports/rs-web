import { default as MuiButton } from '@mui/material/Button';
import { default as MuiIconButton } from '@mui/material/IconButton';
import { Typography } from '@material-ui/core';

export const IconButton = ({ Icon, color = 'primary', name, ...props }) => (
	<MuiIconButton color={color} {...props} aria-label={name}>
		<Icon/>
	</MuiIconButton>
)

export default function Button({ name, style, ...props }) {
	const outlined = props.variant === 'outlined'

    return (
        <MuiButton
          style={{
            minWidth: 120,
            fontWeight: "bold",
            textTransform: "capitalize",
            padding: '8px 16px',
            ...style
          }}
		  sx={{
			// color: 'text.primary'
			borderColor: outlined ? '#ddd' : '',
			'&:disabled': {
				opacity: 0.8
			},
			'&:focus': outlined ? ({
				backgroundColor: 'white',
				border: '1px solid #ddd'
			}) : {}
		  }}
          disableElevation
          {...props}
        >
			<Typography
			  style={{
				fontWeight: "bold",
				textTransform: "capitalize",
				color: outlined ? (props.disabled ? '#999' : '#333') : 'inherit'
			  }}
			>
				{name}
			</Typography>
        </MuiButton>
    )
}
