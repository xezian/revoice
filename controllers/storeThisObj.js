module.exports = (tempUrl) => {
    return new Promise((res, rej) => {
        if(tempUrl){
            console.log(tempUrl);
            res("permaUrl");
        }
    })
}