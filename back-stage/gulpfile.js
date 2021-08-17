const fs = require("fs");
const gulp = require("gulp");
const { Storage } = require('@google-cloud/storage');
const path = require('path');
const es = require('event-stream');
const pug = require('pug');
const rename = require('gulp-rename');
const connect = require('gulp-connect');

const bucketNameForTest = "tutor-test-apps";
const bucketNameForProd = "tutor-apps";

const projectIdTest = "tutor-test-238709";
const projectIdProd = "tutor-204108";
const keyFileNameTest = "tutor-test.json";
const keyFileNameProd = "tutor.json";

const projectName = "app/questionnaire";

const distDir = path.join(__dirname, 'build/');

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
    cacheControl: 'no-store, no-transform'//'public, max-age=10800'
};

function buildHtml() {
    console.log('build html');
    return es.map(async function (file, cb) {
        file.contents = Buffer.from(pug.renderFile(
            file.path, {
            filename: file.path,
            pretty: true
        }
        ));
        cb(null, file);
    });
}

async function htmlTask() {
    console.log('--- html ---');
    return await new Promise(async (resolve) => {
        gulp.src('src/pug/**/*.pug')
            .pipe(await buildHtml())
            .pipe(rename({
                extname: '.html'
            }))
            .pipe(gulp.dest('./src'))
            .on('end', resolve);
    });
}

async function copyStaticFromSrcToBuild() {
    return new Promise(async (resolve) => {
        console.log(`--- copy form src to build ---`);
        await gulp.src(['src/*.html', 'src/img/**', 'src/css/**', 'src/js/**', 'src/dataprovider/**'], {
            base: 'src'
        })
            .pipe(gulp.dest('build'))
            .on('end', resolve);
    });
}

async function uploadToGCS(gcsOption) {
    const storage = new Storage({
        projectId: gcsOption.projectId,
        keyFilename: gcsOption.keyFileName
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

async function watchFiles() {
    gulp.watch("./src/pug/*.pug", gulp.series(htmlTask, copyStaticFromSrcToBuild));
    gulp.watch("./src/js/*.js", gulp.series(htmlTask, copyStaticFromSrcToBuild));
}

async function connectLiveServer() {
    connect.server({
        root: distDir,
        port: 9000,
        livereload: true
    });
}

exports.build = gulp.series(htmlTask, copyStaticFromSrcToBuild);
exports.uploadGcsTest = gulp.series(exports.build, uploadToGCS.bind(uploadToGCS, gcsOptionTest));
exports.uploadGcsProd = gulp.series(exports.build, uploadToGCS.bind(uploadToGCS, gcsOptionProd));
exports.watch = gulp.parallel(watchFiles);
exports.dev = gulp.series(
    exports.build,
    connectLiveServer,
    exports.watch
);
