import React from "react";
import Navbar from "./Navbar";
import QuestionInput from "./QuestionInput";
import PostPreview from "./PostPreview";

function Home(){
    return (
    <div>
        <Navbar active="home"/>
        <div>
            <div>
                <div class="m-4">
                    <QuestionInput />
                </div>
                <div class="post">
                    <PostPreview />
                </div>
            </div>
            {/* <div class="col-lg-4 users-section">
                <Users />
            </div> */}
        </div>
        {/* <div class="collapse" id="usersCollapse">
            <Users />
        </div> */}
    </div>
    );
}

export default Home;