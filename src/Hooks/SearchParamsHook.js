import { useEffect, useMemo } from "react";
import { useHistory, useLocation } from "react-router-dom";

export default function useSearchParams() {
    const history = useHistory();
    const { search } = useLocation();

    const searchParams = useMemo(() => {
        console.log(search)

        let params = {
            filters: null,
            page: null
        }
        
        let urlParams = new URLSearchParams(search)

        for (const p of urlParams) {
            console.log(p)

            let key = p[0]
            let value = p[1]

            if(key === 'page')
                params.page = value
            else {
                if(!params.filters)
                    params.filters = {}

                params.filters[key] = value
            }
        }

        console.log(params)

        return params

    }, [search]);

    const setSearchParams = (params) => {
        const newParams = new URLSearchParams();
        if (params) {
            Object.entries(params).forEach(([key, value]) => {
                if (Array.isArray(value)) {
                    // value.forEach(item => newParams.append(key, item))
                    newParams.append(key, value)
                }
                else {
                    newParams.append(key, value)
                }
            })
        }
        history.push({ search: newParams.toString() })
    }

    const setFilters = (filters) => {
        const newParams = new URLSearchParams()

        if (filters) {
            Object.entries(filters).forEach(([key, value]) => {
                if (Array.isArray(value)) {
                    value.forEach(item => newParams.append(key, item.id))
                    // newParams.append(key, value)
                }
                else {
                    newParams.append(key, value)
                }
            })
        }

        history.push({ search: newParams.toString() })
    }

    // return [searchParams, setSearchParams];
    return {
        ...searchParams,
        setFilters
    }
}