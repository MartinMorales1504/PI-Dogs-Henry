import './App.css';
import { Route } from 'react-router-dom'
import LandingPage from './components/LandingPage/landingPage.jsx';
import Home from './components/Home/home.jsx'
import DogDetails from './components/DogDetail/dogDetail.jsx'
import Form from './components/Form/form.jsx'
// import Nav from './components/Nav/nav.jsx'
function App() {
  return (
    <div className="App">
      <Route exact path='/' component={LandingPage} />
      <Route exact path='/home' component={Home} />
      <Route exact path='/dogs' component={Form} />
      <Route exact path='/dogs/:id' component={match => <DogDetails match={match} />} />
    </div>
  );
}

export default App;
