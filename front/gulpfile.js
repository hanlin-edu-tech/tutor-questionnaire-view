const fs = require("fs");
const gulp = require("gulp");
const { Storage } = require('@google-cloud/storage');
const path = require('path');

const bucketNameForTest = "tutor-test-apps";
const bucketNameForProd = "tutor-apps";

const projectIdTest = "tutor-test-238709";
const projectIdProd = "tutor-204108";
const keyFileNameTest = "tutor-test.json";
const keyFileNameProd = "tutor.json";

const projectName = "app/survey";

const distDir = `${__dirname}/public/`;

const gcsOptionTest = {
    projectId: projectIdTest,
    keyFileName: keyFileNameTest,
    bucket: bucketNameForTest,
    cacheControl: 'no-store, no-transform'
};

const gcsOptionProd = {
    projectId: projectIdProd,
    keyFileName: keyFileNameProd,
    bucket: bucketNameForProd,
    cacheControl: 'no-store, no-transform'
};

async function uploadToGCS(gcsOption) {
    console.log(distDir)
    const storage = new Storage({
        projectId: gcsOption.projectId,
        keyFileName: "tutor-test.json"
    });
    cleanGCS(gcsOption.bucket, storage)
        .then(async () => {
            await findUploadFullPaths(distDir).then((paths) => {
                Promise.all(
                    paths.map((path) => {
                        return uploadObject(path, storage, gcsOption);
                    })
                );
            });
        });
}

const cleanGCS = async (bucketName, storage) => {
    const options = {
        prefix: projectName,
    };
    const [files] = await storage.bucket(bucketName).getFiles(options);
    for (let file of files) {
        await storage.bucket(bucketName)
            .file(file.name)
            .delete();
        console.log(`${file.name} is deleted`);
    }
};

async function findUploadFullPaths(dir, uploadFullPaths = []) {
    const files = await fs.readdirSync(dir, (err) => { console.error(err); });
    for (let file of files) {
        const fullPath = path.join(dir, file);
        const status = await fs.statSync(fullPath);
        if (status.isDirectory()) {
            uploadFullPaths = await findUploadFullPaths(fullPath, uploadFullPaths);
        } else {
            uploadFullPaths.push(fullPath);
        }
    }
    return uploadFullPaths;
}

function uploadObject(path, storage, gcsOption) {
    return new Promise((resolve) => {
        storage.bucket(gcsOption.bucket)
            .upload(path,
                {
                    destination: `${projectName}/${path.replace(distDir, '')}`,
                    metadata: {
                        cacheControl: gcsOption.cacheControl,
                    },
                    public: true
                },
                (err, file) => {
                    if (err) console.error(err);
                    console.log(`Upload ${file.name} successfully`);
                    resolve(file.name);
                }
            );
    });
}

exports.uploadGcsTest = gulp.series(uploadToGCS.bind(uploadToGCS, gcsOptionTest));
exports.uploadGcsProd = gulp.series(uploadToGCS.bind(uploadToGCS, gcsOptionProd));
