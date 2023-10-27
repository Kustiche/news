import { Box } from "@mui/material";

export default function NewsInformation({ urlImage, date, link }) {
  return (
    <Box component={"div"} className="news__inner-photo">
      <Box component={"img"} className="news__image" src={urlImage} alt="Article picture"></Box>
      <Box component={"span"} className="news__date">
        {date}
      </Box>
      <Box component={"a"} className="news__link link-reset" href={link} target="#/">
        Source link
      </Box>
    </Box>
  );
}
