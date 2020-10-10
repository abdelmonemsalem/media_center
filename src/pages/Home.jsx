import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSignInAlt } from '@fortawesome/free-solid-svg-icons'
import {Link} from 'react-router-dom'

function Home() {
  return(
    <div className="mediaCenter-home">
      <h1>Welcome !</h1>
      <h3>This App using: <span>React</span>, <span>Redux</span>, <span>MongoDB</span>, <span>Bootstrap</span> & <span>NodeJS</span></h3>
      <figure>
        <img src="./img/react.png" alt="react" />
        <img src="./img/redux.png" alt="redux" />
        <img src="./img/mongodb.png" alt="mongoDb" />
        <img src="./img/bootstrap.png" alt="bootstrap" />
        <img src="./img/node.png" alt="nodeJS" />
      </figure>
      <div>
        <h5>Abd-elmonem Salem</h5>
        <h6>SR: Front-end Developer</h6>
      </div>
      <Link to="/MediaCenterShow">Start <FontAwesomeIcon icon={faSignInAlt}/></Link>
    </div>
  )
}

export default Home;