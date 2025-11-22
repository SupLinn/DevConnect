import {BrowserRouter, Routes, Route} from 'react-router'
import Body from './components/Body'
import Profile from './components/Profile'
import Login from './components/Login'
import {Provider} from 'react-redux'
import store from './utils/appStore'
import Feed from './components/Feed'
import Connections from './components/Connections'
import Requests from './components/Requests'


function App() {

  return (
    <>
      <Provider store={store}>
        <BrowserRouter basename="/">
          <Routes>
            <Route  path="/" element = {<Body/>}>
              <Route path ="/" element = {<Feed/>}/>
              <Route path = "/profile" element = {<Profile/>}/>
              <Route path = "/login" element ={<Login/>} />
              <Route path = "/connections" element ={<Connections/>} />
              <Route path = "/requests" element ={<Requests/>} />
            </Route>
          </Routes>
        </BrowserRouter>
      </Provider>
      
    </>
  )
}

export default App
