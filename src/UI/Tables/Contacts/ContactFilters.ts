import { useContext, useEffect, useMemo, useState } from "react";
import { IPanelFilters } from "UI/Widgets/PanelFilters/PanelFilters";

import {
    useStatus2,
    useGradYears,
    useStatuses,
    useRanks,
    useTeamMembers,
    usePositions,
    useTags,
} from 'Api/ReactQuery';
import { getFullName } from "utils/Parser";
import { states, timeZones } from "utils/Data";
import { PreferencesContext } from "Context/PreferencesProvider";

export const useContactPanelFiltersData = () => {
    const preferences = useContext(PreferencesContext)
    
    const status = useStatuses()
    const status2 = useStatus2()
    const ranks = useRanks()
    const gradYears = useGradYears()
    const tags = useTags() //useTagsWithContacts()
    const positions = usePositions()
    const teamMembers = useTeamMembers()

    const [filter, setFilters] = useState({})

   /*  type contactFiltersKeys = "status" | "rank" | "grad_year" | "tags" | "positions" | "area_coach" | "area_coach" | "position_coach" | "time_zone" | "dob" | "state" | "status_2" */

    const initalPanelFilters = useMemo<IPanelFilters>(
        () => ({
            "status": {
                label: "Status",
                options: status.items,
            },
            "rank": {
                label: "Rank",
                options: ranks.items,
            },
            "grad_year": {
                label: "Grad Year",
                options: gradYears.items,
            },
            "tags": {
                label: "Tags",
                options: tags.items,
                onSearch: (search) => tags.search(search),
            },
            "positions": {
                label: "Position",
                options: positions.items,
            },
            "area_coach": {
                label: "Area Coach",
                options: teamMembers.items,
                optionsLabel: (option) => getFullName(option),
            },
            "position_coach": {
                label: "Position Coach",
                options: teamMembers.items,
            },
            "time_zone": {
                label: "Time Zone",
                options: timeZones,
            },
            "dob": {
                label: "Birthday",
                type: "date",
                format: "MM/dd",
                optionsLabel: (dates) => dates.join(" - "),
                isUnique: true,
            },
            "state": {
                label: "State",
                options: states,
            },
            "status_2": {
                label: "Status 2",
                options: status2.items,
            },
        }),
        [
            status.items,
            ranks.items,
            gradYears.items,
            tags.items,
            positions.items,
            teamMembers.items,
            status2.items,
            states,
            timeZones,
        ]
    );

    useEffect(() => {

        if (!preferences)
            setFilters(initalPanelFilters)
        else {
            const labelsMap = new Map(preferences.labels)

            const entries = Object.entries(initalPanelFilters).map(([key, filter]) => {
                const label = labelsMap.get(key)
                if (label) {
                    return label.enabled ? [key, { ...filter, label: label.label }] : null
                } else
                    return [key, filter]

            }).filter(entry => entry !== null)

            const filterPreferences: IPanelFilters = Object.fromEntries(entries)
            setFilters(filterPreferences)
        }

    }, [initalPanelFilters, preferences])

    return filter

}
