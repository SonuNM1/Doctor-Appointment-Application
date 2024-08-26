import { BrowserRouter, Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage";
import Register from "./pages/Register";
import Login from "./pages/Login";
import { useSelector } from "react-redux"; // React-redux hook that allows us to extract data from the redux store's state
import Spinner from "./components/Spinner";
import ProtectedRoute from "./components/ProtectedRoute";
import PublicRoute from "./components/PublicRoute";
import ApplyDoctor from "./pages/ApplyDoctor";
import NotificationPage from "./pages/NotificationPage";
import Users from "./pages/admin/Users";
import Doctors from "./pages/admin/Doctors";
import Profile from "./pages/admin/doctor/Profile";
import BookingPage from "./pages/BookingPage";
import Appointments from "./pages/Appointments";
import DoctorAppointments from './pages/admin/doctor/DoctorAppointments';

function App() {
  const { loading } = useSelector((state) => state.alerts); // extracts 'loading' state from the Redux store. The 'state.alerts' part accesses the 'alerts' slice in the Redux store, and 'loading' is the property in the slice. This will track whether the app is currently in a loading state based on the Redux logic

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
              path="/apply-doctor"
              element={
                <ProtectedRoute>
                  <ApplyDoctor />
                </ProtectedRoute>
              }
            />
            <Route
              path="/notification"
              element={
                <ProtectedRoute>
                  <NotificationPage />
                </ProtectedRoute>
              }
            />
            <Route
              path="/login"
              element={
                <PublicRoute>
                  <Login />
                </PublicRoute>
              }
            />
            <Route
              path="/register"
              element={
                <PublicRoute>
                  <Register />
                </PublicRoute>
              }
            />
            <Route
              path="/admin/users"
              element={
                <PublicRoute>
                  <Users />
                </PublicRoute>
              }
            />
            <Route
              path="/admin/doctors"
              element={
                <PublicRoute>
                  <Doctors />
                </PublicRoute>
              }
            />

            {/*route for fetching and displaying the doctor's profile data, 'id' is the unique identifier of the doctor whose profile is being processed*/}

            <Route
              path="/doctor/profile/:id"
              element={
                <ProtectedRoute>
                  <Profile />
                </ProtectedRoute>
              }
            />

            <Route
              path="/doctor/book-appointment/:doctorId"
              element={
                <ProtectedRoute>
                  <BookingPage />
                </ProtectedRoute>
              }
            />

            <Route
              path="/appointments"
              element={
                <ProtectedRoute>
                  <Appointments />
                </ProtectedRoute>
              }
            />

            <Route
              path="/"
              element={
                <ProtectedRoute>
                  <HomePage />
                </ProtectedRoute>
              }
            />

            <Route
              path="/doctor-appointments"
              element={
                <ProtectedRoute>
                  <DoctorAppointments/>
                </ProtectedRoute>
              }
            />
          </Routes>
        )}
      </BrowserRouter>
    </>
  );
}

export default App;
