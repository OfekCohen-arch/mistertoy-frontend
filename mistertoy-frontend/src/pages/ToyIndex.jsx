import { useEffect } from "react";
import { useSelector } from "react-redux";
import { loadToys, removeToy, setFilterBy } from "../store/actions/toy.actions.js";
import { ToyList } from "../cmps/ToyList.jsx";
import { Link } from "react-router-dom";
import { showErrorMsg, showSuccessMsg } from "../services/event-bus.service.js";
import { ToyFilter } from "../cmps/ToyFilter.jsx";

export function ToyIndex(){
    const toys = useSelector((storeState)=>storeState.toyModule.toys)
    const filterBy = useSelector((storeState)=>storeState.toyModule.filterBy)
    const isLoading = useSelector((storeState)=>storeState.toyModule.isLoading)

    useEffect(()=>{
    loadToys(filterBy)
    },[filterBy])

    function onRemoveToy(toyId){
    removeToy(toyId)
    .then(
        ()=> {showSuccessMsg('The Toy (id: ',toyId,') removed!')}
    )
    .catch((err)=>{
     showErrorMsg('Cannot remove toy')
    })
    }

    
    return(

        <>
        <h3>Mister Toys</h3>
         <ToyFilter filterBy={filterBy} onSetFilter={setFilterBy}/>
        <Link to='/toy/edit'>Add Toy</Link>
       {!isLoading ?
       <ToyList toys={toys} onRemoveToy={onRemoveToy}/>
       :
       'Loading...'
       }
        
        </>
    )
}