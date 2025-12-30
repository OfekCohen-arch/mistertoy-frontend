import { Button } from "@mui/material"
import { Link } from "react-router-dom"

export function UserPreview({user}){
return(
    <article className="user-preview">
          <h4>{user.username}</h4>  
          <hr/>
          
          <Link  to={`/user/${user._id}`}>
          <Button style={{border:'1px solid black'}}>Details</Button>
          </Link>
        </article>
)
}