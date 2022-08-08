import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { map } from 'lodash';

import routes from './routes';

const getElement = (route) => (
  <route.layout className={route.className}>
    <route.component />
  </route.layout>
);

export default function Routing() {
  return (
    <BrowserRouter>
        <Routes>
          {map(routes, (route, index) => (
            <Route 
              key={index} 
              path={route.path} 
              element={getElement(route)} 
            />
          ))}
        </Routes>
    </BrowserRouter>
  )
}
