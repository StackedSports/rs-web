import { IPanelFilterOption, IPanelSelectedFilterOption } from "Interfaces";
import { useEffect, useMemo } from "react";
import { useHistory, useLocation } from "react-router-dom";

export default function useSearchParams() {
    const history = useHistory();
    const { pathname, search } = useLocation();
    const searchParams = useMemo(() => new URLSearchParams(search), [search]);

    const filtersAndPageObj = useMemo(() => {
        return {
            filters: queryParamsToFilterObject(searchParams.get('filters')),
            page: Number(searchParams.get('page')) || 1,
            perPage: Number(searchParams.get('perPage')) || null
        }
    }, [searchParams]);

    const setSearchParams = (params: Record<string, string>) => {
        const newParams = new URLSearchParams();
        if (params) {
            Object.entries(params).forEach(([key, value]) => {
                if (Array.isArray(value)) {
                    // value.forEach(item => newParams.append(key, item))
                    newParams.set(key, value)
                }
                else {
                    newParams.set(key, value)
                }
            })
        }
        const newParamsStr = newParams.toString()
        if (searchParams.toString() !== newParamsStr) {
            if (!searchParams.has('page') && newParams.get('page') === '1')
                history.replace({ search: newParamsStr })
            else
                history.push({ search: newParamsStr })
        }
    }

    const appendSearchParams = (key: string, value: string, redirectTo?: string) => {
        if ((searchParams.has(key) && searchParams.get(key) == value)) return
        const newParams = new URLSearchParams(search)
        if (value) {
            newParams.set(key, value)
        } else
            newParams.delete(key)
        const newParamsStr = newParams.toString()

        if (searchParams.toString() !== newParamsStr) {
            if (!searchParams.has('page') && newParams.get('page') === '1')
                history.replace({ pathname: redirectTo || pathname, search: newParamsStr })
            else
                history.push({ pathname: redirectTo || pathname, search: newParamsStr })
        }
    }

    const setFilters = (filters: any, redirectTo?: string) => {
        appendSearchParams('filters', filterObjectToQueryParams(filters), redirectTo)
    }

    return {
        ...filtersAndPageObj,
        searchParams,
        setSearchParams,
        appendSearchParams,
        setFilters
    }
}

export function filterObjectToQueryParams(filters: Record<string, IPanelSelectedFilterOption[] | IPanelSelectedFilterOption>): string {
    if (!filters) return ''
    const parserFilters = new URLSearchParams()
    Object.entries(filters).forEach(([key, value]) => {
        if (Array.isArray(value)) {
            const reduce: string[] = value.reduce((acc, item) => {
                return [...acc, `${item.itemLabel}:${item.value}`]
            }, [''])
            parserFilters.append(key, reduce.join(';'))
        }
        else {
            parserFilters.append(key, `${value.itemLabel}:${value.value}`)
        }
    })
    return parserFilters.toString()
}

export function queryParamsToFilterObject(searchParams: string | null) {
    if (searchParams) {
        const filtersSearchParams = new URLSearchParams(searchParams)
        const filterObject: Record<string, IPanelSelectedFilterOption[]> = {}
        filtersSearchParams.forEach((string, key) => {
            filterObject[key] = filtersSearchParams.get(key)?.split(';').map(item => {
                const [itemLabel, value] = item.split(':')
                return { itemLabel: itemLabel, value: value?.includes(',') ? value.split(',') : (Number(value) || value) }
            }) || []
        })
        return filterObject
    }
    return null
}