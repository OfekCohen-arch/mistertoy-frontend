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
import { Dashboard } from './pages/Dashboard.jsx'
import { About } from './pages/About.jsx'
import { LoginSignup } from './pages/LoginSignup.jsx'
import { UserDetails } from './pages/UserDetails.jsx'
import { AdminIndex } from './pages/AdminIndex.jsx'
import { ReviewIndex } from './pages/ReviewIndex.jsx'
import { UserMsg } from './cmps/UserMsg.jsx'

function App() {

  return (
    <Provider store={store}>
      <Router>
        <section className='app'>
          <AppHeader />
          <main>
            <Routes>
              <Route element={<Home />} path='/' />
              <Route element={<About/>} path='/about'/>
              <Route element={<Dashboard />} path='/dashboard' />
              <Route element={<ToyIndex />} path='/toy' />
              <Route element={<ToyEdit />} path='/toy/edit' />
              <Route element={<ToyEdit />} path='/toy/edit/:toyId' />
              <Route element={<ToyDetails />} path='/toy/:toyId' />
              <Route element={<LoginSignup/>} path='/login'/>
              <Route element={<AdminIndex/>} path='/user'/>
              <Route element={<UserDetails/>} path='/user/:userId'/>
              <Route element={<ReviewIndex/>} path='/review'/>
            </Routes>
          </main>
        </section>
      </Router>
      <UserMsg/>
    </Provider>
  )
}

export default App
