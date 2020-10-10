import React, { Component } from 'react'
import Header from './Components/Header.jsx'
import CreateMediaItem from './pages/CreateMediaItem.jsx'
import ViewMediaItem from './pages/ViewMediaItem.jsx'
import EditMediaItem from './pages/EditMediaItem.jsx'
import MediaCenterShow from './pages/MediaCenterShow.jsx'
import UsersSetting from './pages/UsersSetting.jsx'
import Login from './pages/auth/login.jsx'
import Registration from './pages/auth/registration.jsx'
import UserPage from './pages/UserPage.jsx'
import Fav from './pages/Fav.jsx'
import Home from './pages/Home.jsx'
import {BrowserRouter, Route, Switch} from 'react-router-dom'
import 'react-notifications-component/dist/theme.css'
import './App.css';
import store from './store/store';
import { Provider } from 'react-redux'
import ProtectedRoute from './Components/ProtectedRoute'
import Container from 'react-bootstrap/Container'

class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <Header />
        <Container>
          <Switch>
            <Route path="/" exact component={Home} />
            <ProtectedRoute path="/CreateMediaItem" component={CreateMediaItem} />
            <ProtectedRoute path="/MediaCenterShow" component={MediaCenterShow} />
            <ProtectedRoute path="/ViewMediaItem/:id" component={ViewMediaItem} />
            <ProtectedRoute path="/EditMediaItem/:id" component={EditMediaItem} />
            <ProtectedRoute path="/UsersSetting" component={UsersSetting} />
            <Route path="/UserPage" component={UserPage} />
            <ProtectedRoute path="/Fav" component={Fav} />
            <Route path="/login" component={Login} />
            <Route path="/registration" component={Registration} />
          </Switch>
        </Container>
      </BrowserRouter>
    )
  }
}

function AppWithStore() {
  return <Provider store={store}>
      <App />
    </Provider>
}

export default AppWithStore;
