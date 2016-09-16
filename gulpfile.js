// GULPFILE.JS CONFIGURATION

// include gulp plugins
var 
    gulp = require("gulp"),
    newer = require("gulp-newer"),
    imagemin = require("gulp-imagemin");
   

// file locations 

var
    source = "source/",
    destination = "build/",
    
    images = {
        in: source + "images/*.*",
        out: destination + "images"
    };
    
// copy and minify source images

gulp.task("images", function() {
    return gulp.src(images.in)
            .pipe(newer(images.out))
            .pipe(imagemin())
            .pipe(gulp.dest(images.out));
});


// gulp default task

gulp.task("default", function(){

});
