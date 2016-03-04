var gulp 			= require('gulp'),
    connect 		= require('gulp-connect'),
    autoprefixer 	= require('gulp-autoprefixer'),
    imagemin 		= require('gulp-imagemin'),
    pngquant		= require('imagemin-pngquant');
    minifyCss 		= require('gulp-minify-css'),
    sass 			= require('gulp-sass'),
    plumber 		= require('gulp-plumber'),
	concat 			= require('gulp-concat'),
	sourcemaps 		= require('gulp-sourcemaps'),
	rucksack 		= require('gulp-rucksack'),
    watch 			= require('gulp-watch');

var source = {
	sass:'app/sass/**/*.scss',
	img:'app/img/*',
	script:'app/scripts/**/*.js',
	mainjs:'app/scripts/main.js',
	html:'app/**/*.html'
};

var dest = {
	css:'public/css',
	js:'public/js',
	img:'public/img',
	html:'public'
};
 
gulp.task('connect', function() {
  connect.server({
    root: 'public',
    livereload: true
  });
});


/*error handler*/

var onError = function(err){
	console.log(err);
	this.emit('end');
}

/*TASKS*/
/*---------------------------------------------------*/

/*compile sass*/

gulp.task('sass',function(){
	return gulp.src(source.sass)
		        .pipe(plumber({
		        	errorHandler:onError
		        }))
		        .pipe(sass())
		        .pipe(autoprefixer('last 2 versions'))
		        .pipe(gulp.dest(dest.css))
		        .pipe(minifyCss())
		        .pipe(sourcemaps.init())
		        .pipe(rucksack())
		        .pipe(sourcemaps.write())
		        .pipe(gulp.dest(dest.css));
});

/*---------------------------------------------------*/

/*compile JS*/

gulp.task('js',function(){
	return gulp.src(source.mainjs)
	.pipe(plumber({
		        	errorHandler:onError
		        }))

	.pipe(concat('app.min.js'))
	.pipe(gulp.dest(dest.js));
});

/*---------------------------------------------------*/
/*html*/
gulp.task('html',function(){
	return gulp.src(source.html)
		.pipe(gulp.dest(dest.html))
		.pipe(connect.reload());

});


gulp.task('img', function (){
	return gulp.src(source.img)
		.pipe(imagemin({
			progressive: true,
			svgoPlugins: [{removeViewBox: false}],
			use: [pngquant()]
		}))
		.pipe(gulp.dest(dest.img));
});

/*watch changes*/

gulp.task('watch',function(){
	gulp.watch(source.sass,['sass']);
	gulp.watch(source.script,['js']);
	gulp.watch(source.html,['html']);
	gulp.watch(source.img,['img']);
});
 
gulp.task('default', ['connect', 'watch','sass','js','html','img']);