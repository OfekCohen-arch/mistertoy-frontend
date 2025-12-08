import { Link,NavLink } from "react-router-dom";

export function AppHeader(){

    return(
        <header className="main-header" title='Look At ME!' >
            
            <ul className="main-nav flex clean-list">
                <Link to="/"><div className="link">Home</div></Link>
                <NavLink to="/toy" className="link flex align-center">Toys</NavLink>
                
            </ul>
        </header >
    )
}