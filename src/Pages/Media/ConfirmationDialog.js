import { Dialog, DialogActions, DialogTitle, DialogContent, Button } from "@mui/material";

/**
 * 
 * @param {boolean} props.open controls the dialog open state
 * @param {string} props.title dialog title
 * @param {string} props.children dialog content
 * @param {function} props.onClose dialog close callback sends true if confirmed and false if cancelled
 * @returns 
 */
export const ConfirmationDialog = (props) => {

    const handleCancel = () => {
        props.onClose(false);
    };

    const handleOk = () => {
        props.onClose(true);
    };

    return (
        <Dialog
            sx={{ '& .MuiDialog-paper': { width: '80%' } }}
            maxWidth="xs"
            open={props.open}
        >
            <DialogTitle>{props.title}</DialogTitle>
            <DialogContent dividers>
                {props.children}
            </DialogContent>
            <DialogActions>
                <Button autoFocus onClick={handleCancel}>
                    Cancel
                </Button>
                <Button onClick={handleOk}>Ok</Button>
            </DialogActions>
        </Dialog>
    );
}
