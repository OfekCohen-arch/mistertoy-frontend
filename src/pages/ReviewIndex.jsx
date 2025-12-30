import { useEffect } from "react"
import { useSelector } from "react-redux"
import { loadReviews } from "../store/actions/review.actions"
import { ReviewList } from "../cmps/ReviewList"
import { ReviewFilter } from "../cmps/ReviewFilter"
import { setFilterBy } from "../store/actions/toy.actions"

export function ReviewIndex(){
    const reviews = useSelector((storeState)=>storeState.reviewModule.reviews)
    const filterBy = useSelector((storeState)=>storeState.reviewModule.filterBy)
    useEffect(()=>{
     loadReviews(filterBy)
    },[filterBy])
    return(
        <section>
         <h1>Reviews</h1> 
         <ReviewFilter filterBy={filterBy} onSetFilterBy={setFilterBy}/>  
         <ReviewList reviews={reviews}/>
        </section>
    )
}