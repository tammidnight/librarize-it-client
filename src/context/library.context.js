import { createContext, useState } from "react";

const LibraryContext = createContext();

function LibraryWrapper(props) {
  const [oneLibrary, setOneLibrary] = useState(null);

  return (
    <LibraryContext.Provider value={{ oneLibrary, setOneLibrary }}>
      {props.children}
    </LibraryContext.Provider>
  );
}

export { LibraryContext, LibraryWrapper };
