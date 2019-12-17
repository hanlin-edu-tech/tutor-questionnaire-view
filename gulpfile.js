const gulp = require("gulp");
const gcPub = require("gulp-gcloud-publish");


const bucketNameForTest = "tutor-test-apps";
const bucketNameForProd = "tutor-apps";

let projectId = "tutor-test-238709";
let keyFileName = "tutor-test.json";

const projectName = "app/questionnaire";


let uploadGCS = bucketName => {
    if(bucketName === "tutor-apps"){
        projectId = "tutor-204108"
        keyFileName = "tutor.json"
    }
    return gulp
        .src(["dist/**"], {
            base: `${__dirname}/dist/`
        })
        .pipe(
            gcPub({
                bucket: bucketName,
                keyFilename: keyFileName,
                base: projectName,
                projectId: projectId,
                public: true,
                metadata: {
                    cacheControl: "no-store"
                }
            })
        );
};




gulp.task("uploadGcpTest", uploadGCS.bind(uploadGCS, bucketNameForTest));
gulp.task("uploadGcpProd", uploadGCS.bind(uploadGCS, bucketNameForProd));
