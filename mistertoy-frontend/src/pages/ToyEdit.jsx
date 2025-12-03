import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { toyService } from "../services/toy.service.local.js";
import { saveToy } from "../store/actions/toy.actions.js";
import { showSuccessMsg } from "../services/event-bus.service.js";


export function ToyEdit(){
  const {toyId} = useParams()  
  const [toy,setToy] = useState(toyService.getEmptyToy())
  const navigate = useNavigate()
    useEffect(()=>{
     if(toyId) loadToy()
    },[])

   function loadToy(){
    toyService.getById(toyId)
    .then(setToy)
    .catch(err => {
                console.log('Had issues in toy edit', err)
                navigate('/toy')
            })
   }
   function handleChange({ target }) {
        const field = target.name
        let value = target.value

        switch (target.type) {
            case 'number':
            case 'range':
                value = +value || ''
                break

            case 'checkbox':
                value = target.checked
                break

            default:
                break
        }
        setToy((prevToy) => ({ ...prevToy, [field]: value }))
    }

    function onSaveToy(ev){
    ev.preventDefault()
    saveToy(toy)
    .then(
      (savedToy)=>{
        showSuccessMsg('Toy Saved (id:',savedToy._id,')')
        navigate('/toy')
      }
    )
    }
    
  return(
    <section className="toy-edit">
    <h2>{toy._id ? 'Edit' : 'Add' } Toy</h2>
    <form onSubmit={onSaveToy}>
      <label htmlFor="name">Name:</label>  
      <input value={toy.name || ''} name="name" type="text" onChange={handleChange}/>

      <label htmlFor="price">price:</label>  
      <input value={toy.price || 0} name="price" type="number" onChange={handleChange}/>

      <label htmlFor="inStock">in stock:</label>  
      <input  name="inStock"  type="checkbox" checked={toy.inStock ?? true} value={toy.inStock ?? true} onChange={handleChange}/>
      <button>Save</button>
      <Link to='/toy'>Cancel</Link>
    </form>
    </section>
  )
  
}