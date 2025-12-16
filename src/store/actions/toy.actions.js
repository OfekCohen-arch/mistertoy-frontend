import { toyService } from "../../services/toy.service.local.js";
import { showSuccessMsg } from "../../services/event-bus.service.js";
import {
  SET_TOYS,
  REMOVE_TOY,
  UPDATE_TOY,
  ADD_TOY,
  SET_FILTER_BY,
  SET_IS_LOADING,
} from "../reducers/toy.reducer.js";
import { store } from "../store.js";

export async function loadToys(filterBy) {
  store.dispatch({ type: SET_IS_LOADING, isLoading: true });
  try {
    const toys = await toyService.query(filterBy);
    store.dispatch({ type: SET_TOYS, toys });
  } catch (err) {
    console.log("toy action -> Cannot load toys", err);
    throw err;
  } finally {
    store.dispatch({ type: SET_IS_LOADING, isLoading: false });
  }
}

export function removeToy(toyId) {
  try {
    toyService.remove(toyId);
    store.dispatch({ type: REMOVE_TOY, toyId });
  }
   catch (err) {
    console.log("toy action -> Cannot remove toy", err);
    throw err;
  }
}

export async function saveToy(toy) {
  const type = toy._id ? UPDATE_TOY : ADD_TOY;
  try{
   const savedToy = await toyService.save(toy)
   store.dispatch({ type, toy: savedToy });
      return savedToy;
  }
  catch(err){
   console.log("toy action -> Cannot save toy", err);
      throw err;
  }
  
}

export function setFilterBy(filterBy) {
  store.dispatch({ type: SET_FILTER_BY, filterBy });
}
