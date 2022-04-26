import { createContext, useState } from "react";
import ConfirmDialog from 'UI/Widgets/Dialogs/ConfirmDialog';

/**
 * @param {function} show - The function to call to show the dialog 
 */
const ConfirmDialogContext = createContext();

export const ConfirmDialogProvider = ({ children }) => {
    const [message, setMessage] = useState("");
    const [title, setTitle] = useState("");
    const [onSubmit, setOnSubmit] = useState(undefined);
    
    const close = () => setOnSubmit(undefined);

    const show = (title,message, onSubmit) => {
        setMessage(message);
        setTitle(title);
        setOnSubmit(()=>onSubmit);
    };

    return (
        <ConfirmDialogContext.Provider value={{title, message, onSubmit, close, show }}>
            {children}
            <ConfirmDialog />
        </ConfirmDialogContext.Provider>
    );
};

export default ConfirmDialogContext;