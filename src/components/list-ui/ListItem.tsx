import { useEffect, useRef, useState } from "react";
import styles from "./ListUi.module.sass";
import classNames from "classnames/bind";
import { ListContent } from "../../utils/types";

export default function ListItem({
  data,
  onListItemChecked,
  index,
}: {
  data: ListContent;
  onListItemChecked?: (
    checked: boolean,
    itemData: ListContent,
    index: number
  ) => void;
  index: number;
}) {
  const classes = classNames.bind(styles);
  const [hovered, setHovered] = useState(false);
  const [checked, setChecked] = useState(false);
  const checkboxRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const checkbox = checkboxRef.current;
    if (checkbox) {
      if (!hovered && !checked) checkbox.style.visibility = "hidden";
      else checkbox.style.visibility = "visible";
    }
  });

  const clickHandler = () => {
    const checkbox = checkboxRef.current;
    if (checkbox) {
      checkbox.checked = !checked;
      setChecked(!checked);
      onListItemChecked && onListItemChecked(!checked, data, index);
    }
  };

  return (
    <div
      className={classes("listItem", {
        highlight: checked,
        ["listItem-hovered"]: hovered && !checked,
      })}
      onMouseEnter={() => setHovered(!hovered)}
      onMouseLeave={() => setHovered(!hovered)}
      onClick={clickHandler}
    >
      <input ref={checkboxRef} type="checkbox" />
      {data.content}
    </div>
  );
}
