import { storageService } from "./async-storage.service";
import { utilService } from "./util.service";

const STORAGE_KEY = "toyDB";

export const toyService = {
  query,
  getById,
  remove,
  save,
  getDefaultFilter,
  getEmptyToy,
};

function query(filterBy = {}) {
  return storageService.query(STORAGE_KEY).then((toys) => {
    var filteredToys = toys;
    if (filterBy.name) {
      filteredToys = toys.filter((toy) => RegExp.test(toy.name));
    }
    if (filterBy.inStock) {
      filteredToys = toys.filter((toy) => toy.inStock === filterBy.inStock);
    }
    if (filterBy.labels && filterBy.labels.length > 0) {
      filteredToys = toys.filter((toy) =>
        filterBy.labels.some((label) => toy?.labels?.includes(label))
      );
    }
    return filteredToys
  });
}

function getById(toyId) {
  return storageService.get(STORAGE_KEY, toyId);
}

function remove(toyId) {
  return storageService.remove(STORAGE_KEY, toyId);
}

function save(toy) {
  if (toy._id) {
    return storageService.put(STORAGE_KEY, toy);
  } else {
    return storageService.post(STORAGE_KEY, toy);
  }
}

function getEmptyToy() {
  return {
    name: "",
    imgUrl: "",
    price: "",
    labels: [],
    inStock: true,
  };
}

function getDefaultFilter() {
  return { name: "", inStock: "", labels: [] };
}
