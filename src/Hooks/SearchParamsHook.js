import { useEffect, useMemo } from "react";
import { useHistory, useLocation } from "react-router-dom";

export default function useSearchParams() {
    const history = useHistory();
    const { search } = useLocation();
    const searchParams = useMemo(() => new URLSearchParams(search), [search]);

    const searchParamsObj = useMemo(() => {

        let params = {
            filters: null,
            page: null
        }

        let urlParams = new URLSearchParams(search)

        for (const p of urlParams) {
            // console.log(p)

            let key = p[0]
            let value = p[1]

            if (key === 'page')
                params.page = value
            else {
                if (!params.filters)
                    params.filters = {}

                params.filters[key] = value
            }
        }

        //  console.log(params)

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
                }
                else {
                    newParams.append(key, value)
                }
            })
        }

        history.push({ search: newParams.toString() })
    }

    const appenSearchParams = (key, value) => {
        if (searchParams.has(key) && searchParams.get(key) == value) return

        const newParams = new URLSearchParams(search)
        newParams.set(key, value)
        history.push({ search: newParams.toString() })
    }

    return {
        ...searchParamsObj,
        searchParams,
        setSearchParams,
        appenSearchParams,
        setFilters
    }
}

export function filterObjectToSearchParams(filters) {

    const parserFilters = new URLSearchParams()
    Object.entries(filters).forEach(([key, value]) => {
        if (Array.isArray(value)) {
            const reduce = value.reduce((acc, item) => {
                return [...acc, item]
            }, [])
            parserFilters.append(key, reduce.join(','))
        }
        else {
            parserFilters.append(key, value)
        }
    })
    return parserFilters.toString()
}

export function searchParamsToFilterObject(searchParams) {
    if (searchParams) {
        const filtersSearchParams = new URLSearchParams(searchParams)
        const filterObject = {}
        filtersSearchParams.forEach((value, key) => {
            filterObject[key] = value.split(',')
        })
        return filterObject
    }
    return null
}