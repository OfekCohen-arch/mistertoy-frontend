import { useState,useEffect } from "react"

export function LabelChooser({ labels, filterBy, onSetFilterBy }) {
    const labelMap = {}
    labels.forEach(label => labelMap[label] = false)

    const [ selectedLabels, setSelectedLabels ] = useState(labelMap)

    useEffect(() => {
        onSetFilterBy({ ...filterBy, 
            labels: Object.keys(selectedLabels)
                .filter(label => selectedLabels[label]) })
    }, [selectedLabels])

    function resetLabels(ev) {
        ev.preventDefault()
        labels.forEach(label => labelMap[label] = false)
        setSelectedLabels(labelMap)
    }

    function handleChange({ target }) {
        const { name, checked } = target
        setSelectedLabels(prev => ({ ...prev, [name]: checked }))
    }

    return <fieldset className="label-chooser">
        {labels.map(label => 
            <label key={label} className="tag">
                <input 
                    onChange={handleChange} 
                    name={label}
                    checked={selectedLabels[label]}
                    type="checkbox" />
                <span>{label}</span>
            </label>)}
            <button onClick={resetLabels}>Clear Labels</button>
    </fieldset>
}