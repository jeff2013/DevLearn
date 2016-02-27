const gulp = require('gulp')
const gls = require('gulp-live-server')

const paths = {
	routes: './routes/**/*.js',
	views: './views/*.jade',
	static: './public/**/*.css',
	app: './app.js'
}

const server = gls(paths.app)

gulp.task('serve', function(){
	server.start('./bin/www')
})

gulp.task('watch', ['serve'], function(){
	gulp.watch([
			paths.app,
			paths.routes
		], function(){
			console.log('### restart')
			server.start()
		})
	gulp.watch([
			paths.views,
			paths.static
		], function(){
			console.log('### notify change')
			server.notify();	
		})
});
