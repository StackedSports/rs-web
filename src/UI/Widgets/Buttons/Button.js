import { default as MuiButton } from '@mui/material/Button';
import { default as MuiIconButton } from '@mui/material/IconButton';

export const IconButton = ({ Icon, color = 'primary', name, ...props }) => (
	<MuiIconButton color={color} {...props} aria-label={name}>
		<Icon/>
	</MuiIconButton>
)

export default function Button({ name, style, ...props }) {

    return (
        <MuiButton
          style={{
            minWidth: 120,
            padding: '8px 16px',
            ...style
          }}
          disableElevation
          {...props}
        >
            {name}
        </MuiButton>
    )
}
