import { store } from "../store.js";
import {
  SET_IS_LOADING,
  SET_REVIEWS,
  ADD_REVIEW,
  SET_FILTER_BY,
} from "../reducers/review.reducer.js";
import { reviewService } from "../../services/review.service.js";
import { userService } from "../../services/user.service.js";

export async function loadReviews(filterBy) {
  store.dispatch({ type: SET_IS_LOADING, isLoading: true });

  try {
    const reviews = await reviewService.query(filterBy);
    var filteredReviews = reviews;
    if (filterBy.toyName || filterBy.username) {
      filteredReviews = filteredReviews.filter((review) =>
        review.byToy?.name
          ?.toLowerCase()
          .startsWith(filterBy?.toyName?.toLowerCase())
      );
      filteredReviews = filteredReviews.filter((review) =>
        review.byUser?.username
          ?.toLowerCase()
          .startsWith(filterBy?.username?.toLowerCase())
      );
    }
    store.dispatch({ type: SET_REVIEWS, reviews: filteredReviews });
    return filteredReviews;
  } catch (error) {
    console.log("cannot load reviews", error);
    throw error;
  } finally {
    store.dispatch({ type: SET_IS_LOADING, isLoading: false });
  }
}
export async function addReview(review) {
  try {
    const userId = await userService.getLoggedInUser()._id;
    review = { ...review, userId };
    const savedReview = await reviewService.save(review);
    store.dispatch({ type: ADD_REVIEW, review: savedReview });
    return savedReview;
  } catch (error) {
    console.log("cannot save review ", error);
    throw error;
  }
}
export function setFilterBy(filterBy) {
  store.dispatch({ type: SET_FILTER_BY, filterBy });
}
