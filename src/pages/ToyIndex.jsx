import { useEffect } from "react";
import { useSelector } from "react-redux";
import { loadToys, removeToy, setFilterBy } from "../store/actions/toy.actions.js";
import { ToyList } from "../cmps/ToyList.jsx";
import { Link } from "react-router-dom";
import { showErrorMsg, showSuccessMsg } from "../services/event-bus.service.js";
import { ToyFilter } from "../cmps/ToyFilter.jsx";
import { toyService } from "../services/toy.service.local.js";
import { Button } from "@mui/material";


export function ToyIndex(){
    const toys = useSelector((storeState)=>storeState.toyModule.toys)
    const filterBy = useSelector((storeState)=>storeState.toyModule.filterBy)
    const isLoading = useSelector((storeState)=>storeState.toyModule.isLoading)
    const labels = toyService.getLabels()
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

        <section>
        <h3>Mister Toys</h3>
         <ToyFilter filterBy={filterBy} onSetFilter={setFilterBy} labels={labels}/>
        <Button variant="Add Toy"><Link to='/toy/edit'>Add Toy</Link></Button><br/>
       {!isLoading ?
       <ToyList toys={toys} onRemoveToy={onRemoveToy}/>
       :
       'Loading...'
       }
        </section>
    )
}