import { Autocomplete, Box, Button, TextField } from "@mui/material";

export default function Search(props) {
  const value = props.value;
  const onChange = props.onChange;
  const onSubmit = props.onSubmit;
  const onChangeInputType = props.onChangeInputType;
  const onChangeType = props.onChangeType;
  const valueType = props.valueType;
  console.log(valueType);

  const searchTypes = ["title", "description", "content"];

  return (
    <Box component={"form"} className="news__inner" action="#/" method="post" onSubmit={onSubmit}>
      <Autocomplete
        className="news__select"
        value={valueType}
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
    </Box>
  );
}
