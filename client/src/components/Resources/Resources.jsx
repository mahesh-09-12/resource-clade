import React, { useEffect, useState } from "react";
import { Input } from "@headlessui/react";
import { Link } from "react-router-dom";
import { useResources } from "../context/ResourceProvider";
import { useTheme } from "../context/ThemeProvider";
import { IoSearchOutline, IoStar } from "react-icons/io5";
import RevealOnScroll from "./RevealOnScroll";
import { FaHeart, FaRegHeart } from "react-icons/fa";
import axios from "axios";
import { useAuth } from "../context/AuthProvider";
import toast from "react-hot-toast";

const tagItems = ["All", "Favorites", "Trending", "DSA", "CS Core"];
const Resources = () => {
  const { theme } = useTheme();
  const { user } = useAuth();
  const { resources, loading, favorites, setFavorites } = useResources();

  const [searchQuery, setSearchQuery] = useState("");
  const [selectedTag, setSelectedTag] = useState("all");
  const [filteredData, setFilteredData] = useState(resources);
  const [page, setPage] = useState(1);

  const itemsPerPage = 9;
  const totalPages = Math.ceil(filteredData.length / itemsPerPage);

  const paginationData = filteredData?.slice(
    (page - 1) * itemsPerPage,
    page * itemsPerPage
  );

  const handleTagChange = (tag) => {
    setSelectedTag(tag.toLowerCase());
  };
  useEffect(() => {
    let filtered = [...resources];

    if (selectedTag === "favorites") {
      filtered = filtered?.filter((item) => favorites?.includes(item?._id));
    } else if (selectedTag === "trending") {
      filtered = filtered?.filter((item) => item?.tags?.includes("trending"));
    } else if (selectedTag === "dsa") {
      filtered = filtered?.filter((item) => item?.tags?.includes("dsa"));
    } else if (selectedTag === "cs core") {
      filtered = filtered?.filter((item) => item?.tags?.includes("cs core"));
    }

    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase();
      filtered = filtered?.filter(
        (item) =>
          item?.domain?.toLowerCase().includes(query) ||
          item?.tags?.some((tag) => tag.toLowerCase().includes(query))
      );
    }

    setFilteredData(filtered);
    setPage(1);
  }, [selectedTag, searchQuery, resources, favorites]);

  const handleToggleFavorite = async (e, resourceId) => {
    e.preventDefault();
    const userId = user?.id;
    try {
      if (favorites?.includes(resourceId)) {
        const res = await axios.delete(
          `${import.meta.env.VITE_SERVER_URL}/api/favorites`,
          {
            data: { userId, resourceId },
          }
        );
        toast.success(res?.data?.message || "Something went wrong");
        setFavorites((prev) => prev.filter((fav) => fav !== resourceId));
      } else {
        const res = await axios.post(
          `${import.meta.env.VITE_SERVER_URL}/api/favorites`,
          {
            userId,
            resourceId,
          }
        );
        toast.success("Added to favorites");
        setFavorites((prev) => [...prev, resourceId]);
      }
    } catch (error) {
      toast.error(error?.response?.data?.message || error?.message);
    }
  };

  const handleChagePage = (selectedPage) => {
    if (
      selectedPage >= 1 &&
      selectedPage <= totalPages &&
      selectedPage !== page
    ) {
      setPage(selectedPage);
      window.scrollTo(0, 0);
    }
  };

  return (
    <div className="w-full h-full flex flex-col justify-start items-center gap-4 p-8 md:p-12 text-center">
      <div className="flex flex-col gap-5 items-center justify-center w-full">
        <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold p-5">
          📚 Explore Curated Tech Resources
        </h2>
        <p className="md:max-w-[72%] text-center text-sm sm:text-xl font-light my-2">
          ✨ Unlock the world of tech with top-notch, handpicked resources —
          from tutorials to tools, all absolutely free! 🚀📚🛠️
        </p>
        <div className="relative w-full sm:w-3/4 md:w-2/3">
          <IoSearchOutline
            className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
            size={20}
          />
          <Input
            type="text"
            name="domain"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className={`w-full h-10 pl-10 border rounded-lg p-2
      ${
        theme === "light"
          ? "focus:bg-gray-300 placeholder:text-gray-800"
          : "focus:bg-gray-900 placeholder:text-gray-100"
      } transition-all`}
            placeholder="Search domain..."
            spellCheck="false"
          />
        </div>
      </div>

      <div className="w-full md:w-2/3 flex flex-wrap justify-start items-center gap-4">
        {tagItems?.map((item, index) => {
          const isSelected = selectedTag === item.toLowerCase();
          const baseClass =
            "transition-colors duration-300 ease-in-out transition-all flex justify-center items-center border border-gray-500 rounded-lg p-2 w-24 h-8 cursor-pointer text-sm md:text-[1rem]";
          const themeHover =
            theme === "light" ? "hover:bg-gray-300" : "hover:bg-gray-800";
          const activeBg = isSelected
            ? theme === "light"
              ? "bg-gray-300"
              : "bg-gray-800"
            : "";
          return (
            <button
              key={index}
              onClick={() => handleTagChange(item.toLowerCase())}
              aria-pressed={isSelected}
              title={`Filter by ${item}`}
              className={`${baseClass} ${themeHover} ${activeBg}`}
            >
              {item}
            </button>
          );
        })}
      </div>

      <div className="w-full md:w-2/3 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 mt-3 gap-6 place-self-center">
        {loading ? (
          <>
            {[1, 2, 3].map((item) => {
              return (
                <div
                  key={item}
                  className="h-[16rem] w-full bg-gray-500 rounded-lg animate-pulse"
                ></div>
              );
            })}
          </>
        ) : paginationData?.length === 0 ? (
          <div className="text-gray-500 text-lg col-span-full text-center">
            {resources.length > 0
              ? "🔍 No resources found matching your search."
              : "No resources, please try again later."}
          </div>
        ) : (
          paginationData?.slice(0, 9).map((item) => (
            <RevealOnScroll key={item?._id}>
              <div
                className={`h-full flex flex-col justify-center items-center gap-4 border border-gray-700 rounded-lg p-4 cursor-pointer bg-gray-500/20 hover:shadow-xl ${
                  theme === "dark"
                    ? "hover:shadow-gray-400"
                    : "hover:shadow-gray-800"
                } backdrop-blur-md hover:scale-[103%] transition-all mb-2`}
              >
                <Link to={`/resources/${item?._id}`}>
                  <img
                    src={item?.domain_image}
                    alt={`${item?.domain} illustration`}
                    className="rounded-lg mb-3"
                    loading="lazy"
                  />

                  <div className="w-full flex flex-col items-start justify-center gap-1">
                    <h2 className="font-semibold text-[1rem] md:text-lg">
                      {item?.domain}
                    </h2>
                    <div className="w-full flex justify-between items-center">
                      <p className="flex items-center justify-center gap-1 text-sm md:text-[1rem]">
                        <IoStar className="text-amber-600" />
                        {item?.rating?.toFixed(1)} ({item?.totalRatings})
                      </p>
                      <button
                        onClick={(e) => handleToggleFavorite(e, item?._id)}
                        className="cursor-pointer p-2"
                      >
                        {favorites?.includes(item?._id) ? (
                          <FaHeart className="text-red-500" size={20} />
                        ) : (
                          <FaRegHeart
                            className="text-gray-400 hover:text-red-500"
                            size={20}
                          />
                        )}
                      </button>
                    </div>
                  </div>
                </Link>
              </div>
            </RevealOnScroll>
          ))
        )}
      </div>
      <div className="flex items-center justify-center w-full mt-4">
        {totalPages > 1 && (
          <div className="flex items-center justify-center gap-4">
            <button
              disabled={page == 1}
              className={`bg-blue-500 ${
                page > 1 && "hover:bg-blue-600"
              } rounded-lg px-2.5 py-1.5 cursor-pointer transition-all`}
              onClick={() => handleChagePage(page - 1)}
            >
              Prev
            </button>
            {[...Array(totalPages)].map((_, i) => (
              <button
                key={i}
                className={`rounded-lg px-4 py-1.5 border border-gray-300 cursor-pointer ${
                  theme === "light" ? "hover:bg-gray-400" : "hover:bg-gray-300"
                } hover:bg-gray-400 ${i + 1 == page ? "bg-gray-500" : ""}`}
                onClick={() => handleChagePage(i + 1)}
              >
                {i + 1}
              </button>
            ))}
            <button
              disabled={page == totalPages}
              className={`bg-blue-500 ${
                page < totalPages && "hover:bg-blue-600"
              } rounded-lg px-2.5 py-1.5 cursor-pointer transition-all`}
              onClick={() => handleChagePage(page + 1)}
            >
              Next
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Resources;
