var gulp = require('gulp');
var minifycss = require('gulp-clean-css');
var uglify = require('gulp-uglify');
var htmlmin = require('gulp-htmlmin');
var htmlclean = require('gulp-htmlclean');
var imagemin = require('gulp-imagemin');
var del = require('del');
var runSequence = require('run-sequence');
var Hexo = require('hexo');
var exec = require('child_process').exec;
var gulpSequence = require('gulp-sequence')
var argv = require('minimist')(process.argv.slice(2));


// 清除frontend文件夹
gulp.task('clean', function() {
    return del(['frontend/**/*']);
});
// 利用Hexo API 来生成博客内容， 效果和在命令行运行： hexo g 一样
// generate html with 'hexo generate'
var hexo = new Hexo(process.cwd(), {});
gulp.task('generate', function(cb) {
    hexo.init().then(function() {
        return hexo.call('generate', {
            watch: false
        });
    }).then(function() {
        return hexo.exit();
    }).then(function() {
        return cb()
    }).catch(function(err) {
        console.log(err);
        hexo.exit(err);
        return cb(err);
    })
})
// 压缩frontend目录下的所有css
gulp.task('minify-css', function() {
    return gulp.src('./frontend/**/*.css')
        .pipe(minifycss({
            compatibility: 'ie8'
        }))
        .pipe(gulp.dest('./frontend'));
});
// 压缩frontend目录下的所有html
gulp.task('minify-html', function() {
    return gulp.src('./frontend/*.html')
        .pipe(htmlclean())
        .pipe(htmlmin({
            removeComments: true,
            minifyJS: true,
            minifyCSS: true,
            minifyURLs: true,
        }))
        .pipe(gulp.dest('./frontend'))
});
// 压缩frontend目录下的所有js
gulp.task('minify-js', function() {
    return gulp.src('./frontend/**/*.js')
        .pipe(uglify())
        .pipe(gulp.dest('./frontend'));
});
// 压缩frontend目录下的所有img： 这个采用默认配置
gulp.task('minify-img', function() {
    return gulp.src('./frontend/img/**/*.*')
        .pipe(imagemin())
        .pipe(gulp.dest('./frontend/img'));
})
// 压缩frontend目录下的所有img： 最大化压缩效果。
gulp.task('minify-img-aggressive-frontend', function() {
    return gulp.src('./frontend/frontend/**/*.*')
    .pipe(imagemin(
    [imagemin.gifsicle({'optimizationLevel': 3}), 
    imagemin.jpegtran({'progressive': true}), 
    imagemin.optipng({'optimizationLevel': 7}), 
    imagemin.svgo()],
    {'verbose': true}))
    .pipe(gulp.dest('./frontend/frontend'))
})
// 同上，压缩图片，这里采用了： 最大化压缩效果。
gulp.task('minify-img-aggressive', function() {
    return gulp.src('./frontend/img/**/*.*')
        .pipe(imagemin(
        [imagemin.gifsicle({'optimizationLevel': 3}), 
        imagemin.jpegtran({'progressive': true}), 
        imagemin.optipng({'optimizationLevel': 7}), 
        imagemin.svgo()],
        {'verbose': true}))
        .pipe(gulp.dest('./frontend/img'))
})

// 压缩frontend目录下的所有img： 最大化压缩效果。
gulp.task('minify-img-compress', function() {
    return gulp.src('./source/img/**/*.*')
    .pipe(imagemin(
    [imagemin.gifsicle({'optimizationLevel': 3}), 
    imagemin.jpegtran({'progressive': true}), 
    imagemin.optipng({'optimizationLevel': 7}), 
    imagemin.svgo()],
    {'verbose': true}))
    .pipe(gulp.dest('./source/img'))
})
// cmd back 返回上一层
gulp.task('back', function (cb) {
    exec('cd ..', function (err, stdout, stderr) {
        cb(err);
    });
});

// add   等同于执行 git add * 命令(具体可以自己配置,如 add -A或者add .)
gulp.task('add', function (cb) {
  exec('git add *', function (err, stdout, stderr) {
    cb(err);
  });
});


// push  执行git push 操作
gulp.task('push', function (cb) {
  exec('git push', function (err, stdout, stderr) {
    cb(err);
  });
});

// pull  执行git pull 操作
gulp.task('pull', function (cb) {
  exec('git pull', function (err, stdout, stderr) {
    cb(err);
  });
});

// commit   附加自定义commit的push操作
var commitdefault='s'
gulp.task('commit', function (cb) {
  if(!argv.a){
    commitcon=commitdefault
  }else {
    var commitcon=argv.a
  }
  exec('git commit -m '+commitcon, function (err, stdout, stderr) {
    cb(err);
  });
});


//**********************具体使用命令*****************************

//    gulp b 命令执行build打包，并且推送到仓库 (如需自定义 commit  执行  gulp b -a 自定义commit)
gulp.task( 'b', gulpSequence( 'build','add', 'commit', 'push'));

//    gulp p 命令更新远程仓库
gulp.task( 'p', gulpSequence('pull'));
// 用run-sequence并发执行，同时处理html，css，js，img
gulp.task('compress', function(cb) {
    runSequence(['minify-html', 'minify-css', 'minify-js', 'minify-img-aggressive','minify-img-aggressive-frontend'], cb);
});
// 执行顺序： 清除frontend目录 -> 产生原始博客内容 -> 执行压缩混淆
gulp.task('build', function(cb) {
    runSequence('clean','minify-img-compress', 'generate', 'compress','add', 'commit', 'push', cb)
});
gulp.task('default', ['build'])
//压缩博客目录的图片
gulp.task('m', function(cb) {
    runSequence('minify-img-compress', cb)
});