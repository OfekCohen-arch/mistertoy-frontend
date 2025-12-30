import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import { userService } from "../services/user.service"
import {ReviewList} from "../cmps/ReviewList.jsx"
import { loadReviews } from "../store/actions/review.actions.js"
import { useSelector } from "react-redux"

export function UserDetails(){
   const {userId} = useParams()
   const [user,setUser] = useState(null)
    const reviews = useSelector((storeState) => storeState.reviewModule.reviews)
   useEffect(()=>{
    if(userId){
     loadUser(userId)
     loadReviews({userId})
    }
    
   },[])
   async function loadUser(userId) {
     try {
       const user = await userService.getById(userId)
       setUser(user)
     } catch (error) {
       console.log('cannot load user',error);
       throw error
     }
   }
    return (
        <section>
      <h1>User Details</h1>
      {user && <div>
        <h3>
          {user.username}
        </h3>
        <img src={user.imgUrl} style={{ width: '100px' }} />
        <pre> {JSON.stringify(user, null, 2)} </pre>
      </div>}
      <ReviewList reviews={reviews}/>
    </section>

    )
}