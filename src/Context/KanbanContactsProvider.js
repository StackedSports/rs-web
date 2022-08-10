import { createContext, useState } from "react";
import { getKanban, updateColumns } from 'Api/Firebase/Kanban/Kanban'

// create context for controlling kanban board
export const KanbanContactsContext = createContext();

// create context for controlling kanban board
export const KanbanContactsProvider = ({ children }) => {
    const [loading, setLoading] = useState(true)
    const [kanban, setKanban] = useState(null)
    const [selectedContact, setSelectedContact] = useState([])




}