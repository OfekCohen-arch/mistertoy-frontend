import { useEffect, useState } from 'react'
import { toyService } from '../services/toy.service.local'
import { Link, useParams } from 'react-router-dom'

export function ToyDetails() {
    const [toy, setToy] = useState(null)
    const { toyId } = useParams()

    const [isOpen,setIsOpen] = useState(false)
    useEffect(() => {
        if (toyId) loadToy()
    }, [toyId])
   useEffect(()=>{
     function onKeyDown(ev) {
    if (ev.key === 'Escape') {
      setIsOpen(false)
    }
  }

  window.addEventListener('keydown', onKeyDown)

  return () => {
    window.removeEventListener('keydown', onKeyDown)
  }
   },[])
    function open(){
        setIsOpen(true)
    }
    function loadToy() {
        toyService.getById(toyId)
            .then(toy => setToy(toy))
            .catch(err => {
                console.log('Had issues in toy details', err)
                navigate('/toy')
            })
    }
    if (!toy) return <div>Loading...</div>
    
    return (
        <section className="toy-details">
            <h1>Toy name: {toy.name}</h1>
            <h5>Toy price: {toy.price}$</h5>
            <h5>In Stock: {toy.inStock ? 'yes' : 'no'}</h5>
            <h5>Labels:</h5>
            <ul>{toy.labels.map(label=>
                <li key={label}>{label}</li>
            )}</ul>
            <img src={toy.imgUrl}/>
            <Link to={`/toy/edit/${toy._id}`}>Edit</Link> &nbsp;
            <Link to={`/toy`}>Back</Link>
            <Popup isOpen={isOpen} setIsOpen={open}>
            <Chat/>
            </Popup>
        </section>
    )
}
function Popup({children,isOpen,setIsOpen}){
    if(!isOpen) return (
    <button className='chat-btn' onClick={setIsOpen}><ChatIcon/></button>)

return(
    <section>
    <header></header>
    <main>
        {children}
    </main>
    <footer></footer>
    </section>
)
}
function Chat(){
return(
    <section className='chat'>
     <ul>
        <li>Ya: Is there anyone here?</li>
        <li>Support: Sure thing honey</li>
    </ul> 
        <div className='send-container'>
        <input type='text'/>
        <button>Send</button>
        </div>  
    </section>
)
}
function ChatIcon(){
    return(
        <svg xmlns="http://www.w3.org/2000/svg"
         height="24px" viewBox="0 -960 960 960"
          width="24px" fill="#000000">
            <path d="M240-400h320v-80H240v80Zm0-120h480v-80H240v80Zm0-120h480v-80H240v80ZM80-80v-720q0-33 23.5-56.5T160-880h640q33 0 56.5 23.5T880-800v480q0 33-23.5 56.5T800-240H240L80-80Zm126-240h594v-480H160v525l46-45Zm-46 0v-480 480Z"/></svg>
    )
}