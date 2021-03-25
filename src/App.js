import User from './components/User';
import UserDetails from './components/UserDetails';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom'

function App() {
  return (
    <div className="App">
      <Router>
        {/* the switch avoids looking all the routes that match, if the matching is found, it ignores the other routes*/}
        <Switch>
        <Route exact path='/' component={User}/>
        <Route path='/user/:id' component={UserDetails}/>
        </Switch>
      </Router>
    </div>
  );
}

export default App;
