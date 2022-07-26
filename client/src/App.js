import './App.css';
import { Route, Switch } from 'react-router-dom'
import LandingPage from './components/LandingPage/landingPage.jsx';
import Home from './components/Home/home.jsx'

function App() {
  return (
    <div className="App">
      <Route exact path='/' component={LandingPage}/>
      <Route exact path='/home' component={Home}/>
    </div>

    // <BrowserRouter>
    //   <div className="App">
    //     <h1>Henry Dogs</h1>
    //   </div>
    // </BrowserRouter>
  );
}

export default App;
