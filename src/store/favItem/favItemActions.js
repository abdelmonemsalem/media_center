import { ADD_TO_FAV, REMOVE_FROM_FAV, CLEAR_FAV, REMOVE_FROM_FAV_BY_ID } from './favItemTypes'

export function addToFav(favItem) {
    return {
        type: ADD_TO_FAV,
        favItem
    }
}

export function delFromFav(index) {
    return {
        type: REMOVE_FROM_FAV,
        index
    }
}

export function clearFav() {
    return {
        type: CLEAR_FAV,
    }
}

export function removeFromFavById(itemId) {
    return {
        type: REMOVE_FROM_FAV_BY_ID,
        itemId
    }
}