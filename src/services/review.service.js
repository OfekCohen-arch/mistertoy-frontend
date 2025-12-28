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

async function query(){
    return httpService.get(STORAGE_KEY)
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
function getEmptyReview(userId,toyId){
    return{
        userId: userId,
        toyId: toyId,
        txt:''
    }
}
function getDefaultFilter(){
    return {txt:'', toyName:''}
}