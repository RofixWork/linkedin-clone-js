import { useLayoutEffect, useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./components/Home";
import Login from "./components/Login";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "./firebase";
import { useDispatch } from "react-redux";
import { setUser } from "./app/slices/auth";
import { PrivateRoute } from "./routes/PrivateRoute";
import { PubliceRoute } from "./routes/PublicRoute";
import Loading from "./components/Loading";

function App() {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);

  // manage users
  useLayoutEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        dispatch(setUser(user));
        console.log("user efecr", user);
        setLoading(true);
      } else {
        console.log("ralat");
        setLoading(true);
      }
    });
  });
  console.log(import.meta.env);
  return (
    <>
      {loading ? (
        <Router>
          <Routes>
            <Route element={<PubliceRoute />}>
              <Route path="/" element={<Login />} />
            </Route>
            <Route element={<PrivateRoute />}>
              <Route path="/home" element={<Home />} />
            </Route>
          </Routes>
        </Router>
      ) : (
        <Loading />
      )}
    </>
  );
}

export default App;
