import './App.css';
import ButtonAppBar from './component/navbar';
import React from "react";
import TextSummarizer from "./component/text-summarizer";




function App() {
    return (
        <div className="App">
            <ButtonAppBar />
            <TextSummarizer />
        </div>
    );
}

export default App;
