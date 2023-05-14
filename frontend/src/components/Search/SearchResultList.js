import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
export default function SearchResults() {
  const location = useLocation();
  const results = location.state.results;
  const [data, setData] = useState(results);

  useEffect(() => {
    async function fetchData() {
      try {
        setData(results);
      } catch (e) {
        console.log(e);
      }
    }
    fetchData();
  }, [results]);
  const handleItemClick = item => {
    console.log(`Clicked item ${item._id}`);
  };
  return (
    <div>
      <ul style={{ listStyle: "none", margin: "0", padding: "0" }}>
        {data?.map((item) => (
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
              <div style={{ marginRight: "10px" }}></div>
              {item.name}
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
