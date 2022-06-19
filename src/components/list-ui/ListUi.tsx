import { CSSProperties, useState } from "react";
import ListContainer from "./ListContainer";

export default function ListUi() {
  const [dataArray, setDataArray] = useState(data);

  return (
    <>
      <div style={style}>
        <ListContainer
          updateParentState={(newData) => setDataArray(newData)}
          data={dataArray}
        />
      </div>
    </>
  );
}

const style: CSSProperties = {
  display: "flex",
  flexFlow: "column nowrap",
  alignItems: "center",
  justifyContent: "center",
  height: "100vh",
};

const data = [
  { id: 1, content: "Denis" },
  { id: 2, content: "Sophia" },
  { id: 3, content: "Darlen" },
  { id: 4, content: "Renata" },
];
