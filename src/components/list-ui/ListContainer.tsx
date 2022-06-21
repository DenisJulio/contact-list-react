import {
  forwardRef,
  RefObject,
  useCallback,
  useEffect,
  useRef,
  useState,
} from "react";
import { ListContent } from "../../utils/types";
import ListItem from "./ListItem";
import styles from "./ListUi.module.sass";
import classNames from "classnames/bind";
import InputListContent from "./InputListContent";

let cn = classNames.bind(styles);

export default function ListContainer({
  data,
  updateParentState,
}: {
  data: ListContent[];
  updateParentState: (newDataArray: ListContent[]) => void;
}) {
  const [selectedItemsIndexes, setSelectedItemsIndexes] = useState<number[]>(
    []
  );
  const [areItemsSelected, setAreItemsSelected] = useState<boolean>();
  const buttonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (selectedItemsIndexes.length > 0) setAreItemsSelected(true);
    if (selectedItemsIndexes.length < 1) setAreItemsSelected(false);
  }, [selectedItemsIndexes]);

  useEffect(() => {
    if (areItemsSelected) {
      window.addEventListener("keydown", keydownListener);
    } else {
      window.removeEventListener("keydown", keydownListener);
    }
  }, [areItemsSelected]);

  const keydownListener = useCallback((evt: KeyboardEvent) => {
    if (evt.code === "KeyD") {
      if (buttonRef.current) buttonRef.current.click();
    }
  }, []);

  const onClickItems = (checked: boolean, _item: unknown, index: number) => {
    let newArr;
    if (checked) {
      newArr = selectedItemsIndexes.concat(index);
    } else {
      const idx = selectedItemsIndexes.findIndex((el) => el === index);
      newArr = selectedItemsIndexes
        .slice(0, idx)
        .concat(selectedItemsIndexes.slice(idx + 1));
    }
    setSelectedItemsIndexes(newArr);
  };

  const addNewListItem = (content: string) => {
    let id;
    if (data.length !== 0) id = data[data.length - 1].id + 1;
    else id = 1;
    const newArr = data.concat({ id: id, content: content });
    updateParentState(newArr);
  };

  const deletListItems = () => {
    if (updateParentState) {
      updateParentState(strip(data, selectedItemsIndexes));
      setSelectedItemsIndexes([]);
    }
  };

  return (
    <div className={styles.listContainer}>
      <div className={styles.innerListContainer}>
        {data.map((item, index) => (
          <ListItem
            key={item.id}
            data={item}
            index={index}
            onListItemChecked={onClickItems}
          />
        ))}
      </div>
      <div className={styles.listActionContainer}>
        {/* {selectedItemsIndexes.length > 0 ? ( */}
        {areItemsSelected ? (
          <DeleteButton ref={buttonRef} onClick={deletListItems} />
        ) : (
          <InputListContent onNewListItemAdded={addNewListItem} />
        )}
      </div>
    </div>
  );
}

const DeleteButton = forwardRef<HTMLButtonElement, { onClick?: () => void }>(
  ({ onClick }, buttonRef) => (
    <button
      ref={buttonRef}
      onClick={onClick}
      className={cn("button")}
      style={{ width: "60%" }}
    >
      Delete
    </button>
  )
);

/**
 * Returns a new array stripped from the elements in the
 * indexes provided by the index array.
 *
 * @param array - the input array to strip the items
 * @param indexes - an array of indexes, whose elements will be stripped from the new array
 * @returns {Array} a new array stripped from the elemenst in the indexes provided by the indexes array
 */
function strip<T>(array: T[], indexes: number[]): Array<any> {
  indexes.sort((el1, el2) => el1 - el2);
  let stripedArr = array.slice(0, indexes[0]);
  for (let c1 = 0; c1 < indexes.length; c1++) {
    let c2 = c1 + 1;
    if (c2) {
      stripedArr = stripedArr.concat(array.slice(indexes[c1] + 1, indexes[c2]));
      continue;
    }
    stripedArr = stripedArr.concat(array.slice(indexes[c1] + 1));
  }
  return stripedArr;
}
