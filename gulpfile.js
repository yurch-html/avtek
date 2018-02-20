const gulp =                  require('gulp');
const del =                   require('del');
const browserSync =           require('browser-sync');
const sass =                  require('gulp-sass');
const rigger =                require('gulp-rigger');
const rename =                require('gulp-rename');
const prefix =                require('gulp-autoprefixer');
const cssnano =               require('gulp-cssnano');
const sourcemaps =            require('gulp-sourcemaps');
const concat =                require('gulp-concat');
const uglify =                require('gulp-uglify');
const imagemin	=             require('gulp-imagemin');
const pngquant	=             require('imagemin-pngquant');
const plumber =               require("gulp-plumber");
const svgSprite =             require('gulp-svg-sprites');
const svgmin =                require('gulp-svgmin');
const cheerio =               require('gulp-cheerio');
const replace =               require('gulp-replace');

const { reload } = browserSync;

const path = {
  dist: {
    html: 'dist/html',
    js: 'dist/js',
    css: 'dist/css',
    img: 'dist/img',
    svg: 'dist/img/svg-sprite',
  },
  src: {
    html: 'src/html',
    js: 'src/js',
    sass: 'src/sass',
    img: 'src/img/**/*',
    svg: 'src/img/svg-sprite/ico/*',
  },
};

const config = {
  js: [`node_modules/jquery/dist/jquery.js`,`${path.src.js}/libs/slick.min.js`, `${path.src.js}/main.js`],
};

gulp.task('html', () => {
  del.sync([path.dist.html]);

  gulp
    .src(`${path.src.html}/*.html`)
    .pipe(rigger())
    .pipe(gulp.dest(path.dist.html));
});

gulp.task('html-watch', ['html'], reload);

gulp.task('sass', () => {
  del.sync([path.dist.css]);

  return gulp
    .src(`${path.src.sass}/**/*.scss`)
    .pipe(plumber())
    .pipe(sass())
    .pipe(prefix(['last 20 versions', '> 1%', 'ie 8', 'ie 7']))
    .pipe(sourcemaps.write())
    .pipe(gulp.dest(path.dist.css))
    .pipe(reload({ stream: true }));
});

gulp.task('css-min-style', ['sass'], () =>
  gulp
    .src(`${path.dist.css}/style.css`)
    .pipe(sourcemaps.init())
    .pipe(cssnano())
    .pipe(rename({ suffix: '.min' }))
    .pipe(gulp.dest(path.dist.css))
    .pipe(reload({ stream: true }))
);

gulp.task('js', () => {
  del.sync([path.dist.js]);

  return gulp
    .src(config.js)
    .pipe(concat('build.js'))
    .pipe(uglify())
    .pipe(gulp.dest(path.dist.js))
    .pipe(reload({ stream: true }));
});

gulp.task('img', function() {
  gulp
    .src(path.src.img)
    .pipe(imagemin({
        interlaced: true,
        progressive: true,
        svgoPlugins: [{removeViewBox: false}],
        use: [pngquant()]
  }))
  .pipe(gulp.dest(path.dist.img));
});

gulp.task('svgSpriteBuild', function () {
  return gulp.src(path.src.svg)
  // minify svg
    .pipe(svgmin({
      js2svg: {
        pretty: true
      }
    }))
    // remove all fill and style declarations in out shapes
    .pipe(cheerio({
      run: function ($) {
        $('[fill^="#"]').removeAttr('fill');
        $('[style]').removeAttr('style');
        $('[class]').removeAttr('class');
        $('style').remove();
        $('title').remove();
      },
      parserOptions: { xmlMode: true }
    }))
    // cheerio plugin create unnecessary string '>', so replace it.
    .pipe(replace('&gt;', '>'))
    // build svg sprite
    .pipe(svgSprite({
        mode: "symbols",
        preview: false,
        svg: {
          symbols: 'sprite.svg'
        }
      }
    ))
    .pipe(gulp.dest(path.dist.svg));
});

gulp.task('build', ['html', 'css-min-style', 'js', 'img', 'svgSpriteBuild']);

gulp.task('watch', ['build'], () => {
  browserSync({ server: './dist' });

  gulp.watch(`${path.src.html}/**/*.html`, ['html-watch']);
  gulp.watch(`${path.src.sass}/**/*.scss`, ['css-min-style']);
  gulp.watch(`${path.src.js}/**/*.js`, ['js']);
  gulp.watch(`${path.src.img}`, ['img']);
  gulp.watch(`${path.src.svg}`, ['svgSpriteBuild']);
});