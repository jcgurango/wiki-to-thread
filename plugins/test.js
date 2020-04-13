// A test plugin for testing.
module.exports = async (params) => {
    if (!params) {
        return 'test';
    }

    return params;
};