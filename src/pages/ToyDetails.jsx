import { useEffect, useState } from 'react'
import { toyService } from '../services/toy.service.js'
import { Link, useParams } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { showErrorMsg } from '../services/event-bus.service.js'

export function ToyDetails() {
    const [toy, setToy] = useState(null)
    const { toyId } = useParams()
    const [msg, setMsg] = useState({ txt: '' })
    const { txt } = msg
    const user = useSelector((storeState) => storeState.userModule.loggedInUser)
    const [isOpen, setIsOpen] = useState(false)
    useEffect(() => {
        if (toyId) loadToy()
    }, [toyId])
    useEffect(() => {
        function onKeyDown(ev) {
            if (ev.key === 'Escape') {
                setIsOpen(false)
            }
        }

        window.addEventListener('keydown', onKeyDown)

        return () => {
            window.removeEventListener('keydown', onKeyDown)
        }
    }, [])
    function open() {
        setIsOpen(true)
    }
    async function loadToy() {
        try {
            const toy = await toyService.getById(toyId)
            setToy(toy)
        }

        catch (err) {
            console.log('Had issues in toy details', err)
            navigate('/toy')
        }
    }
    function handleChange(ev) {
        const field = ev.target.name
        const value = ev.target.value
        setMsg(msg => ({ ...msg, [field]: value }))
    }
    async function onSaveMsg(ev) {
        ev.preventDefault()
        try {
            const savedMsg = await toyService.addMsg(toy._id, msg)
            setToy(prevToy => ({
                ...prevToy,
                msgs: [...(prevToy.msgs || []), savedMsg],
            }))
            setMsg({ txt: '' })
            showSuccessMsg('Message saved!')
        } catch (error) {
            showErrorMsg('Cannot save message')
        }
    }
    if (!toy) return <div>Loading...</div>

    return (
        <section className="toy-details">
            <h1>Toy name: {toy.name}</h1>
            <h5>Toy price: {toy.price}$</h5>
            <h5>In Stock: {toy.inStock ? 'yes' : 'no'}</h5>
            <h5>Labels:</h5>
            <ul>{toy.labels.map(label =>
                <li key={label}>{label}</li>
            )}</ul>
            <img src={toy.imgUrl} />
            <ul>
             {toy.msgs &&
                toy.msgs.map(msg => (
                  <li key={msg.id}>
                    By: {msg.by ? msg.by.fullname : 'Unknown User'} - {msg.txt}
                  </li>
                ))}   
            </ul>
            {user && <div >
                <h1>Chat</h1>
                <form className='formik' method='post' onSubmit={onSaveMsg}>
                    <input
                        type='text'
                        placeholder='Enter your message'
                        name='txt'
                        value={txt}
                        required
                        onChange={handleChange}
                    />
                    <button>Send</button>
                </form>
            </div>}
            <Link to={`/toy/edit/${toy._id}`}>Edit</Link> &nbsp;
            <Link to={`/toy`}>Back</Link>
            <Popup isOpen={isOpen} setIsOpen={open}>
                <Chat />
            </Popup>
        </section>
    )
}
function Popup({ children, isOpen, setIsOpen }) {
    if (!isOpen) return (
        <button className='chat-btn' onClick={setIsOpen}><ChatIcon /></button>)

    return (
        <section>
            <header></header>
            <main>
                {children}
            </main>
            <footer></footer>
        </section>
    )
}
function Chat() {
    return (
        <section className='chat'>
            <ul>
                <li>Ya: Is there anyone here?</li>
                <li>Support: Sure thing honey</li>
            </ul>
            <div className='send-container'>
                <input type='text' />
                <button>Send</button>
            </div>
        </section>
    )
}
function ChatIcon() {
    return (
        <svg xmlns="http://www.w3.org/2000/svg"
            height="24px" viewBox="0 -960 960 960"
            width="24px" fill="#000000">
            <path d="M240-400h320v-80H240v80Zm0-120h480v-80H240v80Zm0-120h480v-80H240v80ZM80-80v-720q0-33 23.5-56.5T160-880h640q33 0 56.5 23.5T880-800v480q0 33-23.5 56.5T800-240H240L80-80Zm126-240h594v-480H160v525l46-45Zm-46 0v-480 480Z" /></svg>
    )
}