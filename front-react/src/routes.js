import { Children, Routes, Switch, Route, Navigate, useRoutes } from 'react-router-dom';
// layouts
import DashboardLayout from './layouts/dashboard';
import LogoOnlyLayout from './layouts/LogoOnlyLayout';
// auth check
import PrivateRoute from './privateRoute';
import AdminRoute from './adminRoute';
import Blog from './pages/Blog';
import User from './pages/User';
import Login from './pages/Login';
import NotFound from './pages/Page404';
import Register from './pages/Register';
import Products from './pages/Products';
import Auction from './pages/Auction';
import AuctionBid from './pages/AuctionBid';
import DashboardApp from './pages/DashboardApp';
import LectureCategory from './pages/LectureCategory';

// ----------------------------------------------------------------------

export default function Router() {
  return useRoutes([
    {
      path: '/admin',
      element: <AdminRoute><DashboardLayout /></AdminRoute>,
      children: [
        { path: 'member', element: <User /> },
      ],
    },
    {
      path: '/dashboard',
      element: <PrivateRoute><DashboardLayout /></PrivateRoute>,
      children: [
        { path: 'app', element: <DashboardApp /> },
        { path: 'user', element: <User /> },
        { path: 'products', element: <Products /> },
        { path: 'blog', element: <Blog /> },
        { path: 'auction', element: <Auction /> },
        { path: 'auctionBid', element: <AuctionBid /> },
        { path: 'lecturecategory', element: <LectureCategory /> },

      ],
    },
    {
      path: '/',
      element: <LogoOnlyLayout />,
      children: [
        { path: '/', element: <Navigate to="/dashboard/app" /> },
        // { path: '/', element: <Login /> },
        { path: 'login', element: <Login /> },
//        { path: 'logout', element: <Login /> },
        { path: 'register', element: <Register /> },
        { path: '404', element: <NotFound /> },
        { path: '*', element: <Navigate to="/404" /> },
      ],
    },
    { path: '*', element: <Navigate to="/404" replace /> },
  ]);
}

