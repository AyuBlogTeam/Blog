import React from 'react';
import ReactDOM from 'react-dom';
import * as serviceWorker from './serviceWorker';

import 'Styles/reset.styl'
import 'Iconfont/iconfont.css'
import 'Styles/index.styl'

import { BrowserRouter,Switch,Route} from "react-router-dom";
import Index from './Components/Index/index';
import Login from './Components/Login/login';

const AppRouter = () => (
    <BrowserRouter >
        <Switch>
            <Route path="/manage/" exact component={Index} />
            <Route path="/manage/login" exact component={Login} />
        </Switch>
    </BrowserRouter >
);

ReactDOM.render(<AppRouter />, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
