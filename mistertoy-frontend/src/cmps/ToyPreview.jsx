import { Link } from "react-router-dom";

export function ToyPreview({toy, onRemoveToy}){

    return (
        <article className="toy-preview">
          <h4>{toy.name}</h4>  
          <h6>Price: {toy.price}</h6>
          <img src={toy.imgUrl}/>
          <hr/>
          <Link to={`/toy/edit/${toy._id}`}>Edit</Link> &nbsp;
          <Link to={`/toy/${toy._id}`}>Details</Link>
          <button onClick={()=>{onRemoveToy(toy._id)}}>Remove</button>
        </article>
    )
}