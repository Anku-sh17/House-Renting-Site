import React, { useEffect, useState } from "react";
import EmptyView from "../../components/common/EmptyView";
import FilterPanel from "../../components/Home/FilterPanel";
import List from "../../components/Home/List";
// import SearchBar from "../../components/Home/SearchBar";
import { dataList } from "../../constants";
import "./styles.css";

const Home = () => {
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [selectedRating, setSelectedRating] = useState(null);
  const [selectedPrice, setSelectedPrice] = useState([1000, 5000]);

  const [location, setlocation] = useState([
    { id: 1, checked: false, label: "mumbai" },
    { id: 2, checked: false, label: "delhi" },
    { id: 3, checked: false, label: "kolkata" },
    { id: 4, checked: false, label: "banglore" },
    { id: 5, checked: false, label: "chennai" },
    // { id: 7, checked: false, label: "Jaipur" },
    // { id: 8, checked: false, label: "Lucknow" },
    { id: 6, checked: false, label: "guwahti" },
    // { id: 10, checked: false, label: "Hyderabad" },
    // { id: 11, checked: false, label: "Pune" },
  ]);

  const [list, setList] = useState(dataList);
  const [resultsFound, setResultsFound] = useState(true);
  const [searchInput, setSearchInput] = useState("");

  const handleSelectCategory = (event, value) =>
    !value ? null : setSelectedCategory(value);

  const handleSelectRating = (event, value) =>
    !value ? null : setSelectedRating(value);

  const handleChangeChecked = (id) => {
    const locationStateList = location;
    const changeCheckedlocation = locationStateList.map((item) =>
      item.id === id ? { ...item, checked: !item.checked } : item
    );
    setlocation(changeCheckedlocation);
  };

  const handleChangePrice = (event, value) => {
    setSelectedPrice(value);
  };

  const applyFilters = () => {
    let updatedList = dataList;

    // Rating Filter
    if (selectedRating) {
      updatedList = updatedList.filter(
        (item) => parseInt(item.rating) === parseInt(selectedRating)
      );
    }

    // Category Filter
    if (selectedCategory) {
      updatedList = updatedList.filter(
        (item) => item.category === selectedCategory
      );
    }

    // Cuisine Filter
    const locationChecked = location
      .filter((item) => item.checked)
      .map((item) => item.label.toLowerCase());

    if (locationChecked.length) {
      updatedList = updatedList.filter((item) =>
        locationChecked.includes(item.location)
      );
    }

    // Search Filter
    if (searchInput) {
      updatedList = updatedList.filter(
        (item) =>
          item.title.toLowerCase().search(searchInput.toLowerCase().trim()) !==
          -1
      );
    }

    // Price Filter
    const minPrice = selectedPrice[0];
    const maxPrice = selectedPrice[1];

    updatedList = updatedList.filter(
      (item) => item.price >= minPrice && item.price <= maxPrice
    );

    setList(updatedList);

    !updatedList.length ? setResultsFound(false) : setResultsFound(true);
  };

  useEffect(() => {
    applyFilters();
  }, [selectedRating, selectedCategory, location, searchInput, selectedPrice]);

  return (
    <div className="home">
      {/* Search Bar */}
      {/* <SearchBar
        value={searchInput}
        changeInput={(e) => setSearchInput(e.target.value)}
      /> */}
      <div className="home_panelList-wrap">
        {/* Filter Panel */}
        <div className="home_panel-wrap">
          <FilterPanel
            selectedCategory={selectedCategory}
            selectCategory={handleSelectCategory}
            selectedRating={selectedRating}
            selectedPrice={selectedPrice}
            selectRating={handleSelectRating}
            location={location}
            changeChecked={handleChangeChecked}
            changePrice={handleChangePrice}
          />
        </div>

        <div className="home_list-wrap">
          {resultsFound ? <List list={list} /> : <EmptyView />}
        </div>
      </div>
    </div>
  );
};

export default Home;
