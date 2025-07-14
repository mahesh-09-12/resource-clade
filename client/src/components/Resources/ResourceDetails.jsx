import React, { useEffect, useState } from "react";
import { useResources } from "../context/ResourceProvider";
import { useParams } from "react-router-dom";
import ResourceCard from "./ResourceCard";
import StarsRating from "../ui/StarsRating";
import ProjectCard from "./ProjectCard";

const ResourceDetails = () => {
  const { id } = useParams();
  const { resources, loading } = useResources();
  const [isLoaded, setIsLoaded] = useState(false);
  const [currentSec, setCurrentSec] = useState("resources");

  const sections = ["Resources", "Projects"];

  let selected = resources.find((res) => res?._id === id);

  useEffect(() => {
    setIsLoaded(true);
  }, [selected, resources]);

  if (!loading && !selected) {
    return (
      <div className="p-4 text-center text-red-500">Resource not found</div>
    );
  }

  return (
    <div className="flex flex-col justify-center items-center gap-7 p-6 w-full md:max-w-[70%] mx-auto">
      {loading ? (
        <div className="w-[90%] h-[200px] sm:h-[300px] md:h-[400px] lg:h-[480px] transition-all duration-300 ease-in-out rounded-lg bg-slate-300 animate-pulse"></div>
      ) : (
        <>
          <h1 className="text-3xl font-bold mb-4">{selected?.domain}</h1>

          <iframe
            src={selected.intro_video?.src}
            title={selected.intro_video?.title}
            frameBorder="0"
            allow={selected.intro_video?.allow}
            referrerPolicy={selected.intro_video?.referrerPolicy}
            allowFullScreen
            loading="lazy"
            onLoad={() => setIsLoaded(false)}
            className={`w-[90%] h-[200px] sm:h-[300px] md:h-[400px] lg:h-[480px] transition-all duration-300 ease-in-out rounded-lg ${
              isLoaded ? "bg-slate-300 animate-pulse" : ""
            }`}
          ></iframe>
          <p className="p-5 md:px-10  text-sm md:text-[1rem]">
            {selected?.description}
          </p>
          <div className="flex w-full justify-center gap-5 px-1 md:px-12 font-semibold text-lg">
            {selected?.projects?.length > 0 &&
              sections.map((item, idx) => (
                <div
                  key={idx}
                  onClick={() => setCurrentSec(item.toLocaleLowerCase())}
                  className={`p-2 cursor-pointer underline-offset-2 transition-all duration-300 ease-out ${
                    item.toLocaleLowerCase() === currentSec
                      ? "underline opacity-100"
                      : "no-underline opacity-85"
                  } `}
                >
                  {item}
                </div>
              ))}
          </div>
          {currentSec === "resources" ? (
            <>
              <h3 className="font-semibold text-xl md:text-2xl">
                Roadmap - Free Resources
              </h3>
              <div className="max-w-[90%] grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {selected?.resources?.map((resource, index) => (
                  <ResourceCard key={index} resource={resource} />
                ))}
              </div>
            </>
          ) : (
            <>
              <h3 className="font-semibold text-xl md:text-2xl">
                Project Ideas
              </h3>
              <div className="max-w-[90%] grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {selected?.projects?.map((project, index) => (
                  <ProjectCard key={index} project={project} />
                ))}
              </div>
            </>
          )}
        </>
      )}
      <div>
        <StarsRating resourceId={selected?._id} />
      </div>
    </div>
  );
};

export default ResourceDetails;
