
import {BrowserRouter, Switch , Route} from 'react-router-dom';

//import Link from '@material-ui/core/Link';
import Order from './Order';
import Home from './Home';



function App() {

  
  return (
    <>
    <BrowserRouter>
      <Switch>
        <Route exact path="/" component={Home} />
        <Route exact path="/orders" component={Order} />
      </Switch>
    </BrowserRouter>

    
    </>
  );
}

export default App;
