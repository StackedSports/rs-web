import { useEffect, useMemo } from "react";
import { useHistory, useLocation } from "react-router-dom";

export default function useSearchParams() {
    const history = useHistory();
    const { search } = useLocation();
    const searchParams = useMemo(() => new URLSearchParams(search), [search]);

    const setSearchParams = (params) => {
        const newParams = new URLSearchParams();
        if (params) {
            Object.entries(params).forEach(([key, value]) => {
                if (Array.isArray(value)) {
                    value.forEach(item => newParams.append(key, item))
                }
                else {
                    newParams.append(key, value)
                }
            })
        }
        history.push({ search: newParams.toString() });
    }

    return [searchParams, setSearchParams];
}