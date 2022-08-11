import { Typography } from "@mui/material";

import BaseDialog from "UI/Widgets/Dialogs/BaseDialog";
import { useContext } from "react";
import ConfirmDialogContext from "Context/ConfirmDialogProvider";

export const ConfirmDialog = () => {
    const { title, message, onSubmit, close, changePrimaryButton } = useContext(ConfirmDialogContext);

    return (
        <BaseDialog
            keepMounted
            maxWidth="sm"
            open={Boolean(onSubmit)}
            onClose={close}
            title={title}
            onConfirm={changePrimaryButton ? onSubmit : close}
            secondaryAction={() => {
                if (changePrimaryButton) {
                    close();
                } else {
                    if (onSubmit)
                        onSubmit();
                    close();
                }
            }}
            confirmLabel={changePrimaryButton ? "Confirm" : "Cancel"}
            cancelLabel={changePrimaryButton ? "Cancel" : "Confirm"}
            sx={{ zIndex: theme => theme.zIndex.modal + 1 }
            }
        >
            <Typography>{message}</Typography>
        </BaseDialog>
    )
}

export default ConfirmDialog;
