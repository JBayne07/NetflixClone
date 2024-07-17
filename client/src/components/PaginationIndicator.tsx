import { PaginationIcon } from "../assets/PaginationIcon";

interface PaginationIndicatorProps {
  index: number;
  totalItems: number;
}

export const PaginationIndicator = ({
  index,
  totalItems,
}: PaginationIndicatorProps): JSX.Element => {
  const renderPaginationIcons = () => {
    const output = [];
    for (let i = 0; i < totalItems; i++) {
      if (i === index) {
        output.push(<PaginationIcon className="bg-[#aaa] " />);
      } else {
        output.push(<PaginationIcon className="bg-[#4d4d4d]" />);
      }
    }

    return output;
  };

  return (
    <div className="flex absolute right-[4%] top-0 mt-[-24px] mb-[12px]">
      {renderPaginationIcons()}
    </div>
  );
};