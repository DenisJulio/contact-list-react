import { ChangeEvent, useState } from "react";
import styles from "./ListUi.module.sass";

export default function InputListContent({
  onNewListItemAdded,
}: {
  onNewListItemAdded: (content: string) => void;
}) {
  const [content, setContent] = useState("");

  const addNewListItem = () => {
    if (content) {
      onNewListItemAdded(content);
    }
    setContent("");
  };

  const onChangeHandler = (evt: ChangeEvent<HTMLInputElement>) => {
    setContent(evt.target.value);
  };

  return (
    <div>
      <input
        className={styles["inputList-input"]}
        value={content}
        type="text"
        onChange={onChangeHandler}
      />
      <button className={styles.button} onClick={addNewListItem}>
        add
      </button>
    </div>
  );
}
