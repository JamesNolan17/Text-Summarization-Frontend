import './App.css';
import ButtonAppBar from './component/navbar';
import React from "react";
import View_main from "./component/view_main";




function App() {
    return (
        <div className="App">
            <ButtonAppBar />
            <View_main />
        </div>
    );
}

export default App;
