import React from 'react';
import { createRoot } from 'react-dom/client';
import './style.css';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import MainLayout from './layouts/main.layout';
import AuthLayout from './layouts/auth.layout';
import Home from './pages/Home';
import About from './pages/About';
import Login from './pages/Login';
import Register from './pages/Register';
import { createStore, combineReducers } from 'redux';
import { Provider } from 'react-redux';
import TodoLayout from './layouts/todo.layout';
import TodoApp from './pages/TodoApp';

const localeReducer = (state = 'english', action) => {
  switch (action.type) {
    case 'TOGGLE_LOCALE':
      return action.payload;
    default:
      return state;
  }
};
const themeReducer = (state = 'light', action) => {
  switch (action.type) {
    case 'TOGGLE_THEME':
      return action.payload;
    default:
      return state;
  }
};

const rootReducer = combineReducers({
  locale: localeReducer,
  theme: themeReducer,
});
const store = createStore(rootReducer);

const router = createBrowserRouter([
  {
    path: '/',
    element: <MainLayout />,
    children: [
      { index: true, element: <Home /> },
      {
        path: 'about',
        element: <About />,
      },
    ],
  },
  {
    path: '/auth',
    element: <AuthLayout />,
    children: [
      { index: true, element: <Login /> },
      { path: 'register', element: <Register /> },
    ],
  },
  {
    path: '/todoApp',
    element: <TodoLayout />,
    children: [{ index: true, element: <TodoApp /> }],
  },
]);
document.body.innerHTML = '<main id="app"></main>';
const root = createRoot(document.getElementById('app'));
root.render(
  <Provider store={store}>
    <RouterProvider router={router} />
  </Provider>,
);
