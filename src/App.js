import React, { Component } from 'react'
import Header from './Components/Header.jsx'
import CreateMediaItem from './Components/pages/CreateMediaItem.jsx'
import ViewMediaItem from './Components/pages/ViewMediaItem.jsx'
import EditMediaItem from './Components/pages/EditMediaItem.jsx'
import MediaCenterShow from './Components/pages/MediaCenterShow.jsx'
import Home from './Components/pages/Home.jsx'
import {BrowserRouter, Route, Switch} from 'react-router-dom'
import 'react-notifications-component/dist/theme.css'
import './App.css';

class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <Header />
        <Switch>
          <Route path="/" exact component={Home} />
          <Route path="/CreateMediaItem" component={CreateMediaItem} />
          <Route path="/MediaCenterShow" component={MediaCenterShow} />
          <Route path="/ViewMediaItem/:id" component={ViewMediaItem} />
          <Route path="/EditMediaItem/:id" component={EditMediaItem} />
        </Switch>
      </BrowserRouter>
    )
  }
}

export default App
