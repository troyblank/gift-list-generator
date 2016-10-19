module.exports = {
    test: [
        'lint',
        'unit'
    ],
    lint: [
        'eslint'
    ],
    unit: 'mocha_istanbul',
    default: 'test'
};
