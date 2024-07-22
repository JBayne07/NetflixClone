import { useContext, useRef } from "react";
import { Movie } from "../../services/types";
import { ModalContext } from "../../contexts/ModalContext";
import { useWindowDimensions } from "../../hooks/useWindowDimensions";

interface SliderItemProps {
  movie: Movie;
  isEdge: boolean;
  itemWidth: number;
}

export const SliderItem = ({
  movie,
  isEdge,
  itemWidth,
}: SliderItemProps): JSX.Element => {
  const {
    isItemHovered,
    setIsItemHovered,
    setMovie,
    setPosX,
    setPosY,
    setIsLeftAlign,
    setIsMiddle,
    setItemWidth,
  } = useContext(ModalContext);
  const itemRef = useRef<HTMLDivElement>(null);
  const { width } = useWindowDimensions();

  const handleMouseOver = () => {
    if (isItemHovered) {
      setTimeout(() => {
        setModalState();
      }, 500);
    } else {
      setModalState();
    }
  };

  const setModalState = () => {
    setIsItemHovered(true);
    setMovie(movie);
    const positions = itemRef.current?.getBoundingClientRect();
    setPosY(positions!.top + positions!.height / 2 + 15);
    setPosX(() => {
      if (positions) {
        if (positions.width + positions.x + width * 0.08 > width) {
          setIsLeftAlign(false);
          return width * 0.04;
        } else if (!isEdge) {
          setIsMiddle(true);
          return positions.left;
        } else {
          setIsLeftAlign(true);
          return positions.left;
        }
      }
    });
    setItemWidth(itemRef.current?.offsetWidth);
  };

  return (
    <div
      className="relative flex-[0_0_20%] max-w-[20%] px-[0.2vw]"
      onMouseOver={handleMouseOver}
      ref={itemRef}
    >
      {movie && (
        <img
          className="w-[100%] aspect-video rounded-sm"
          src={movie.Src}
          alt=""
        />
      )}
    </div>
  );
};
