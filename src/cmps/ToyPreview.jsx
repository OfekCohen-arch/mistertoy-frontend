import { Button } from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import { Delete,SendOutlined } from "@mui/icons-material";

export function ToyPreview({toy, onRemoveToy}){
    const navigate = useNavigate()
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
            
          
          <Button style={{border:'1px solid black'} } sx={{width:100,height:50}} onClick={()=>{navigate(`/toy/edit/${toy._id}`)}}>Edit</Button>
           &nbsp;
          <Button style={{border:'1px solid black'}} sx={{width:100,height:50}} onClick={()=>{navigate(`/toy/${toy._id}`)}}>Details</Button>
          <Button style={{border:'1px solid black'}} sx={{width:100,height:50}} variant="remove" startIcon={<Delete/>} onClick={()=>{onRemoveToy(toy._id)}}>Remove</Button>
          </div>
        </article>
    )
}