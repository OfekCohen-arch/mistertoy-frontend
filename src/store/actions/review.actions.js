import { store } from "../store.js";
import {
    SET_IS_LOADING,
    SET_REVIEWS,
    ADD_REVIEW,
    SET_FILTER_BY
} from '../reducers/review.reducer.js'
import { reviewService } from "../../services/review.service.js";


export async function loadReviews(filterBy) {
    store.dispatch({type: SET_IS_LOADING,isLoading: true})
    try {
      const reviews = await reviewService.query(filterBy) 
      store.dispatch({type:SET_REVIEWS,reviews })
    } catch (error) {
     console.log('cannot load reviews',error);
      throw error  
    }
    finally{
     store.dispatch({type:SET_IS_LOADING,isLoading: false})   
    }
}
export async function addReview(review) {
    try {
    const savedReview = await reviewService.save(review)
    store.dispatch({type: ADD_REVIEW,review})
    return savedReview
    } catch (error) {
     console.log('cannot save review ',error);
     throw error
     
    }
}
export function setFilterBy(filterBy){
    store.dispatch({type: SET_FILTER_BY,filterBy})
}