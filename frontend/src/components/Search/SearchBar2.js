import * as React from "react";
import { styled, alpha } from "@mui/material/styles";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import InputBase from "@mui/material/InputBase";
import MenuIcon from "@mui/icons-material/Menu";
import SearchIcon from "@mui/icons-material/Search";
import { useState, useEffect } from "react";
import * as api from "../../Service/etudiant.service";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router";

const Search = styled("div")(({ theme }) => ({
  position: "relative",
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  "&:hover": {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  marginLeft: 0,
  width: "100%",
  [theme.breakpoints.up("sm")]: {
    marginLeft: theme.spacing(30),
    width: "auto",
  },
}));

const SearchIconWrapper = styled("div")(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: "100%",
  position: "absolute",
  pointerEvents: "none",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: "inherit",
  "& .MuiInputBase-input": {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create("width"),
    width: "100%",
    [theme.breakpoints.up("sm")]: {
      width: "17ch",
      "&:focus": {
        width: "25ch",
      },
    },
  },
}));

export default function SearchBar2() {
  const [query, setQuery] = useState("");
  const [focused, setFocused] = useState(false);
  const [results, setResults] = useState([]);
  const [data, setData] = useState([]);

  useEffect(() => {
    async function fetchData() {
      try {  console.log('fetchData :'+fetchData);
        const res = await api.GetAllPublicStudents();
        console.log('res :'+res);
        setData(
          res.map((student) => ({
            ...student,
            name: `${student.firstname} ${student.lastname}`,
          }))
        );
      } catch (e) {
        console.log(e);
      }
    }
    fetchData();
  }, [focused]);

  useEffect(() => {
    const debouncedSearch = setTimeout(() => {
      console.log('data :'+data);
      const filteredData = data.filter((item) =>
        item.name.toLowerCase().includes(query.toLowerCase())
      );
      setResults(filteredData.slice(0, 5));
    }, 100);

    return () => clearTimeout(debouncedSearch);
  }, [query, data]);

  const handleChange = (e) => {
   
    setQuery(e.target.value);
  };

  const handleItemClick = (item) => {
    console.log(`Clicked item ${item._id}`);
  };
  const navigate = useNavigate();

  const handleShowMore = () => {
    navigate("/SearchList", {
      state: {
        results: data.filter((item) =>
          item.name.toLowerCase().includes(query.toLowerCase())
        ),
      },
    });
  };
  const handleBlur = () => {
    setTimeout(() => {
      setFocused(false);
    }, 1000);
  };
  return (
    <>
      <>
        {" "}
        <IconButton
          size="large"
          edge="start"
          color="inherit"
          aria-label="open drawer"
          sx={{ mr: 2 }}
        ></IconButton>
        <Search>
          <SearchIconWrapper>
            <SearchIcon />
          </SearchIconWrapper>
          <StyledInputBase
            value={query}
            onChange={handleChange}
            onFocus={() => setFocused(true)}
            onBlur={handleBlur}
            placeholder="Search…"
            inputProps={{ "aria-label": "search" }}
          />
          {query && focused && (
            <div
              style={{
                position: "absolute",
                top: "40px",
                left: "0",
                right: "0",
                color: '#000000',
                backgroundColor: "#fff",
                borderRadius: "5px",
                boxShadow: "0 0 5px rgba(0,0,0,0.2)",
                zIndex: "1",
              }}
            >
              {results.length === 0 ? (
                <div style={{ padding: "10px", textAlign: "center" }}>
                  No results found
                </div>
              ) : (
                <>
                  <ul style={{ listStyle: "none", margin: "0", padding: "0" }}>
                    {results.map((item) => (
                      <li
                        key={item.id}
                        style={{
                          padding: "10px",
                          borderBottom: "1px solid #ccc",
                          cursor: "pointer",
                        }}
                        onClick={() => handleItemClick(item)}
                      >
                        <div style={{ display: "flex", alignItems: "center" }}>
                          <div style={{ marginRight: "10px" }}>
                            <FontAwesomeIcon icon={faSearch} />
                          </div>
                          {item.name}
                        </div>
                      </li>
                    ))}
                  </ul>
                  <div
                    style={{
                      padding: "10px",
                      borderBottom: "1px solid blue",
                      cursor: "pointer",
                    }}
                    onClick={handleShowMore}
                  >
                    <FontAwesomeIcon
                      icon={faSearch}
                      style={{ marginRight: "10px", color: "blue" }}
                      onClick={handleShowMore}
                    />
                    Search {results.length} results for "{query}"
                  </div>
                </>
              )}
            </div>
          )}
        </Search>
      </>
    </>
  );
}
