import { Link,NavLink } from "react-router-dom";
import { useOnlineStatus } from "../hooks/useOnlineStatus.js";
import { userService } from "../services/user.service.js";
import{logout} from "../store/actions/user.actions.js"
import { useSelector } from "react-redux";
import { useState } from "react";
export function AppHeader(){
const isOnline = useOnlineStatus()
const loggedinUser = useSelector((storeState)=>storeState.userModule.loggedInUser)
const [toggleBtnClass,setToggleBtnClass] = useState('main-nav')
     function toggleNav(){
        if(toggleBtnClass === 'main-nav') setToggleBtnClass('main-nav open')
        else setToggleBtnClass('main-nav')
     }
    return(
        <header className="main-header" >
             {loggedinUser && <p>Hello {loggedinUser.fullname}</p>}  
             <button className="toggle-nav-btn" onClick={toggleNav}>≡</button>
            <ul className={toggleBtnClass}>
                
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