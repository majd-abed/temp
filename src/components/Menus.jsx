import React, { useEffect, useState } from "react";
import { useRef } from "react";
import { CATEGORIES, http } from "../api";
import { useGlobal } from "../context";

const Menus = () => {
  const [trigger, setTrigger] = useState(false);
  const [categories, setCategories] = useState([]);
  // const [selectedCategory, setSelectedCategory] = useState(0);
  const {
    setCategoryName,
    setIsCategoryEmpty,
    selectedCategory,
    setSelectedCategory,
  } = useGlobal();
  let scrll = useRef();
  const slide = (s) => {
    scrll.current.scrollLeft += s;
  };
  useEffect(() => {
    let token = localStorage.getItem("token");
    if (token === null) token = sessionStorage.getItem("token");
    http
      .get(CATEGORIES, {
        headers: {
          Authorization: token ? `Bearer ${token}` : "",
        },
      })
      .then((res) => {
        const data = res.data.categories;
        setCategories(data);
      })
      .catch((e) => {
        console.log(e);
      });
  }, [trigger]);

  async function handleCategories(id, name, index) {
    let token = localStorage.getItem("token");
    if (token === null) token = sessionStorage.getItem("token");
    await http
      .get(`https://beta-api-test.s360.cloud/api/videos/categories/${id}`, {
        headers: {
          Authorization: token ? `Bearer ${token}` : "",
        },
      })
      .then((res) => {
        setCategoryName(name);
        setTrigger(!trigger);
        setSelectedCategory(index);
        setIsCategoryEmpty(true);
      })
      .catch((e) => {
        console.log(e);
      });
  }

  useEffect(() => {}, [categories]);
  return (
    <div className='menus-style'>
      <button className='menus-arrows' onClick={() => slide(-200)}>
        <span className='material-symbols-outlined fs-2 pt-1'>arrow_back_ios</span>
      </button>
      <nav className='nav'>
        <ul className='nav-items' ref={scrll}>
          <li
            className={`nav-item-style ${selectedCategory === 0 ? "active" : null}`}
            onClick={() => handleCategories(0, "all", 0)}>
            All
          </li>
          {categories ? (
            categories.map((c, index) => {
              return (
                <li
                  key={c.id}
                  id={c.id}
                  onClick={() => handleCategories(c.id, c.category_name, index + 1)}
                  className={`nav-item-style ${
                    selectedCategory === index + 1 ? "active" : null
                  }`}>
                  {c.category_name}
                </li>
              );
            })
          ) : (
            <>
              <li className='nav-item-style active'>menu</li>
              <li className='nav-item-style'>menu</li>
              <li className='nav-item-style'>menu</li>
            </>
          )}
        </ul>
      </nav>
      <button className='menus-arrows' onClick={() => slide(200)}>
        <span className='material-symbols-outlined fs-2 pt-1'>
          arrow_forward_ios
        </span>
      </button>
    </div>
  );
};

export default Menus;
