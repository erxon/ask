import React from "react";
import {follow, unfollow} from "./api-user";
import PropTypes from "prop-types";
export default function FollowProfileButton (props) {
    const followClick = () => {
        props.onButtonClick(follow)
    }
    const unfollowClick = () => {
        props.onButtonClick(unfollow)
    }
    
    return (
        <div>
            {
                props.following ? 
                (<button className="btn btn-sm btn-outline btn-custom" onClick={unfollowClick}>Unfollow</button>) :
                (<button className="btn btn-sm btn-primary btn-custom" onClick={followClick}>Follow</button>)
            }
        </div>
    )
}
FollowProfileButton.propTypes = {
    following: PropTypes.bool.isRequired,
    onButtonClick: PropTypes.func.isRequired
}