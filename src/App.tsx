import { useState } from "react";
import ReactLogo from "./assets/react.svg";
import "./App.css";
import { Todo } from '@pages/'
import { Header, Login } from "@components/";
import { QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools"
import queryClient from "@utils/queryClient";

function App() {
  const [count, setCount] = useState(0);
  return (
    <QueryClientProvider client={queryClient}>
      <Todo/>
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  );
}

export default App;
