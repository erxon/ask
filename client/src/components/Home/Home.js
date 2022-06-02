import React from "react";
import Navbar from "./Navbar";
import QuestionInput from "./QuestionInput";

function Home(){
    return (
    <div>
        <Navbar active="home"/>
        <div class="m-5 border">
            <div class="m-4">
                <QuestionInput />
            </div>
            <div class="post">
                
            </div>
        </div>
    </div>
    );
}

export default Home;