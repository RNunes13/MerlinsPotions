
import taskerify from 'taskerify';

taskerify.config.sourcemaps = false;
taskerify.config.srcPath = './src/assets';
taskerify.config.distPath = './dist/assets';
taskerify.config.srcViewsPath = './src';
taskerify.config.distViewsPath = './dist';

const SRC = taskerify.config.srcPath;
const DIST = taskerify.config.distPath;

const storeName = 'merlins_potions';
const commomFiles = ['globals'];
const otherFiles = ['general', 'home'];

taskerify((mix) => {
    // PugJS Template
    mix.pug();

    // Javascript Linter
    mix.eslint();

    // SVG to Iconfonts
    mix.iconfont({
        /** Plugin options - Default Values */
        normalize: true,
        fontHeight: 1001,
        centerHorizontally: true,

        /** Fonts / CSS options */
        /* iconsPath       : `${SRC}/common/icons/`,
        sassPath        : `${SRC}/common/scss/settings/`,
        fontPath        : '/arquivos/',
        outputFontPath  : `${DIST}/common/iconfonts/`,
        className       : 'iconfont',
        iconFontName    : `${storeName}-iconfonts`,
        template        : `${SRC}/common/scss/utils/_iconfonts-template.scss`,
        sassFileName    : '_iconfonts',
        customExtension : '.css', */
    });

    // Image Minifier
    mix.imagemin(`${SRC}/img`, `${DIST}/img`);

    // Common Files
    commomFiles.map((file) => {
        mix.browserify(`${SRC}/js/common/${storeName}-common-${file}.js`, `${DIST}/js/common`)
            .sass(`${SRC}/scss/common/${storeName}-common-${file}.scss`, `${DIST}/css/common`);
    });

    otherFiles.map((file) => {
        mix.browserify(`${SRC}/js/${storeName}-${file}.js`, `${DIST}/js`)
            .sass(`${SRC}/scss/${storeName}-${file}.scss`, `${DIST}/css`);
    });
});
