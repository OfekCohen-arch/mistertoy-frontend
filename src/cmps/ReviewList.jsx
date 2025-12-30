import { ReviewPreview } from "./ReviewPreview";

export function ReviewList({reviews}){

return(
   <ul className="review-list">
               {reviews.length>0 &&reviews.map(
                  review=>
                   <li key={review._id}>
                   <ReviewPreview review={review}/>
                   </li> 
               )}
               {
                   reviews.length === 0 &&
                   <p>No reviews found</p>
               }
           </ul>
)
}