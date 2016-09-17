// GULPFILE.JS CONFIGURATION

// include gulp plugins
var 
    gulp        = require("gulp"),
    newer       = require("gulp-newer"),
    imagemin    = require("gulp-imagemin"),
    del         = require("del"),
    pkg         = require("./package.json");
   

// file locations 

var
    devBuild = ((process.env.NODE_ENV || "development").trim().toLowerCase() !== "production"),

    source = "source/",
    destination = "build/",
    
    images = {
        in: source + "images/*.*",
        out: destination + "images"
    };
    
// show build type
console.log(pkg.name + " " + pkg.version + ", " + (devBuild ? "development" : "production") + " build");
    
// clean build folder
gulp.task("clean", function() {
    del([
        destination + "*"
    ]);
});
    
// copy and minify source images

gulp.task("images", function() {
    return gulp.src(images.in)
            .pipe(newer(images.out))
            .pipe(imagemin())
            .pipe(gulp.dest(images.out));
});


// gulp default task

gulp.task("default", ["images"], function(){
    // changes in images-in folder
    gulp.watch(images.in, ["images"]);
});
