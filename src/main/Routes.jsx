import React from 'react'
import { Switch, Route, Redirect } from 'react-router'

import Home from '../components/home/Home'
import SorteiosCrud from '../components/deck/SorteiosCrud'

export default props =>
    <Switch>
        <Route exact path='/' component={Home} />
        <Route path='/sorteios' component={SorteiosCrud} />
        <Redirect from='*' to='/' />
    </Switch>