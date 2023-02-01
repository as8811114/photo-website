import React, { useEffect, useState } from "react";
import Picture from "../components/Picture";
import Search from "../components/Search";
const Homepage = () => {
  const [input, setInput] = useState("");

  let [data, setData] = useState(null);
  let [page, setPage] = useState(1);
  let [currentSearch, setCurrentSearch] = useState("");

  const auth = process.env.REACT_APP_AUTH;
  console.log(auth);
  const intialURL = "https://api.pexels.com/v1/curated?page=1&per_page=15";
  const searchURL = `https://api.pexels.com/v1/search?query=${currentSearch}&page=1&per_page=15`;
  //fetch data from pexel
  const search = async (url) => {
    setPage(2);
    const dataFetch = await fetch(url, {
      method: "GET",
      headers: {
        Accept: "application/json",
        Authorization: auth,
      },
    });
    let parseData = await dataFetch.json();
    setData(parseData.photos);
    console.log(parseData);
  };
  //load more picture
  const morepicture = async () => {
    let newURL;
    if (currentSearch === "") {
      newURL = `https://api.pexels.com/v1/curated?page=${page}&per_page=15`;
    } else {
      newURL = `https://api.pexels.com/v1/search?query=${currentSearch}&page=${page}&per_page=15`;
    }
    setPage(page + 1);

    const dataFetch = await fetch(newURL, {
      method: "GET",
      headers: {
        Accept: "application/json",
        Authorization: auth,
      },
    });
    let parseData = await dataFetch.json();
    setData(data.concat(parseData.photos));
  };
  useEffect(() => {
    search(intialURL);
  }, []);

  useEffect(() => {
    if (currentSearch == "") {
      search(intialURL);
    } else {
      search(searchURL);
    }
  }, [currentSearch]);

  return (
    <div>
      <Search
        search={() => {
          setCurrentSearch(input);
        }}
        setInput={setInput}
      />
      <div className="pictures">
        {data &&
          data.map((d) => {
            return <Picture data={d}></Picture>;
          })}
      </div>
      <div className="morePicture">
        <button onClick={morepicture}> Load More</button>
      </div>
    </div>
  );
};

export default Homepage;
