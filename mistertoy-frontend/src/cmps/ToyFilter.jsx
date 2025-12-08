import { useEffect, useRef, useState } from "react";
import { utilService } from "../services/util.service.js";
import { LabelChooser } from "./LabelChooser";

export function ToyFilter({filterBy,onSetFilter,labels}){
const [filterByToEdit,setFilterByToEdit] = useState({...filterBy})
onSetFilter = useRef(utilService.debounce(onSetFilter,300))
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
        <div className="sort-field">
                    <label className="tag" >
                        <span>Name</span>
                        <input
                            type="radio"
                            name="sortField"
                            value="name"
                            checked={filterByToEdit.sortField === 'name'}
                            onChange={handleChange}
                        />
                    </label>
                    <label className="tag" >
                        <span>Price</span>
                        <input
                            type="radio"
                            name="sortField"
                            value="price"
                            checked={filterByToEdit.sortField === 'price'}            
                            onChange={handleChange}
                        />
                    </label>
                    <label className="tag" >
                        <span>Created At</span>
                        <input
                            type="radio"
                            name="sortField"
                            value="createdAt"
                            checked={filterByToEdit.sortField === 'createdAt'}                        
                            onChange={handleChange}
                        />
                    </label>
                </div>
        </section>
    ) 
}
