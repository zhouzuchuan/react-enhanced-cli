module.exports = {
    plugins: {
        'postcss-import': {},
        'postcss-url': {},
        'postcss-cssnext': {},
        autoprefixer: {
            browsers: [
                '>1%',
                'last 4 versions',
                'Firefox ESR',
                'not ie < 9' // React doesn't support IE8 anyway
            ],
            flexbox: 'no-2009'
        }
    }
}
