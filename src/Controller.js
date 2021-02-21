import React ,{Component} from 'react';
import {BrowserRouter as Router , Route} from 'react-router-dom'
import Home from '../src/screens/home/Home';
import Summary from '../src/screens/summary/Summary';

class Controller extends Component{
   
    render(){
        return(
         <Router>
             <div>
                 <Route exact path='/' render ={({history},props) => <Home history={history} />}></Route>
                 <Route path ='/checkout' render={(props)=><Summary props={...props}/>}></Route>
             </div>
         </Router>
        );
    }
}

export default Controller;

