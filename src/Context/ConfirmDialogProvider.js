import { createContext, useState } from "react";
import ConfirmDialog from 'UI/Widgets/Dialogs/ConfirmDialog';

/**
 * @param {function} show - The function to call to show the dialog 
 */
export const ConfirmDialogContext = createContext();

export const ConfirmDialogProvider = ({ children }) => {
    const [message, setMessage] = useState("");
    const [title, setTitle] = useState("");
    const [onSubmit, setOnSubmit] = useState(undefined);
    const [changePrimaryButton, setChangePrimaryButton] = useState(false);

    const close = () => setOnSubmit(undefined);

    const show = (title, message, onSubmit, changePrimaryButton) => {
        setMessage(message);
        setTitle(title);
        setOnSubmit(() => onSubmit);
        if (changePrimaryButton) {
            setChangePrimaryButton(true);
        }
    };

    return (
        <ConfirmDialogContext.Provider value={{ title, message, onSubmit, changePrimaryButton, close, show }}>
            {children}
            <ConfirmDialog />
        </ConfirmDialogContext.Provider>
    );
};

export default ConfirmDialogContext;