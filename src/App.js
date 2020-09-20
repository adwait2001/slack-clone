import React, { useContext } from 'react'
import { Switch, Route, Redirect } from 'react-router-dom'
import Slack from './components.js/Slack'
import SignIn from './components.js/SignIn'
import { userContext } from '../src/providers/UserProvider';

const PrivateRoute = (props) => {
  const { component: Component, isLoggedIn, ...others } = props;
  return <Route
    {...others}
    render={(props) => {
      return isLoggedIn ? (
        <Component {...props} />
      ) : (<Redirect
        to={{
          pathname: '/login',
          state: {
            from: props.location,
          },
        }}
      />)
    }}
  />;
}

function App() {
  const auth = useContext(userContext);
  console.log('App -> auth', auth);

  if (auth.loading) {
    return <h1>Loading!</h1>;
  }

  return (
    <div>
      <Switch>
        <Route exact path="/signup" component={SignIn} />
        <Route exact path="/login" component={SignIn} />
        <PrivateRoute exact path="/" component={Slack} isLoggedIn={auth.user ? true : false} />
      </Switch>
    </div>
  )
}


export default App;