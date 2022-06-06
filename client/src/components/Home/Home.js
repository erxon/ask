import React from "react";
import Navbar from "./Navbar";
import QuestionInput from "./QuestionInput";
import PostPreview from "./PostPreview";

function Home(){
    return (
    <div>
        <Navbar active="home"/>
        <div class="row">
            <div class="m-5 p-2 col-7">
                <div class="m-4">
                    <QuestionInput />
                </div>
                <div class="post">
                    <PostPreview />
                </div>
            </div>
        </div>
    </div>
    );
}

export default Home;