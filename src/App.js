import View from "./View";
import { BrowserRouter as Router } from 'react-router-dom';

function App(){

  return(
    <div className="App">
       <Router>
         <View />
       </Router>
    </div>
  );

}

export default App;