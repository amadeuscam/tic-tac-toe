export const Square = ({children, isSelected, updateBoard, index}) => {
  const isSelectedClassName = `square ${isSelected
    ? "is-selected"
    : ""}`;

  const handleClick = () => {
    updateBoard(index);
  };
  return (<div onClick={handleClick} className={isSelectedClassName} key={index}>
    <span className="cell_content">{children}</span>
  </div>);
};
