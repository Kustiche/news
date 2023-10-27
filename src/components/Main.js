import { Box } from "@mui/material";
import Search from "./Search";
import Blocks from "./Blocks";
import { useEffect, useState } from "react";

export default function Main() {
  const [searchInformation, setSearchInformation] = useState(
    JSON.parse(localStorage.getItem("searchInformation")) ?? ""
  );
  const [searchType, setSearchType] = useState(JSON.parse(localStorage.getItem("searchType")) ?? "");

  const [news, setNews] = useState(JSON.parse(localStorage.getItem("news")) ?? []);

  useEffect(() => {
    localStorage.setItem("searchInformation", JSON.stringify(searchInformation));
    localStorage.setItem("searchType", JSON.stringify(searchType));
    localStorage.setItem("news", JSON.stringify(news));
  }, [searchInformation, searchType, news]);

  const error = {
    name: "Error: ",
    message: "There is no news about this",
  };

  function changeSearchInformation(e) {
    setSearchInformation(e.target.value);
  }

  function changeSearchType(event, value) {
    setSearchType(value);
  }

  function changeSearchInputType(e) {
    setSearchType(e.target.textContent);
  }

  function searchNews(e) {
    e.preventDefault();

    const url = `https://newsapi.org/v2/everything?q=${searchInformation}&searchIn=${
      searchType ? searchType : "title"
    }&pageSize=100&apiKey=b2cda08e8a2340a7a5c77d376d42f99d`;

    fetch(url)
      .then((response) => response.json())
      .then((data) => {
        if (data.totalResults !== 0) {
          setNews(data.articles);
        } else {
          throw error;
        }
      })
      .catch((error) => alert(error.name + error.message));
  }

  return (
    <Box component={"section"} className="news">
      <Box component={"div"} className="container">
        <Box component={"div"} className="news__wrap">
          <Box component={"h1"} className="news__title">
            News
          </Box>
          <Search
            value={searchInformation}
            onChange={changeSearchInformation}
            onSubmit={searchNews}
            onChangeInputType={changeSearchInputType}
            onChangeType={changeSearchType}
            valueType={searchType}
          />
          <Blocks news={news} />
        </Box>
      </Box>
    </Box>
  );
}
