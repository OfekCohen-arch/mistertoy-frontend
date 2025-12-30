import { httpService } from "./http.service.js";

const STORAGE_KEY = 'review'

export const reviewService = {
query,
getById,
remove,
save,
getEmptyReview,
getDefaultFilter
}

async function query(filterBy){
    return httpService.get(STORAGE_KEY,filterBy)
}
async function getById(reviewId){
return httpService.get(`review/${reviewId}`);
}
async function remove(reviewId){
    return httpService.delete(`review/${reviewId}`)
}
async function save(review){
    var savedReview = await httpService.post('review',review)
    return savedReview
}
function getEmptyReview(toyId){
    return{
        toyId: toyId,
        txt:''
    }
}
function getDefaultFilter(){
    return {toyName:'',username:''}
}