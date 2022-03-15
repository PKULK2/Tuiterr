import React, {useEffect, useState} from "react";
import logo from './logo.svg';
import './styles.css';
// import Navigation from "./components/navigation";
// import Tuits from "./components/tuits";
// import WhatsHappening from "./components/whats-happening/whats-happening";
// import Bookmarks from "./components/bookmarks/bookmarks";
import Tuiter from "./components/tuiter/tuiter";
import {findAllTuits} from "./services/tuits-service";

function App() {
  return (
       <Tuiter/>
  );
}

export default App;