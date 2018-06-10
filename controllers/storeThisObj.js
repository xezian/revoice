module.exports = (tempUrl) => {
    return new Promise((res, rej) => {
        if(tempUrl){
            console.log(tempUrl);
            res("not yet but once stored this will be the permanent url of stored file to access for playback");
        }
    })
}