import { createContext, useState } from "react";

const FetchingUserContext = createContext();

function FetchingUserWrapper(props) {
  const [fetchingUser, setFetchingUser] = useState(true);

  return (
    <FetchingUserContext.Provider value={{ fetchingUser, setFetchingUser }}>
      {props.children}
    </FetchingUserContext.Provider>
  );
}

export { FetchingUserContext, FetchingUserWrapper };
