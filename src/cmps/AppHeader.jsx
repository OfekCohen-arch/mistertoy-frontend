import { Link,NavLink } from "react-router-dom";
import { useOnlineStatus } from "../hooks/useOnlineStatus.js";

export function AppHeader(){
const isOnline = useOnlineStatus()
    return(
        <header className="main-header" title='Look At ME!' >
            
            <ul className="main-nav">
                <NavLink to="/"><div className="link">Home</div></NavLink>
                <NavLink to="/toy" className="link">Toys</NavLink>
                <NavLink to="/dashboard" className='link'>Dashboard</NavLink>
                <NavLink to="/about" className='link'>About</NavLink>
            </ul>
            <p>{isOnline ? '✅ Online' : '❌ Disconnected'}</p>
        </header >
    )
}