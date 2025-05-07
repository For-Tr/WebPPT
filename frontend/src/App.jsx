import React, { lazy, Suspense } from 'react';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
  useLocation,
} from 'react-router-dom';
import Cookies from 'js-cookie';
// 懒加载组件
const Welcome = lazy(() => import('./pages/Welcome'));
const Login = lazy(() => import('./pages/Login'));
const SignUp = lazy(() => import('./pages/SignUp'));
const Dashboard = lazy(() => import('./pages/Dashboard'));
const Presentation = lazy(() => import('./pages/Presentation'));

// Loading 组件
const LoadingSpinner = () => (
  <div className="flex items-center justify-center min-h-screen">
    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900"></div>
  </div>
);

// 路由守卫组件
const PrivateRoute = ({ children }) => {
  const isAuthenticated = Cookies.get('adminInfo'); // 或者从你的状态管理中获取
  const location = useLocation();

  if (!isAuthenticated) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return children;
};

// 公共路由守卫（已登录用户不能访问）
const PublicRoute = ({ children }) => {
  const isAuthenticated = Cookies.get('adminInfo');
  const location = useLocation();

  if (isAuthenticated) {
    return <Navigate to="/dashboard" replace />;
  }

  return children;
};

// 路由配置
const routes = [
  {
    path: '/',
    element: <Welcome />,
    isPublic: true,
  },
  {
    path: '/login',
    element: <Login />,
    isPublic: true,
  },
  {
    path: '/signup',
    element: <SignUp />,
    isPublic: true,
  },
  {
    path: '/dashboard',
    element: <Dashboard />,
    isPrivate: true,
  },
  {
    path: '/presentation/:id',
    element: <Presentation />,
    isPrivate: true,
  },
];

function App() {
  return (
    <Router>
      <Suspense fallback={<LoadingSpinner />}>
        <Routes>
          {routes.map((route) => {
            const RouteElement = () => route.element;

            if (route.isPrivate) {
              return (
                <Route
                  key={route.path}
                  path={route.path}
                  element={
                    <PrivateRoute>
                      <RouteElement />
                    </PrivateRoute>
                  }
                />
              );
            }

            if (route.isPublic) {
              return (
                <Route
                  key={route.path}
                  path={route.path}
                  element={
                    <PublicRoute>
                      <RouteElement />
                    </PublicRoute>
                  }
                />
              );
            }

            return (
              <Route
                key={route.path}
                path={route.path}
                element={<RouteElement />}
              />
            );
          })}

          {/* 404 页面 */}
          <Route
            path="*"
            element={
              <div className="flex items-center justify-center min-h-screen">
                <div className="text-center">
                  <h1 className="text-6xl font-bold text-gray-900">404</h1>
                  <p className="text-xl text-gray-600 mt-4">Page not found</p>
                  <button
                    onClick={() => window.history.back()}
                    className="mt-8 px-6 py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
                  >
                    Go Back
                  </button>
                </div>
              </div>
            }
          />
        </Routes>
      </Suspense>
    </Router>
  );
}

export default App;