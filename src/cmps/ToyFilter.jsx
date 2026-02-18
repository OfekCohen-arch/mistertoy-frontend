import { useEffect, useRef, useState } from "react";
import Select, { components } from 'react-select';
import { utilService } from "../services/util.service.js";
import { LabelChooser } from "./LabelChooser";


export function ToyFilter({ filterBy, onSetFilter, labels }) {
    const [filterByToEdit, setFilterByToEdit] = useState({ ...filterBy })
    onSetFilter = useRef(utilService.debounce(onSetFilter, 300))
    const [selectedLabels, setSelectedLabels] = useState([])
    const labelsOptions = labels.map(label => ({ label: label, value: label }))
    useEffect(() => {
        onSetFilter.current(filterByToEdit)
    }, [filterByToEdit])

    function handleChange({ target }) {
        let { value, name: field, type } = target
        value = type === 'number' ? +value : value
        setFilterByToEdit((prevFilter) => ({ ...prevFilter, [field]: value }))
    }

    return (
        <section className="toy-filter">
            <form>
                <label htmlFor="name">Name:</label>
                <input id="name" name="name" placeholder="search" type="search" onChange={handleChange} value={filterByToEdit.name} />

                <label htmlFor="inStock">In Stock:</label>
                <select id="inStock" name="inStock" onChange={handleChange}>
                    <option value={''}>All</option>
                    <option value={true}>Yes</option>
                    <option value={false}>No</option>
                </select>
                <div style={{ width: '300px', margin: '50px auto' }}>
                    <label>Select labels:</label>
                    <Select
                        isMulti
                        closeMenuOnSelect={false}
                        hideSelectedOptions={false}
                        components={{ Option }}
                        options={labelsOptions}
                        onChange={(selected) => {
                            setSelectedLabels(selected)
                            setFilterByToEdit(prev => ({ ...prev, labels: selected.map(s => s.value) }))
                        }}
                        value={selectedLabels}
                        placeholder="Search..."
                    />
                </div>

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
    function Option(props) {
        return (
            <div>
                <components.Option {...props}>
                    <input
                        readOnly
                        type="checkbox"
                        checked={props.isSelected}
                        style={{ marginRight: '10px' }}
                    />
                    <label>{props.label}</label>
                </components.Option>
            </div>
        )
    }
}
