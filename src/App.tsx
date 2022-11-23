import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Helmet } from "react-helmet";

import Home from "./pages/Home/Home";
import Search from "./pages/Search/Search";

import "./App.scss";
import Navbar from "./components/Navbar/Navbar";
import SignIn from "./pages/SignIn/SignIn";
import SignUp from "./pages/SignUp/SignUp";
import User from "./pages/User/User";
import Chats from "./pages/Chats/Chats";

import { users } from "./environments/users";
import { chats } from "./environments/chats";
import { messages } from "./environments/messages";

import { useLocalStorage } from "./hook/useLocalStorage";
import { useEffect } from "react";

function App() {
  const { setLocalStorageItem, getLocalStorageItem } = useLocalStorage();

  const saveDataOnLocalStorage = () => {
    const { users: usersLocal } = getLocalStorageItem("users");
    const { chats: chatsLocal } = getLocalStorageItem("chats");
    const { messages: messagesLocal } = getLocalStorageItem("messages");

    console.log("USERSLOCAL: ", !usersLocal);
    

    !usersLocal && setLocalStorageItem("users", { users });
    !chatsLocal && setLocalStorageItem("chats", { chats });
    !messagesLocal && setLocalStorageItem("messages", { messages });

    console.log("SAVED!");
  };

  useEffect(() => {
    saveDataOnLocalStorage();
  }, []);

  return (
    <BrowserRouter>
      <Helmet>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Helmet>

      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/signin" element={<SignIn />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/search" element={<Search />} />
        <Route path="/chats" element={<Chats />} />
        <Route path="/chats/:id" element={<Chats />} />
        <Route path="/user" element={<User />} />
        <Route path="/user/:id" element={<User />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
