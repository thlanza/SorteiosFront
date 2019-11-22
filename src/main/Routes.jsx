import React from 'react'
import { Switch, Route, Redirect } from 'react-router'

import Home from '../components/home/Home'
import SorteiosCrud1 from '../components/sorteios/SorteiosCrud1'

export default props =>
    <Switch>
        <Route exact path='/' component={Home} />
        <Route path='/sorteios' component={SorteiosCrud1} />
        <Redirect from='*' to='/' />
    </Switch>