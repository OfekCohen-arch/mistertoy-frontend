import { useEffect } from "react";
import { useSelector } from "react-redux";
import { loadToys, removeToy, setFilterBy } from "../store/actions/toy.actions.js";
import { ToyList } from "../cmps/ToyList.jsx";
import { Link, useNavigate } from "react-router-dom";
import { showErrorMsg, showSuccessMsg } from "../services/event-bus.service.js";
import { ToyFilter } from "../cmps/ToyFilter.jsx";
import { toyService } from "../services/toy.service.js";
import { Button } from "@mui/material";


export function ToyIndex(){
    const toys = useSelector((storeState)=>storeState.toyModule.toys)
    const filterBy = useSelector((storeState)=>storeState.toyModule.filterBy)
    const isLoading = useSelector((storeState)=>storeState.toyModule.isLoading)
    const labels = toyService.getLabels()
    const navigate = useNavigate()
    useEffect(()=>{
    loadToys(filterBy)
    },[filterBy])

   async function onRemoveToy(toyId){
        if(!confirm('Are you sure?')) return
        try{
            await removeToy(toyId)
            showSuccessMsg('The Toy (id: ',toyId,') removed!')
        }
        catch{
          Swal.fire('Only admin can remove toys!')
          showErrorMsg('Cannot remove toy')  
        }
    }

    
    return(

        <section>
        <h3>Mister Toys</h3>
         <ToyFilter filterBy={filterBy} onSetFilter={setFilterBy} labels={labels}/>
        <Link to='/toy/edit'><Button style={{border:'1px solid black'}} variant="Add Toy">Add Toy</Button></Link><br/>
       {!isLoading ?
       <ToyList toys={toys} onRemoveToy={onRemoveToy}/>
       :
       'Loading...'
       }
        </section>
    )
}