import { useEffect } from "react"
import { useSelector } from "react-redux"
import { loadReviews } from "../store/actions/review.actions.js"
import { ReviewList } from "../cmps/ReviewList"
import { ReviewFilter } from "../cmps/ReviewFilter"
import { setFilterBy } from "../store/actions/toy.actions"
import { SOCKET_EMIT_SET_TOPIC, SOCKET_EMIT_UPDATE_REVIEWS, SOCKET_EVENT_REVIEWS_UPDATED, socketService } from "../services/socket.service"

export function ReviewIndex(){
    const reviews = useSelector((storeState)=>storeState.reviewModule.reviews)
    const filterBy = useSelector((storeState)=>storeState.reviewModule.filterBy)
    useEffect(()=>{
     loadReviews(filterBy)
    },[filterBy])
    useEffect(()=>{
     socketService.on(SOCKET_EVENT_REVIEWS_UPDATED,loadReviews)
     socketService.emit(SOCKET_EMIT_UPDATE_REVIEWS,filterBy) 
     socketService.emit(SOCKET_EMIT_SET_TOPIC,'reviews') 
     return()=>{
        socketService.off(SOCKET_EVENT_REVIEWS_UPDATED,loadReviews)
     } 
    },[])
    return(
        <section>
         <h1>Reviews</h1> 
         <ReviewFilter filterBy={filterBy} onSetFilterBy={setFilterBy}/>  
         <ReviewList reviews={reviews}/>
        </section>
    )
}