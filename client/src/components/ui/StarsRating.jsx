import React, { useEffect, useState } from "react";
import { useAuth } from "../context/AuthProvider";
import axios from "axios";
import toast from "react-hot-toast";
import { IoStar, IoStarOutline } from "react-icons/io5";
import { useResources } from "../context/ResourceProvider";

const StarsRating = ({ resourceId }) => {
  const { user } = useAuth();
  const { loading } = useResources();
  const [rating, setRating] = useState(0);
  const [hovered, setHovered] = useState(null);
  const [hasRated, setHasRated] = useState(false);

  useEffect(() => {
    if (user && resourceId) fetchRating();
  }, [user, resourceId]);

  const fetchRating = async () => {
    try {
      const res = await axios.get(
        `${import.meta.env.VITE_SERVER_URL}/api/rating/${user.id}/${resourceId}`
      );
      if (res.data.rating) {
        setRating(res.data.rating);
        setHasRated(true);
      }
    } catch (error) {
      console.log("No previous rating");
    }
  };

  const handleRate = async (value) => {
    if (hasRated) return toast.error("You have already rated");
    setRating(value);
    setHasRated(true);
    try {
      const userId = user.id;
      const res = await axios.patch(
        `${import.meta.env.VITE_SERVER_URL}/api/rating/${resourceId}`,
        { userId, rating: value }
      );
      toast.success(res.data.message);
    } catch (error) {
      setHasRated(false);
      setRating(0);
      toast.error(
        error?.response?.data?.message ||
          error.message ||
          "Something went wrong"
      );
    }
  };
  const ratingMessages = {
    1: "Terrible",
    2: "Bad",
    3: "Okay",
    4: "Good",
    5: "Excellent",
  };
  return (
    <div className="flex flex-col gap-1.5 items-center">
      <>
        {!hasRated && !loading && (
          <span className="font-semibold">
            Help others by rating this domain
          </span>
        )}
      </>
      <div className="flex gap-2 items-center">
        {!loading &&
          [1, 2, 3, 4, 5].map((star) => (
            <button
              key={star}
              onClick={() => handleRate(star)}
              onMouseEnter={() => !hasRated && setHovered(star)}
              onMouseLeave={() => !hasRated && setHovered(null)}
              className="text-2xl transition-transform hover:scale-105 cursor-pointer"
              disabled={hasRated}
              title={ratingMessages[star]}
            >
              {star <= (hovered ?? rating) ? (
                <IoStar className="text-yellow-400" />
              ) : (
                <IoStarOutline className="text-gray-400" />
              )}
            </button>
          ))}
      </div>
    </div>
  );
};

export default StarsRating;
