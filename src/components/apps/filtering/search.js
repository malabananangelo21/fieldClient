import React from "react";
const Search = (props) => {
  const { ...param } = props;
  return (
    <>
      <form onSubmit={param.onSubmitSearch}>
        <input
          name="search"
          value={param.search}
          onChange={param.onChangeText}
          style={{
            height: 30,
            width: 300,
            marginTop: 5,
            outline: "none",
            borderStyle: "solid",
            backgroundColor: "transparent",
            borderWidth: 1,
            borderColor: "#7f8c8d",
          }}
          placeholder="Enter valid reference number"
        />
        <button
          type="submit"
          style={{
            height: 34,
            border: "none",
            background: "#115293",
            color: "#fff",
            paddingLeft: 10,
            paddingRight: 10,
            paddingTop: 5,
            paddingBottom: 5,
            cursor: "pointer",
            marginRight: 10,
            fontWeight: "bold",
          }}
        >
          Search
        </button>
      </form>
    </>
  );
};

export default React.memo(Search);
