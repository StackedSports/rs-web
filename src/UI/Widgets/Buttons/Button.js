import { default as MuiButton } from '@mui/material/Button';
import { default as MuiIconButton } from '@mui/material/IconButton';
import { Typography } from '@material-ui/core';

export const IconButton = ({ Icon, color = 'primary', name, ...props }) => (
	<MuiIconButton color={color} {...props} aria-label={name}>
		<Icon/>
	</MuiIconButton>
)

export default function Button({ name, style, textColor, ...props }) {
	// if(name === 'Send Message') {
	// 	console.log('---- Send Message ----')
	// 	console.log(style)
	// 	console.log(textColor)
	// 	console.log(props)
	// 	console.log('----------------------')
	// }

	let buttonStyle = {
		...style
	}

	if(textColor)
		buttonStyle['color'] = textColor

    return (
        <MuiButton
          style={buttonStyle}
          disableElevation
          {...props}
        >
			{name}
			{/* <Typography
			  style={{
				// fontWeight: "700",
				fontFamily: 'ProximaNovaSemibold',
					textTransform: "capitalize",
				color: textColor || (outlined ? (props.disabled ? '#999' : '#333') : 'inherit')
			  }}
			>
				{name}
			</Typography> */}
        </MuiButton>
    )
}
