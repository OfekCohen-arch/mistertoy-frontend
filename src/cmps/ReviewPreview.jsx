export function ReviewPreview({review}){
return(
    <article className="review-preview">
    <h4>{review.txt}</h4>
    From: {review.byUser.fullname}<br/>
    About: {review.byToy.name}
    </article>
)
}