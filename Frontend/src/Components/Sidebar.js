import React, { useContext } from "react";
import "../Styles/Sidebar.css";
import SidebarContext from "../Context/SidebarContext";
import FilterContext from "../Context/FilterContext";

export default function Sidebar() {
  let { setOpen } = useContext(SidebarContext);
  let { filter, setFilter } = useContext(FilterContext);

  return (
    <div className="main-sidebar">
      <div className="sidebar-container">
        <div className="sidebar-header">
          <div className="categories">Categories</div>
          <div
            className="cross"
            onClick={() => {
              setOpen(false);
            }}
          >
            X
          </div>
        </div>
        <div
          className="shirts"
          onClick={() => {
            setFilter({ ...filter, category: "" });
          }}
        >
          All
        </div>
        <div
          className="shirts"
          onClick={() => {
            setFilter({ ...filter, category: "Shirts" });
          }}
        >
          Shirts
        </div>
        <div
          className="pants"
          onClick={() => {
            setFilter({ ...filter, category: "Pants" });
          }}
        >
          Pants
        </div>
      </div>
    </div>
  );
}
