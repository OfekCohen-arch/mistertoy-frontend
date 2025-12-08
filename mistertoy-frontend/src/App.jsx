import { store } from './store/store.js'
import { Provider } from 'react-redux'
import './assets/style/main.css'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'

import './App.css'
import { ToyIndex } from './pages/ToyIndex.jsx'
import { ToyDetails } from './pages/ToyDetails.jsx'
import { ToyEdit } from './pages/ToyEdit.jsx'
import { Home } from './pages/Home.jsx'
import { AppHeader } from './cmps/AppHeader.jsx'

function App() {

  return (
    <Provider store={store}>
      <Router>
        <section className='app'>
          <AppHeader/>
          <main>
          <Routes>
            <Route element={<Home/>} path='/'/>
          <Route element={<ToyIndex/>} path='/toy'/>
          <Route element={<ToyEdit/>} path='/toy/edit'/>
          <Route element={<ToyEdit/>} path='/toy/edit/:toyId'/>
          <Route element={<ToyDetails/>} path='/toy/:toyId'/>
          </Routes>
          </main>
        </section>
      </Router>
    </Provider>
  )
}

export default App
