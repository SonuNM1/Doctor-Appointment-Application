import { BrowserRouter, Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage";
import Register from "./pages/Register";
import Login from "./pages/Login";
import HomePage from "./pages/HomePage";

import { useSelector } from "react-redux"; // React-redux hook that allows us to extract data from the redux store's state
import Spinner from "./components/Spinner";
import ProtectedRoute from "./components/ProtectedRoute";
import PublicRoute from "./components/PublicRoute";
import ApplyDoctor from "./pages/ApplyDoctor";

function App() {
  const { loading } = useSelector((state) => state.alerts); // extracts 'loading' state from the Redux store. The 'state.alerts' part accesses the 'alerts' slice in the Rdux store, and 'loading' is the property in the slice. This will track whether the app is currently in a loading state based on the Redux logic

  return (
    <>
      <BrowserRouter>
        {/* Conditional Rendering. This checks if 'loading' is true. 
      If 'loading' is true, it renders the 'Spinner' component to show a loading spinner. 
      If loading is false, it renders the 'Routes' component which handles navigation to different pages 
       */}

        {loading ? (
          <Spinner />
        ) : (
          <Routes>
            <Route
              path="/"
              element=<ProtectedRoute>{<HomePage />}</ProtectedRoute>
            />

          <Routes>
            <Route
              path="/apply-doctor"
              element=<ProtectedRoute>{<ApplyDoctor />}</ProtectedRoute>
            />

            <Route
              path="/login"
              element=<PublicRoute>{<Login />}
              </PublicRoute>
            />

            <Route
              path="/register"
              element=<PublicRoute>{<Register />}</PublicRoute>
            />
          </Routes>
        )}
      </BrowserRouter>
    </>
  );
}

export default App;
