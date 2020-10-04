import { ADD_TO_FAV, REMOVE_FROM_FAV, CLEAR_FAV, REMOVE_FROM_FAV_BY_ID } from './favItemTypes'

const initialState = function loadState() {
        try {
            const state = localStorage.getItem('favourites');
            if(state !== null) {
                return{
                    favourites: JSON.parse(state)
                } 
            }
        } catch(err) {
            // Ignore Errors
        }
         return {
            favourites : []
        }
    }



export default function favItemReducer(state = initialState(), action) {
    switch(action.type){
        case ADD_TO_FAV: {
            action.favItem.fav = true;
            return {
                favourites: [
                    ...state.favourites,
                    action.favItem
                ]
            }
        }
        case REMOVE_FROM_FAV: {
            const newState = state.favourites;
            newState.splice(action.index, 1)
            return {
                favourites: [
                    ...state.favourites,
                ]
            }
        }
        case CLEAR_FAV: {
            state.favourites = [];
            return {
                favourites: [
                    ...state.favourites,
                ]
            }
        }
        case REMOVE_FROM_FAV_BY_ID: {
            const newState = state.favourites;
            var index = newState.findIndex(function(o){
                return o.id === action.index;
            })
            if (index !== -1) newState.splice(index, 1);

            return {
                favourites: [
                    ...state.favourites,
                ]
            }
        }
        default: return state
    }
}