
const displayElapsedTime = (dateCreated) => {
    let currentDate = new Date();
    //the date when the post is created
    let postCreatedDate = new Date(dateCreated);
    //difference between the current date and the date when post is created
    let timeDiff = currentDate.getTime() - postCreatedDate.getTime();
    timeDiff /= 1000;
    let seconds = Math.round(timeDiff);

    let displayElapsedTime = "";

    if (seconds < 60){
        displayElapsedTime = "recent"
    } else if ( seconds < 3600 && seconds > 60) {
        displayElapsedTime = Math.round(seconds / 60) + "m ago";
    } else if (seconds < 86400 && seconds > 3600){
        displayElapsedTime = Math.round((seconds / 60) /60) + "hr ago"
    } else {
        displayElapsedTime = postCreatedDate.toDateString()
    }

    return displayElapsedTime;
}

export {displayElapsedTime}
    