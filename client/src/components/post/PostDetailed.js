import React from "react";
import pic from "../img/2.jpg";
import Navbar from "../Home/Navbar";
import CommentSection from "./CommentSection";
import CommentThread from "./CommentThread";
import Post from "./Post";
function PostDetailed() {
    return (
        <div>
            <Navbar />
            <div class="p-4 shadow-sm post-detailed rounded border mx-auto container-fluid">
                <Post 
                    picture={pic}
                    name="Sherlock Homes"
                    timeAgo="5 seconds ago"
                    heading="Lorem ipsum dolor sit amet?"
                    content="Ut enim ad minim veniam, quis nostrud exercitation
                        ullamco laboris nisi ut aliquip ex ea commodo
                        consequat. Ut enim ad minim veniam, quis nostrud exercitation
                        ullamco laboris nisi ut aliquip ex ea commodo
                        consequat."
                />
            </div>
            <CommentThread />
            <CommentSection />
        </div>
    );
}

export default PostDetailed;