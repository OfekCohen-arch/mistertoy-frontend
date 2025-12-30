import { Link,NavLink } from "react-router-dom";
import { useOnlineStatus } from "../hooks/useOnlineStatus.js";
import { userService } from "../services/user.service.js";
import{logout} from "../store/actions/user.actions.js"
import { useSelector } from "react-redux";
export function AppHeader(){
const isOnline = useOnlineStatus()
const loggedinUser = useSelector((storeState)=>storeState.userModule.loggedInUser)

    return(
        <header className="main-header" title='Look At ME!' >
             {loggedinUser && <p>Hello {loggedinUser.fullname}</p>}  
            <ul className="main-nav">
                <NavLink to="/"><div className="link">Home</div></NavLink>
                <NavLink to="/toy" className="link">Toys</NavLink>
                <NavLink to="/dashboard" className='link'>Dashboard</NavLink>
                <NavLink to="/about" className='link'>About</NavLink>
                <NavLink to="/review" className='link'>Reviews</NavLink>
                {loggedinUser?<NavLink to='/' className='link' onClick={logout}>Logout</NavLink>:
                <NavLink to="/login" className='link'>Login</NavLink>
                }
                 {loggedinUser && loggedinUser.isAdmin && <NavLink to='/user' className='link'>Users</NavLink>}
                
             
            </ul>
            <p className="isOnline">{isOnline ? '✅ Online' : '❌ Disconnected'}</p>
        </header >
    )
}