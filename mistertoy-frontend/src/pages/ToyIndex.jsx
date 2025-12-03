import { useEffect } from "react";
import { useSelector } from "react-redux";
import { loadToys } from "../store/actions/toy.actions.js";
import { ToyList } from "../cmps/ToyList.jsx";
import { Link } from "react-router-dom";

export function ToyIndex(){
    const toys = useSelector((storeState)=>storeState.toyModule.toys)
    const isLoading = useSelector((storeState)=>storeState.toyModule.isLoading)

    useEffect(()=>{
    loadToys()
    },[])
    if(isLoading) return 'Loading...'
    return(
        <>
        <h3>Mister Toys</h3>
        <Link to='/toy/edit'>Add Toy</Link>
        <ToyList toys={toys}/>
        </>
    )
}