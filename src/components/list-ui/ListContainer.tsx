import { useReducer, useState } from "react";
import { ListContent } from "../../utils/types";
import ListItem from "./ListItem";
import styles from "./ListUi.module.sass";
import classNames from "classnames/bind";

let cn = classNames.bind(styles);

export default function ListContainer({
  data,
  updateParentState,
}: {
  data: ListContent[];
  updateParentState?: (newDataArray: ListContent[]) => void;
}) {
  // -------------------------
  /* 
    TODO: 
    create your own stateful hook
    that subscribes to a state that will renders the delete button if there are itens for deletion
  */

  // -------------------------

  // ---------[state hook solution]--------------
  const [selectedItemsIndexes, setSelectedItemsIndexes] = useState<number[]>(
    []
  );

  const onClickItems = (checked: boolean, item: ListContent, index: number) => {
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

  const deletListItems = () => {
    if (updateParentState) {
      updateParentState(strip(data, selectedItemsIndexes));
      setSelectedItemsIndexes([]);
    }
  };

  // --------------------------------------------

  return (
    <div className={styles.listContainer}>
      <div className={styles.innerListContainer}>
        {data.map((item, index) => (
          <ListItem
            key={item.id}
            data={item}
            index={index}
            // onListItemChecked={updateBackingArray}
            onListItemChecked={onClickItems}
          />
        ))}
      </div>
      <div className={styles.listActionContainer}>
        {selectedItemsIndexes.length > 0 ? ( // TODO: this needs to reference a state for rerendering
          <DeleteButton onClick={deletListItems} />
        ) : null}
      </div>
    </div>
  );
}

const DeleteButton = ({ onClick }: { onClick?: () => void }) => (
  <button onClick={onClick} className={cn("button")}>
    Delete
  </button>
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
  indexes.sort();
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
