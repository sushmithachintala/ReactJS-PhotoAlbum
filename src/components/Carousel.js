import React, { useState, useEffect, useRef } from "react";
import { useParams } from "react-router-dom";
import { experimentalStyled as styled } from "@mui/material/styles";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import { Link, useNavigate } from "react-router-dom";

const Photo = styled("img")({
  width: "100%",
  height: "100%",
  zIndex: "-1",
  position: "absolute",
});
const Container = styled("div")({
  display: "flex",
  flexDirection: "row",
  justifyContent: "space-between",
  width: "99vw",
  height: "100vh",
  zIndex: 1,
});
const IconContainer = styled("div")({
  marginTop: "45vh",
  backgroundColor: "lightgrey",
  borderRadius: "50px",
});
function Carousel({ setUser }) {
  const { id } = useParams();
  const [fetchedImages, setFetchedImages] = useState([]);
  var photo_id = isNaN(parseInt(id)) ? 0 : parseInt(id);
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
        setFetchedImages(res);
      })
      .catch((e) => {
        if (e.status === 401) {
          console.log(e);
          setUser();
          navigate("/login", { replace: true });
        }

        return Promise.reject(e.json());
      });
  }, []);

  if (fetchedImages.length === 0) return <div>Loading</div>;

  var imgUrl = fetchedImages[photo_id].url;

  return (
    <Container>
      <Link to={`/photo/${photo_id > 0 ? photo_id - 1 : 0}`}>
        <IconContainer>
          <ChevronLeftIcon fontSize="large" />
        </IconContainer>
      </Link>
      <Photo src={imgUrl} alt="no-img" />
      <Link to={`/photo/${photo_id < 49 ? photo_id + 1 : 49}`}>
        <IconContainer>
          <ChevronRightIcon fontSize="large" />
        </IconContainer>
      </Link>
    </Container>
  );
}
export default Carousel;
