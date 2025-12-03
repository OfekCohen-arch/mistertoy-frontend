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
    toy.createdAt = Date.now()
    return storageService.post(STORAGE_KEY, toy);
  }
}

function getEmptyToy() {
  return {
    name: "",
    imgUrl: "src/assets/react.svg",
    price: "",
    labels: [],
    inStock: true,
  };
}

function getDefaultFilter() {
  return { name: "", inStock: "", labels: [] };
}
function  _createToys(){
  const labels = ['On wheels', 'Box game', 'Art', 'Baby', 'Doll', 'Puzzle',
'Outdoor', 'Battery Powered']
for (let i = 0; i < 10; i++) {
  const toy = {
    name: utilService.makeLorem(2),
    imgUrl: 'src/assets/react.svg',
    price: utilService.getRandomIntInclusive(50,200),
    labels: [labels[utilService.getRandomIntInclusive(0,labels.length-1)]],
    inStock: (i % 2 === 0) ? true : false
  }
  save(toy)
}
}
/*const toy = {
_id: 't101',
name: 'Talking Doll',
imgUrl: 'hardcoded-url-for-now',
price: 123,
labels: ['Doll', 'Battery Powered', 'Baby'],
createdAt: 1631031801011,
inStock: true,
}*/