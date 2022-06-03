import { FilterActionTypes } from './filter.types';

export const filterDataPreserve = filter => ({
    type: FilterActionTypes.PRESERVE_FILTER,
    payload: filter
})