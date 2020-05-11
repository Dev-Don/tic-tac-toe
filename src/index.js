import React from 'react';
import ReactDom from 'react-dom';
import { BrowserRouter, Route } from 'react-router-dom';

import { Board } from './component/board.jsx';
import { Scoreboard } from './component/scoreboard';

import './styles/board.css';
import './styles/box.css';
import './styles/button.css';

class App extends React.Component {
    render() {
        return (
            <div className="app">
                <BrowserRouter>
                    <Route exact path="/" component={Scoreboard} />
                    <Route path="/board" component={Board} />
                </BrowserRouter>
            </div>
        )
    }
}

ReactDom.render(<App />, document.getElementById('root'))

// import React from 'react';
// import ReactDOM from 'react-dom';
// import './index.css';
// import App from './App';
// import * as serviceWorker from './serviceWorker';

// ReactDOM.render(
//   <React.StrictMode>
//     <App />
//   </React.StrictMode>,
//   document.getElementById('root')
// );

// // If you want your app to work offline and load faster, you can change
// // unregister() to register() below. Note this comes with some pitfalls.
// // Learn more about service workers: https://bit.ly/CRA-PWA
// serviceWorker.unregister();

