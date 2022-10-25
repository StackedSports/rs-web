import { useContactSettings } from 'Api/ReactQuery/ContactSettingsPreference';
import { labelType } from 'Pages/Settings/ContactSettingsPage';
import React, { createContext } from 'react'

interface IPreferencesContext {
    labels: labelType;
    setLabels: (value: labelType | ((prev: labelType) => labelType)) => void;
    loading: boolean;
}

export const PreferencesContext = createContext<IPreferencesContext | null>(null);

const PreferencesProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const contactSettings = useContactSettings()

    return (
        <PreferencesContext.Provider value={{ ...contactSettings }}>
            {children}
        </PreferencesContext.Provider>
    )
}

export default PreferencesProvider;