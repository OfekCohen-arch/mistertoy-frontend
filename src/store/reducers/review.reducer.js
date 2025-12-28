import { reviewService } from "../../services/review.service.js"

export const SET_REVIEWS = 'SET_REVIEWS'
export const ADD_REVIEW = 'ADD_REVIEW'

export const SET_FILTER_BY = 'SET_FILTER_BY'
export const SET_IS_LOADING = 'SET_IS_LOADING'

const initialState = {
    reviews: [],
    isLoading: false,
    filterBy: reviewService.getDefaultFilter()
}

export function reviewReducer(state = initialState,action={}){
switch (action.type){
    case SET_REVIEWS:
        return{
            ...state,
            reviews: [...action.reviews]
        }
    case ADD_REVIEW:
        return{
            ...state,
            reviews:[...state.reviews,action.review]
        }
    case SET_IS_LOADING:
      return {
        ...state,
        isLoading: action.isLoading,
      };
    
    case SET_FILTER_BY:
      return {
       ...state,
       filterBy: {...action.filterBy} 
      };

    default:
      return state;
    }
}