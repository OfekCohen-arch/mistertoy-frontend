import { useEffect, useRef, useState } from "react"
import { utilService } from "../services/util.service.js"

export function ReviewFilter({ filterBy, onSetFilterBy }) {
    const [filterByToEdit, setFilterByToEdit] = useState({ ...filterBy })
    onSetFilterBy = useRef(utilService.debounce(onSetFilterBy, 300))
    useEffect(() => {
        onSetFilterBy.current(filterByToEdit)
    }, [filterByToEdit])

    function handleChange({ target }) {
        let { value, name: field, type } = target
        value = type === 'number' ? +value : value
        setFilterByToEdit((prevFilter) => ({ ...prevFilter, [field]: value }))
    }


    return (
        <section>
            <form className="formik">
            <label htmlFor="username">Username:</label>
            <input type="text" name="username" onChange={handleChange} />
            <label htmlFor="toyName">Toy name:</label>
            <input type="text" name="toyName" onChange={handleChange} />
        </form>
        </section>
    )
}