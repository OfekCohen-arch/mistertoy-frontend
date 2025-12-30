import { useEffect } from "react"
import { useSelector } from "react-redux"
import { loadUsers } from "../store/actions/user.actions.js"
import { UserPreview } from "../cmps/UserPreview.jsx"

export function AdminIndex(){
    const users = useSelector((storeState)=>storeState.userModule.users)
    useEffect(()=>{
        loadUsers()
    },[])
    return(
        <section>
            <h1>Users</h1>
       <ul className="user-list">
                   {users.length>0 &&users.map(
                      user=>
                       <li key={user._id}>
                       <UserPreview user={user}/>
                       </li> 
                   )}
                   {
                       users.length === 0 &&
                       <p>There are not users yet</p>
                   }
               </ul>
               </section>
    )
    }
