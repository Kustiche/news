import { Box } from "@mui/material";
import Search from "./Search";
import Blocks from "./Blocks";
import SeparateNews from "./SeparateNews";
import { useEffect, useState } from "react";
import { Route, Routes } from "react-router-dom";
import FeaturedNews from "./FeaturedNews";

export default function Main() {
  const [searchInformation, setSearchInformation] = useState(
    JSON.parse(localStorage.getItem("searchInformation")) ?? ""
  );
  const [featuredSearchInfo, setFeaturedSearchInfo] = useState(
    JSON.parse(localStorage.getItem("featuredSearchInfo")) ?? ""
  );
  const [searchType, setSearchType] = useState(JSON.parse(localStorage.getItem("searchType")) ?? "");
  const [featuredSearchType, setFeaturedSearchType] = useState(
    JSON.parse(localStorage.getItem("featuredSearchType")) ?? ""
  );
  const [news, setNews] = useState(JSON.parse(localStorage.getItem("news")) ?? []);
  const [featuredNews, setFeaturedNews] = useState(JSON.parse(localStorage.getItem("featuredNews")) ?? []);
  const [soughtFeaturedNews, setSoughtFeaturedNews] = useState([]);

  useEffect(() => {
    localStorage.setItem("searchInformation", JSON.stringify(searchInformation));
    localStorage.setItem("featuredSearchInfo", JSON.stringify(featuredSearchInfo));
    localStorage.setItem("searchType", JSON.stringify(searchType));
    localStorage.setItem("featuredSearchType", JSON.stringify(featuredSearchType));
    localStorage.setItem("news", JSON.stringify(news));
    localStorage.setItem("featuredNews", JSON.stringify(featuredNews));
  }, [searchInformation, featuredSearchInfo, searchType, featuredSearchType, news, featuredNews]);

  const error = {
    name: "Error: ",
    message: "There are no news for this request",
  };

  function addFeatureNews(e) {
    const blockNews = e.target.closest(".news__block");
    const necessaryNews = news.find((item) => item.url === blockNews.dataset.id);
    const selectedNews = featuredNews.filter((item) => {
      return item !== necessaryNews;
    });

    setFeaturedNews([...selectedNews, necessaryNews]);
  }

  function removeFeatureNews(e) {
    const blockNews = e.target.closest(".news__block");
    const necessaryNews = featuredNews.find((item) => item.url === blockNews.dataset.id);

    setFeaturedNews(
      featuredNews.filter((item) => {
        return item !== necessaryNews;
      })
    );
  }

  function changeSearchInformation(e) {
    setSearchInformation(e.target.value);
  }

  function changeFeaturedSearchInfo(e) {
    setFeaturedSearchInfo(e.target.value);
  }

  function changeSearchType(event, value) {
    setSearchType(value);
  }

  function changeFeaturedSearchType(event, value) {
    setFeaturedSearchType(value);
  }

  function searchNews(e) {
    e.preventDefault();

    const url = `https://newsapi.org/v2/everything?q=${searchInformation}&searchIn=${
      searchType ? searchType : "title"
    }&pageSize=100&apiKey=b2cda08e8a2340a7a5c77d376d42f99d`;

    fetch(url)
      .then((response) => response.json())
      .then((data) => {
        if (data.status !== "error") {
          setNews(data.articles);
        } else {
          throw error;
        }
      })
      .catch((error) => alert(error.name + error.message));
  }

  function searchFeaturedNews(e) {
    e.preventDefault();

    if (featuredSearchInfo === "") {
      alert("There are no news for this request");
      setSoughtFeaturedNews([]);
    } else {
      const soughtNews = [
        featuredNews.find((item) =>
          featuredSearchType === "title"
            ? item.title.includes(featuredSearchInfo)
            : item.content.includes(featuredSearchInfo)
        ),
      ];

      if (soughtNews[0] === undefined) {
        alert("There is no such news");

        setSoughtFeaturedNews([]);
      } else {
        setSoughtFeaturedNews(soughtNews);
      }
    }
  }

  return (
    <Box component={"section"} className="news">
      <Box component={"div"} className="container">
        <Box component={"div"} className="news__wrap">
          <Routes>
            <Route
              path="*"
              element={
                <>
                  <Box component={"h1"} className="news__title">
                    News
                  </Box>
                  <Search
                    value={searchInformation}
                    onChange={changeSearchInformation}
                    onSubmit={searchNews}
                    onChangeInputType={changeSearchType}
                    onChangeType={changeSearchType}
                    valueType={searchType}
                  />
                  <Blocks news={news} onClick={addFeatureNews} />
                </>
              }
            />
            <Route path="/eparate-news" element={<SeparateNews news={news} />} />
            <Route
              path="/featured-news"
              element={
                <>
                  <Box component={"h1"} className="news__title">
                    Featured news
                  </Box>
                  <Search
                    value={featuredSearchInfo}
                    onChange={changeFeaturedSearchInfo}
                    onSubmit={searchFeaturedNews}
                    onChangeInputType={changeFeaturedSearchType}
                    onChangeType={changeFeaturedSearchType}
                    valueType={featuredSearchType}
                  />
                  <FeaturedNews
                    news={
                      soughtFeaturedNews.length !== 0 && soughtFeaturedNews[0] !== undefined
                        ? soughtFeaturedNews
                        : featuredNews
                    }
                    onClick={removeFeatureNews}
                  />
                </>
              }
            />
          </Routes>
        </Box>
      </Box>
    </Box>
  );
}
