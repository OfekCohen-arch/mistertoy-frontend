import { useEffect, useState,useRef } from 'react'
import { toyService } from '../services/toy.service.js'
import { Link, useParams } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { showErrorMsg } from '../services/event-bus.service.js'
import { ReviewList } from '../cmps/ReviewList.jsx'
import { reviewService } from '../services/review.service.js'
import { addReview, loadReviews } from '../store/actions/review.actions.js'
import { SOCKET_EMIT_SEND_MSG, SOCKET_EMIT_SET_TOPIC, SOCKET_EVENT_ADD_MSG, socketService } from '../services/socket.service.js'
export function ToyDetails() {
    
    const [toy, setToy] = useState(null)
    const { toyId } = useParams()
    const user = useSelector((storeState) => storeState.userModule.loggedInUser)
    const [msgs, setMsgs] = useState([])
    const [msg, setMsg] = useState({ txt: '' })
    const { txt } = msg
    const reviews = useSelector((storeState) => storeState.reviewModule.reviews)
    const [reviewToEdit, setReviewToEdit] = useState(reviewService.getEmptyReview(toyId))
    const [isOpen, setIsOpen] = useState(false)
    useEffect(() => {
        if (toyId) {
            loadToy()
            loadReviews({ toyId })
            socketService.emit(SOCKET_EMIT_SET_TOPIC, toyId)
        }
    }, [toyId])
    useEffect(() => {
        function onKeyDown(ev) {
            if (ev.key === 'Escape') {
                setIsOpen(false)
            }
        }
        
        window.addEventListener('keydown', onKeyDown)
        socketService.on(SOCKET_EVENT_ADD_MSG, addMsg)

        return () => {
            window.removeEventListener('keydown', onKeyDown)
            socketService.off(SOCKET_EVENT_ADD_MSG, addMsg)
        }
    }, [])
    function addMsg(newMsg) {
        console.log('new msg:', newMsg);

        setMsgs(prevMsgs => [...prevMsgs, newMsg])
    }

    function open() {
        setIsOpen(true)
    }
    async function loadToy() {
        try {
            const toy = await toyService.getById(toyId)
            setToy(toy)
            setMsgs(toy.msgs || [])
        }

        catch (err) {
            console.log('Had issues in toy details', err)
            navigate('/toy')
        }
    }
    function handleChangeMsg(ev) {
        const field = ev.target.name
        const value = ev.target.value
        setMsg(msg => ({ ...msg, [field]: value }))
    }
    function handleChangeReview(ev) {
        const field = ev.target.name
        const value = ev.target.value
        setReviewToEdit(review => ({ ...review, [field]: value }))
    }
    async function onSaveMsg(ev) {
        ev.preventDefault()
        try {
            const savedMsg = await toyService.addMsg(toy._id, msg)
            setToy(prevToy => ({
                ...prevToy,
                msgs: [...(prevToy.msgs || []), savedMsg],
            }))

            socketService.emit(SOCKET_EMIT_SEND_MSG, savedMsg)
            setMsg({ txt: '' })
            showSuccessMsg('Message saved!')
        } catch (error) {
            showErrorMsg('Cannot save message')
        }
    }
    async function onSaveReview(ev) {
        ev.preventDefault()
        try {
            await addReview(reviewToEdit)
        }
        catch (error) {
            Swal.fire('Only logged in user can write a review!')
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

            </ul>
            <div style={{ border: '1px black solid', margin: '20px' }}>
                <h3>Add a review</h3>
                <form method='post' className='formik' onSubmit={onSaveReview}>
                    <input type='text'
                        name='txt'
                        placeholder='Write your review here'
                        onChange={handleChangeReview}
                    />
                    <button>Send</button>
                </form>
            </div>
            <ReviewList reviews={reviews} />
            <Link to={`/toy/edit/${toy._id}`}>Edit</Link> &nbsp;
            <Link to={`/toy`}>Back</Link>
            <Popup isOpen={isOpen} setIsOpen={open}>
                <Chat msgs={msgs} handleChangeMsg={handleChangeMsg} onSaveMsg={onSaveMsg} txt={txt} />
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
function Chat({ msgs, handleChangeMsg, onSaveMsg, txt }) {
    const messagesEndRef = useRef(null)
    useEffect(() => {
            messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
        }, [msgs])
    return (
        <section className='chat'>
            <div className='chat-list'>
            <ul>
                {msgs &&
                    msgs.map(msg => (
                        <li key={msg.id}>
                            By: {msg.by ? msg.by.fullname : 'Unknown User'} - {msg.txt}
                        </li>
                    ))}
            </ul>
            <div ref={messagesEndRef}/>
            </div>
            
            <div className='send-container'>
                <form className='send-container' method='post' onSubmit={onSaveMsg}>
                    <input
                        type='text'
                        placeholder='Enter your message'
                        name='txt'
                        value={txt}
                        required
                        onChange={handleChangeMsg}
                    />
                    <button>Send</button>
                </form>
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