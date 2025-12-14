import { Button } from "@mui/material";
import { Link } from "react-router-dom";
import { Delete,SendOutlined } from "@mui/icons-material";

export function ToyPreview({toy, onRemoveToy}){
    
    return (
        <article className="toy-preview">
          <h4>{toy.name}</h4>  
          <h6>Price: {toy.price}$</h6>
          <h6 className={toy.inStock ? 'in-stock' : 'not-in-stock'}>{toy.inStock? 'In stock': 'Not in stock'}</h6>
          <div className="img-container">
          <img src={toy.imgUrl}/>
          </div>
          <hr/>
          <div className="buttons-container">
            
          <Link  to={`/toy/edit/${toy._id}`}>
          <Button style={{border:'1px solid black'}}>Edit</Button>
          </Link> &nbsp;
          <Link  to={`/toy/${toy._id}`}>
          <Button style={{border:'1px solid black'}}>Details</Button>
          </Link>
          <Button style={{border:'1px solid black'}} variant="remove" startIcon={<Delete/>} onClick={()=>{onRemoveToy(toy._id)}}>Remove</Button>
          </div>
        </article>
    )
}