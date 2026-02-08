import React from 'react';
import { Switch, Route } from 'react-router-dom';
import PageContent from './layout/PageContent';
import HomePage from './pages/HomePage';
import NotFound from './pages/NotFound';

function App() {
  return (
    <PageContent>
      <Switch>
        <Route exact path="/" component={HomePage} />
        <Route component={NotFound} />
      </Switch>
    </PageContent>
  );
}

export default App;
