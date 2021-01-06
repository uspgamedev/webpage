import rimraf from "rimraf";

rimraf("./out", (error: Error) => {
    if (error) {
        console.log(error);
    }
});
