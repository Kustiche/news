import { Box, Pagination } from "@mui/material";
import NewsInformation from "./NewsInformation";
import Content from "./Content";
import { useEffect, useState } from "react";

export default function Blocks({ news }) {
  const [paginationNum, setpaginationNum] = useState(JSON.parse(localStorage.getItem("paginationNum")) ?? 0);

  useEffect(() => {
    localStorage.setItem("paginationNum", JSON.stringify(paginationNum));
  });

  function changepaginationNum(event, value) {
    setpaginationNum(value);
  }

  const listItems = news.map((item) => {
    return (
      <Box key={item.publishedAt} component={"div"} className="news__block">
        <NewsInformation
          urlImage={item.urlToImage}
          date={item.publishedAt.slice(0, 10) + " " + item.publishedAt.slice(11, 19)}
          link={item.url}
        />
        <Content
          title={item.title.length > 40 ? item.title.slice(0, 40) + "..." : item.title}
          content={item.description.length > 250 ? item.description.slice(0, 250) + "..." : item.description}
          author={item.author}
        />
      </Box>
    );
  });
  return (
    <Box component={"div"} className="news__blocks">
      {listItems.slice(paginationNum === 1 ? 0 : Number(paginationNum + "0") - 10, Number(paginationNum + "0"))}
      <Pagination
        page={paginationNum}
        variant="outlined"
        count={10}
        color="secondary"
        onChange={changepaginationNum}
        sx={{ span: { border: "1px solid white" }, button: { color: "white" }, div: { color: "white" } }}
      ></Pagination>
    </Box>
  );
}
