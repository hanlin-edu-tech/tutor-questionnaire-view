const fs = require("fs");
const gulp = require("gulp");
const gcPub = require("gulp-gcloud-publish");


const bucketNameForTest = "tutor-test-apps";
const bucketNameForProd = "";
const projectId = "tutor-test-238709";
const keyFileName = "tutor-test.json";
const projectName = "";


let uploadGCS = bucketName => {
    return gulp
        .src(["__sapper__/export/**"], {
            base: `${__dirname}/__sapper__/export/`
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
