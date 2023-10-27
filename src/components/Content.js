import { Box } from "@mui/material";

export default function Content({ title, content, author }) {
  return (
    <Box component={"div"} className="news__content">
      <Box component={"h2"} className="news__heading">
        {title}
      </Box>
      <Box component={"h3"} className="news__subtitle">
        {author}
      </Box>
      <Box component={"p"} className="news__text">
        {content}
      </Box>
    </Box>
  );
}
