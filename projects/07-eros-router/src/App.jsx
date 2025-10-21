import { lazy } from "react";

import "./App.css";
import Page404 from "./pages/404.jsx";
import SearchPage from "./pages/Search.jsx";

import { Route } from "./Route.jsx";
import { Router } from "./Router.jsx";
import { Suspense } from "react";
import { Component } from "react";

const LazyHomePage = lazy(() =>import('./pages/Home.jsx'))//ME quedo en el 1:23:10
const LazyAboutPage = lazy(() =>import('./pages/About.jsx'))

const appRoutes = [
  {
    path: '/:lang/about',
    Component: LazyAboutPage
  },
  {
    path: "/search/:query",
    Component: SearchPage
  }
]

function App() {
  return (
    <main>
      <Suspense fallback={null} >
      <Router routes={appRoutes} defaultComponent={Page404}>
      <Route path="/" Component={LazyHomePage}></Route>
      <Route path="/about" Component={LazyAboutPage}></Route>
      </Router>
      </Suspense>
    </main>
  );
}

export default App;
