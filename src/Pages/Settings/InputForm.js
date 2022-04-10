import Stack from '@mui/material/Stack'
import { useField } from 'formik'

const InputForm = (props) => {

    const [inputProps, meta] = useField(props)
    
    return (
        <Stack
            flex={1}
            direction="column"
            justifyContent="flex-start"
            alignItems="start"
            spacing={1}
            style={{ position: 'relative', width: props.width, height: props.height, }}
            marginBottom="20px"
        >
            <input id={props.name} {...inputProps} {...props}
                style={{ width: "100%", height: "80%" }} />

            {props.label && (
                <label
                    htmlFor={props.name}
                    style={{ marginTop: 0, marginLeft: "10px", fontSize: "12px", color: '#7F7F7F', }}>
                    {props.label}
                </label>)}
            {meta.error && (
                <div style={{ position: 'absolute', bottom: 0, right: 0, }}>{meta.error.toString()}</div>
            )}
        </Stack>
    )
}

export default InputForm