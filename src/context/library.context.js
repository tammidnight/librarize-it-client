import { createContext, useState } from "react";

const LibraryContext = createContext();

function LibraryWrapper(props) {
  const [library, setLibrary] = useState(null);

  return (
    <LibraryContext.Provider value={{ library, setLibrary }}>
      {props.children}
    </LibraryContext.Provider>
  );
}

export { LibraryContext, LibraryWrapper };
