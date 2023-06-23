import React, { useState, useContext } from "react";
const GlobalContext = React.createContext();

const ContextProvider = ({ children }) => {
  const [searchData, setSearchData] = useState([]);
  const [homeData, setHomeData] = useState([]);
  const [subData, setSubData] = useState([]);
  const [vidData, setVidData] = useState([]);
  const [isHomeLoading, setIsHomeLoading] = useState(true);
  const [categoryName, setCategoryName] = useState("all");
  const [isCategoryEmpty, setIsCategoryEmpty] = useState(true);
  const [userInfo, setUserInfo] = useState([]);
  const [isSearch, setIsSearch] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState(0);
  const [searchValue, setSearchValue] = useState("");
  const [noVideoPhrase, setNoVideoPhrase] = useState("");
  return (
    <GlobalContext.Provider
      value={{
        searchData,
        setSearchData,
        homeData,
        setHomeData,
        subData,
        setSubData,
        vidData,
        setVidData,
        categoryName,
        setCategoryName,
        isHomeLoading,
        setIsHomeLoading,
        isCategoryEmpty,
        setIsCategoryEmpty,
        userInfo,
        setUserInfo,
        isSearch,
        setIsSearch,
        selectedCategory,
        setSelectedCategory,
        searchValue,
        setSearchValue,
        noVideoPhrase,
        setNoVideoPhrase,
      }}>
      {children}
    </GlobalContext.Provider>
  );
};
export function useGlobal() {
  return useContext(GlobalContext);
}
export { ContextProvider, GlobalContext };
