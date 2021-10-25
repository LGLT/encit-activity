import {Route, Redirect} from 'react-router-dom'

const PrivateRoute = ({component: Component, type, ...rest}) => {
    // return <Route exact={props.exact} path={props.path} component={props.component} />
    if(type === 'Game'){
        return (
            <Route {...rest} > 
                {localStorage.gameStarted === 'true' ? <Component /> : <Redirect to='/lobby' /> }
            </Route>
        );
    }
    else if(type === 'Lobby'){
        return (
            <Route {...rest} > 
                {localStorage.username ? <Component /> : <Redirect to='/' /> }
            </Route>
        );
    }
};

export default PrivateRoute;