import { useState } from "react";
import { Routes, Route } from "react-router-dom";
import PhotoGrid from "./components/PhotoGrid";
import Carousel from "./components/Carousel";
import VideoUploader from "./components/VideoUploader";
import Login from "./components/Login";
import RequireAuth from "./components/RequrieAuth";
function App() {
  const [user, setUser] = useState();

  return (
    <Routes>
      <Route
        path="/"
        exact
        element={
          <RequireAuth user={user}>
            <PhotoGrid setUser={setUser} />
          </RequireAuth>
        }
      />
      <Route
        path="/photo/:id"
        exact
        element={
          <RequireAuth user={user}>
            <Carousel setUser={setUser} />
          </RequireAuth>
        }
      />
      <Route path="/upload" exact element={<VideoUploader />} />
      <Route path="/login" exact element={<Login setUser={setUser} />} />
    </Routes>
  );
}

export default App;
