import React, { useState, useRef, useEffect } from "react";

const YouTubeSlider = ({ videoIds }) => {
  const [currentVideoIndex, setCurrentVideoIndex] = useState(0);
  const playerRef = useRef(null);

  useEffect(() => {
    // Load YouTube Player API script
    const script = document.createElement("script");
    script.src = "https://www.youtube.com/iframe_api";
    script.async = true;
    document.body.appendChild(script);

    script.onload = () => {
      // Initialize YouTube player
      window.onYouTubeIframeAPIReady = () => {
        playerRef.current = new window.YT.Player("youtube-player", {
          height: "614",
          width: "1093",
          videoId: videoIds[currentVideoIndex],
          events: {
            onReady: onPlayerReady,
            onStateChange: onPlayerStateChange,
          },
        });
      };
    };

    return () => {
      document.body.removeChild(script);
    };
  }, [videoIds, currentVideoIndex]);

  const onPlayerReady = (event) => {
    // Player is ready
  };

  const onPlayerStateChange = (event) => {
    if (event.data === window.YT.PlayerState.ENDED) {
      handleNext();
    }
  };

  const handlePrevious = () => {
    if (currentVideoIndex > 0) {
      setCurrentVideoIndex(currentVideoIndex - 1);
      playerRef.current.loadVideoById(videoIds[currentVideoIndex - 1]);
    }
  };

  const handleNext = () => {
    if (currentVideoIndex < videoIds.length - 1) {
      setCurrentVideoIndex(currentVideoIndex + 1);
      playerRef.current.loadVideoById(videoIds[currentVideoIndex + 1]);
    }
  };

  return (
    <div className="youtube-slider-container">
      <div id="youtube-player" className="mx-auto"></div>
      <div className="youtube-slider-controls flex justify-center mt-4">
        <button
          onClick={handlePrevious}
          disabled={currentVideoIndex === 0}
          className="btn mr-4"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 20 20"
            fill="currentColor"
            className="h-6 w-6"
          >
            <path
              fillRule="evenodd"
              d="M13.707 4.293a1 1 0 0 1 0 1.414L9.414 10l4.293 4.293a1 1 0 0 1-1.414 1.414l-5-5a1 1 0 0 1 0-1.414l5-5a1 1 0 0 1 1.414 0z"
              clipRule="evenodd"
            />
          </svg>
        </button>
        <button
          onClick={handleNext}
          disabled={currentVideoIndex === videoIds.length - 1}
          className="btn"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 20 20"
            fill="currentColor"
            className="h-6 w-6"
          >
            <path
              fillRule="evenodd"
              d="M13.707 10.293a1 1 0 0 0 0-1.414L9.414 4.586a1 1 0 0 0-1.414 1.414L11.586 10l-3.586 3.586a1 1 0 1 0 1.414 1.414l4.293-4.293a1 1 0 0 0 0-1.414z"
              clipRule="evenodd"
            />
          </svg>
        </button>
      </div>
    </div>
  );
};

export default YouTubeSlider;
