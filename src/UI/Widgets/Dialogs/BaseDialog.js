import {
    Grid,
    Dialog,
} from "@material-ui/core"

import Button from 'UI/Widgets/Buttons/Button'

const BaseDialog = (props) => {
    return (
        <Dialog
          maxWidth="md"
          fullWidth
          open={props.open}
          onClose={props.onClose}
        >
            <Grid container style={{ padding: 16 }} direction='column'>
                
                {props.children}

                <Grid 
                  container
                  direction="row" 
                  alignItems="center"
                  justifyContent="flex-end">

                    <Button
                      name="Cancel"
                      onClick={props.onClose}
                    />

                    <Button
                      variant="contained"
                      name="Confirm"
                      onClick={props.onConfirm}
                    />
                    
                </Grid>
            </Grid>
        </Dialog>
    )
}

export default BaseDialog