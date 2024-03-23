module.exports = {
    packagerConfig: {
        asar: false,
    },
    rebuildConfig: {},
    makers: [
        {
            name: "@electron-forge/maker-squirrel",
            config: {},
        },
    ],
    plugins: [
        // {
        //     name: "@electron-forge/plugin-auto-unpack-natives",
        //     config: {},
        // },
    ],
};
