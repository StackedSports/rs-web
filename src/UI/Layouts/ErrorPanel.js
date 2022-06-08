
import { Grid, Container, Stack, Typography } from '@mui/material';


export default function ErrorPanel(props) {

    // if(props.body) {
    //     Object.keys(props.body).forEach(key => {
    //         console.log(key)
    //         console.log(props.body[key])
    //     })
    // }

    return (
        <Grid 
          container
          alignItems="center"
          justifyContent="center"
          >
            <Stack mt={5} alignItems="center">
                <span style={{...styles.span, marginBottom: 16 }}>
                    Sorry, something bad happened :(
                </span>
                <span style={{...styles.span, marginBottom: 60}}>
                    When trying to access your message, we got the following error:
                </span>
                <h1 style={{ fontWeight: 'bold', textAlign: 'center', color: '#bbb' }}>{props.title}</h1>
                <span style={{...styles.span, fontSize: 26, color: '#bbb', maxWidth: 400 }}>
                    {props.body}
                </span>
            </Stack>
        </Grid>

    )
}

const styles = {
    container: {
        flex: 1,
    },
    span: {
        fontSize: 22,
        color: '#555',
        textAlign: 'center',
        fontWeight: 'bold',
        maxWidth: 300
    }
}