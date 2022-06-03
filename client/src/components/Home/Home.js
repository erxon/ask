import React from "react";
import Navbar from "./Navbar";
import QuestionInput from "./QuestionInput";
import PostPreview from "./PostPreview";

function Home(){
    return (
    <div>
        <Navbar active="home"/>
        <div class="m-5 border">
            <div class="m-4">
                <QuestionInput />
            </div>
            <div class="post">
                <PostPreview />
            </div>
        </div>
    </div>
    );
}

export default Home;