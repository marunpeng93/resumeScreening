//引入模块
var gulp= require("gulp"),
	liverload = require("gulp-livereload"),
	webserver = require("gulp-webserver"),
	uglify = require("gulp-uglify"),
	rename = require("gulp-rename"),
	sass = require("gulp-ruby-sass"),
	imagemin = require("gulp-imagemin"),
	pngquant = require("imagemin-pngquant")
	concat = require("gulp-concat")
    minifycss = require('gulp-minify-css'),
    browserSync = require('browser-sync').create(),
    postcss = require('gulp-postcss'),
  	autoprefixer = require('autoprefixer'),
    del = require('del');
//注册任务
gulp.task("webserver",function(){
	gulp.src("dist").pipe(webserver({
		open:true,
		liverload:true
	}))
})

gulp.task("html",function(){
	gulp.src("src/**/*.html").pipe(gulp.dest("dist"))
})

//gulp.task("sass",function(){
//	console.log(11)
//	return sass("src/scss/**/*.scss",{style:"compact"})
//	.on('error',function(err){
//		console.log(err.message)
//	})
//	.pipe(gulp.dest("dist/css"))
//})

gulp.task("images",function(){
	return gulp.src("src/images/**/*.{png,jpg,gif,svg,JPG}")
//	 .pipe(imagemin({
//	 	progressive:true,
//	 	svgoPlugins:[{removeViewBox:false}],
//	 	use:[pngquant()]
//	 }))
	.pipe(gulp.dest('dist/images'))
})
gulp.task('minifyjs', function() {
    return gulp.src('src/**/*.js')
//      .pipe(concat('main.js'))    
//      .pipe(gulp.dest('minified/js'))    
//      .pipe(rename({suffix: '.min'}))   /
//      .pipe(uglify())    
        .pipe(gulp.dest('dist'));  
});

gulp.task('minifycss', function() {
    return gulp.src('src/**/index.css')  
	    .pipe(postcss([ autoprefixer({ browsers: ['last 2 versions'] }) ]))
//  		.pipe(minifycss())
        .pipe(gulp.dest('dist'));   
});

//gulp.task('clean', function(cb) {
//  del(['dist/css', 'dist/js'], cb)
//});

gulp.task("watch",function(){
	 browserSync.init({
        server: {
            baseDir: "dist"
        }
    });
//	gulp.watch("src/**/*.scss",["sass"]);
	gulp.watch("src/**/*.css",["minifycss"]);
	gulp.watch("src/**/*.html",["html"]);
	gulp.watch("src/**/*.js",["minifyjs"]);
	
	gulp.watch('dist/**', function() {
        browserSync.reload();
    });
});
//gulp.task('default', ['clean'], function() {
//  gulp.start('minifycss', 'minifyjs');
//});
gulp.task("default",["watch","webserver","images","minifycss","html", "minifyjs"]);