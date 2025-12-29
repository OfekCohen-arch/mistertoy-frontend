import { httpService } from "./http.service.js";
import { utilService } from "./util.service.js";
const STORAGE_KEY = "toy";
export const toyService = {
  query,
  getById,
  remove,
  save,
  addMsg,
  getEmptyToy,
  getDefaultFilter,
  getLabels,
  getLabelsStats,
  getToysInStockStats,
};

async function query(filterBy = {}) {
  return httpService.get(STORAGE_KEY, filterBy);
}
function getById(toyId) {
  return httpService.get(`toy/${toyId}`);
}

async function remove(toyId) {
  return httpService.delete(`toy/${toyId}`);
}
async function save(toy) {
  var savedToy;
  if (toy._id) {
    savedToy = await httpService.put(`toy/${toy._id}`, toy);
  } else {
    savedToy = await httpService.post("toy", toy);
  }
  return savedToy;
}
async function addMsg(toyId,msg){
  return httpService.post(`toy/${toyId}/msg`,msg)
}
function getEmptyToy() {
  return {
    name: "",
    imgUrl: "https://robohash.org/123",
    price: 0,
    labels: [],
    inStock: true,
  };
}

function getDefaultFilter() {
  return { name: "", inStock: "", labels: [] };
}
function _createToys() {
  const labels = [
    "On wheels",
    "Box game",
    "Art",
    "Baby",
    "Doll",
    "Puzzle",
    "Outdoor",
    "Battery Powered",
  ];
  for (let i = 0; i < 10; i++) {
    const toy = {
      name: utilService.makeLorem(2),
      imgUrl: "https://robohash.org/123",
      price: utilService.getRandomIntInclusive(50, 200),
      labels: [labels[utilService.getRandomIntInclusive(0, labels.length - 1)]],
      inStock: i % 2 === 0 ? true : false,
    };
    save(toy);
  }
}
function getLabels() {
  return [
    "On wheels",
    "Box game",
    "Art",
    "Baby",
    "Doll",
    "Puzzle",
    "Outdoor",
    "Battery Powered",
  ];
}
async function getLabelsStats() {
  try {
    const toys = await query();
    
    const toysCountByLabelMap = _getToysCountByLabelMap(toys);
    const data = Object.keys(toysCountByLabelMap).map(
      (label) => toysCountByLabelMap[label]
    );
    return data;
  } catch (err) {
    console.log("cannot load toys ", err);
    throw err;
  }
}
async function getToysInStockStats() {
  try{
   const toys = await toyService.query()
   const toysInStockByLabelMap = _getToysInStockByLabelMap(toys);
    const data = Object.keys(toysInStockByLabelMap).map(
      (label) => toysInStockByLabelMap[label]
    );
    return data;
  }
  catch(err){
   console.log('cannot load toys ',err);
   throw err
   
  }
}
function _getToysCountByLabelMap(toys) {
  const labels = toyService.getLabels();
  const labelsMap = {};
  labels.forEach((label) => (labelsMap[label] = 0));
  const toysCountByLabelMap = toys.reduce((map, toy) => {
    const toyLabels = toy.labels;
    toyLabels.forEach((label) => map[label]++);
    return map;
  }, labelsMap);
  return toysCountByLabelMap;
}
function _getToysInStockByLabelMap(toys) {
  const labels = toyService.getLabels();
  const labelsMap = {};
  labels.forEach((label) => (labelsMap[label] = 0));
  const toysInStockByLabelMap = toys.reduce((map, toy) => {
    const toyLabels = toy.labels;
    if (toy.inStock) toyLabels.forEach((label) => map[label]++);
    return map;
  }, labelsMap);
  return toysInStockByLabelMap;
}
