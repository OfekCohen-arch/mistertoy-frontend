import { Button } from "@mui/material";
import { Link } from "react-router-dom";
import { Delete,SendOutlined } from "@mui/icons-material";

export function ToyPreview({toy, onRemoveToy}){
    
    return (
        <article className="toy-preview">
          <h4>{toy.name}</h4>  
          <h6>Price: {toy.price}$</h6>
          <div className="img-container">
          <img src={toy.imgUrl}/>
          </div>
          <hr/>
          <Link to={`/toy/edit/${toy._id}`}>Edit</Link> &nbsp;
          <Link to={`/toy/${toy._id}`}>Details</Link>
          <Button variant="remove" startIcon={<Delete/>} onClick={()=>{onRemoveToy(toy._id)}}>Remove</Button>
        </article>
    )
}