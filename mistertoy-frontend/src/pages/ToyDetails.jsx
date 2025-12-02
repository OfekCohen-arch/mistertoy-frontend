import { useEffect, useState } from 'react'
import { toyService } from '../services/toy.service.local'
import { Link, useParams } from 'react-router-dom'

export function ToyDetails() {
    const [toy, setToy] = useState(null)
    const { toyId } = useParams()

    useEffect(() => {
        if (toyId) loadToy()
    }, [toyId])

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
            <h5>Toy price: {toy.price}</h5>
            <h5>In Stock: {toy.inStock ? 'yes' : 'no'}</h5>
            <Link to={`/toy/edit/${toy._id}`}>Edit</Link> &nbsp;
            <Link to={`/toy`}>Back</Link>
        </section>
    )
}