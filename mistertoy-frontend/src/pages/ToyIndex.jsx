import { useEffect } from "react";
import { useSelector } from "react-redux";
import { loadToys, removeToy } from "../store/actions/toy.actions.js";
import { ToyList } from "../cmps/ToyList.jsx";
import { Link } from "react-router-dom";
import { showErrorMsg, showSuccessMsg } from "../services/event-bus.service.js";
import { LabelChooser } from "../cmps/LabelChooser.jsx";

export function ToyIndex(){
    const toys = useSelector((storeState)=>storeState.toyModule.toys)
    const isLoading = useSelector((storeState)=>storeState.toyModule.isLoading)
    const labels = ['On wheels', 'Box game', 'Art', 'Baby', 'Doll', 'Puzzle',
                 'Outdoor', 'Battery Powered']
    useEffect(()=>{
    loadToys()
    },[])

    function onRemoveToy(toyId){
    removeToy(toyId)
    .then(
        ()=> {showSuccessMsg('The Toy (id: ',toyId,') removed!')}
    )
    .catch((err)=>{
     showErrorMsg('Cannot remove toy')
    })
    }

    if(isLoading) return 'Loading...'
    return(
        <>
        <h3>Mister Toys</h3>
        <LabelChooser labels={labels}/>
        <Link to='/toy/edit'>Add Toy</Link>
        <ToyList toys={toys} onRemoveToy={onRemoveToy}/>
        </>
    )
}