import { useEffect, useRef, useState } from "react";
import { utilService } from "../services/util.service.js";
import { LabelChooser } from "./LabelChooser";

export function ToyFilter({filterBy,onSetFilter}){
const [filterByToEdit,setFilterByToEdit] = useState({...filterBy})
onSetFilter = useRef(utilService.debounce(onSetFilter,300))
const labels = ['On wheels', 'Box game', 'Art', 'Baby', 'Doll', 'Puzzle',
'Outdoor', 'Battery Powered']
useEffect(()=>{
onSetFilter.current(filterByToEdit)
},[filterByToEdit])

function handleChange({ target }) {
        let { value, name: field, type } = target
        value = type === 'number' ? +value : value
        setFilterByToEdit((prevFilter) => ({ ...prevFilter, [field]: value }))
    }

    return(
        <section className="toy-filter">
        <form>
            <label htmlFor="name">Name:</label>
            <input id="name" name="name" type="text" onChange={handleChange} value={filterByToEdit.name}/>

            <label htmlFor="inStock">In Stock:</label>
            <select id="inStock" name="inStock" onChange={handleChange}>
            <option value={''}>All</option>
            <option value={true}>Yes</option>
            <option value={false}>No</option>
            </select>

            <LabelChooser labels={labels} filterBy={filterByToEdit} onSetFilterBy={setFilterByToEdit}/> 
        </form>
        </section>
    ) 
}
