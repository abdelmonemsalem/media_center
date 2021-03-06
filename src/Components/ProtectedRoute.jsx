import React from 'react'
import { Route, Redirect } from 'react-router-dom'
import { connect } from 'react-redux'


const ProtectedRoute = ({ component: Component, ...rest } ) => {
    console.log(rest)
    return (
        <Route {...rest} 
        render={props => {
            if(rest.logStatus && (rest.userType === 'admin') && (rest.userConfirmed === 'true')) {
                return <Component {...props} />
            }
            if(rest.logStatus && (rest.userType === 'user') && (rest.userConfirmed === 'true') && (rest.path.includes("/ViewMediaItem") || rest.path === '/MediaCenterShow')) {
                return <Component {...props} />
            }
            else {
                return <Redirect to={
                    {
                        pathname: '/login',
                        state: {
                            from: props.location
                        }
                    }
                } />
            }
        } 
        } />
    )
}

const mapStateToProps = state => {
    return {
        logStatus: state.user.logStatus,
        userType: state.user.userType,
        userConfirmed: state.user.userConfirmed
    }
}

export default connect(mapStateToProps)(ProtectedRoute)