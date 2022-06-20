import { ChangeEvent, FocusEvent, useRef, useState } from "react";
import styles from "./ListUi.module.sass";

export default function InputListContent({
  onNewListItemAdded,
}: {
  onNewListItemAdded: (content: string) => void;
}) {
  const [content, setContent] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);

  addEventListener("keydown", (e) => {
    if (e.code === "Slash") {
      if (inputRef.current) {
        e.preventDefault();
        inputRef.current.focus();
      }
    }
  });

  const addNewListItem = () => {
    console.log(`content: ${content}`);
    if (content) {
      onNewListItemAdded(content);
    }
    setContent("");
  };

  const onChangeHandler = (evt: ChangeEvent<HTMLInputElement>) => {
    setContent(evt.target.value);
    console.log(`content on change ${content}`);
  };

  const onFocusHandler = (evt: FocusEvent<HTMLInputElement>) => {
    const input = evt.target as HTMLInputElement;
    input.addEventListener("keydown", (keyEvt) => {
      if (keyEvt.code === "Enter")
        if (buttonRef.current) buttonRef.current.click();
      if (keyEvt.code === "Escape") input.blur();
    });
  };

  return (
    <div>
      <input
        value={content}
        className={styles["inputList-input"]}
        ref={inputRef}
        type="text"
        onChange={onChangeHandler}
        onFocus={onFocusHandler}
      />
      <button
        ref={buttonRef}
        className={styles.button}
        onClick={addNewListItem}
      >
        add
      </button>
    </div>
  );
}
