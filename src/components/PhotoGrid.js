import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";

import { Link } from "react-router-dom";
function PhotoGrid({ setUser }) {
  const [photos, setPhotos] = useState([]);
  const navigate = useNavigate();
  useEffect(() => {
    fetch("https://jsonplaceholder.typicode.com/albums/1/photos")
      .then((response) => {
        if (response.ok) {
          return response.json();
        }
        return Promise.reject(response);
      })
      .then((res) => {
        setPhotos(res);
      })
      .catch((e) => {
        if (e.status === 401) {
          setUser();
          navigate("/login", { replace: true });
        }
        return Promise.reject(e.json());
      });
  }, []);
  return (
    <>
      {photos.length === 0 ? (
        <div>Loading</div>
      ) : (
        <Box sx={{ flexGrow: 1 }}>
          <Grid container spacing={2}>
            {photos.map((photo, index) => (
              <Grid item xs={6} sm={1} key={index}>
                <Link to={`/photo/${index}`}>
                  <img alt="no-img" src={photo.thumbnailUrl} />
                </Link>
              </Grid>
            ))}
          </Grid>
        </Box>
      )}
    </>
  );
}
export default PhotoGrid;
