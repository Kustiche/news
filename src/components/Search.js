import { Autocomplete, Box, Button, TextField } from "@mui/material";
import { Link, useLocation } from "react-router-dom";

export default function Search(props) {
  const value = props.value;
  const onChange = props.onChange;
  const onSubmit = props.onSubmit;
  const onChangeInputType = props.onChangeInputType;
  const onChangeType = props.onChangeType;
  const valueType = props.valueType;
  const location = useLocation();

  const searchTypes = location.pathname === "/" ? ["title", "description", "content"] : ["title", "content"];

  return (
    <Box component={"form"} className="news__inner" action="#/" method="post" onSubmit={onSubmit}>
      <Autocomplete
        className="news__select"
        value={valueType === "" ? "title" : valueType}
        inputValue={valueType}
        options={searchTypes}
        onInputChange={onChangeInputType}
        onChange={onChangeType}
        renderInput={(params) => (
          <TextField
            {...params}
            sx={{
              input: { color: "white" },
              label: { color: "white" },
              border: "2px solid white",
              borderRadius: "10px",
              svg: { fill: "white" },
            }}
            label="Search types"
          />
        )}
      ></Autocomplete>
      <TextField
        className="news__search"
        sx={{
          input: { color: "white" },
          border: "2px solid white",
          borderRadius: "10px",
        }}
        size="small"
        value={value}
        onChange={onChange}
      ></TextField>
      <Button
        variant="outlined"
        className="news__button"
        type="submit"
        sx={{
          padding: "10px 20px",
          color: "white",
          border: "2px solid white",
        }}
      >
        Send
      </Button>
      <Link className="news__featured-button" to={location.pathname === "/" ? "/featured-news" : "../"}>
        {location.pathname === "/" ? "Featured news" : "All news"}
      </Link>
    </Box>
  );
}
