import { Box } from "@mui/material";
import { Link, useLocation } from "react-router-dom";

export default function NewsInformation(props) {
  const urlImage = props.urlImage;
  const date = props.date;
  const link = props.link;
  const location = useLocation();
  return (
    <Box component={"div"} className="news__inner-photo">
      <Box component={"img"} className="news__image" src={urlImage} alt="Article picture"></Box>
      <Box component={"span"} className="news__date">
        {date}
      </Box>
      <Box component={"a"} className="news__link link-reset" href={link} target="#/">
        Source link
      </Box>
      <Link className="news__link link-reset" to={location.pathname === "/" ? "/eparate-news" : "../"} state={link}>
        On a separate page
      </Link>
    </Box>
  );
}
