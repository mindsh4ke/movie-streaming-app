import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import 'material-symbols';

import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import Home from './pages/Home';
import MovieDetails from './pages/MovieDetails';
import MainLayout from './components/MainLayout';
import MovieTrailers from './pages/MovieTrailers';

const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout/>,
    children: [
      {
        path: "/",
        element: <Home/>
      },
      {
        path: "/Movie/:id",
        element: <MovieDetails/>
      },
      {
        path: "/MovieTrailers/:id",
        element: <MovieTrailers/>
      }
    ]
  },
  
]);

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
