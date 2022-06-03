import { HomeItemActionTypes } from './home-item.type'

export const homeItem = (content) => ({
    type: HomeItemActionTypes.HOME_ITEM,
    payload: content
})

export const homeSearch = search => ({
    type: HomeItemActionTypes.SEARCH,
    search: search
})