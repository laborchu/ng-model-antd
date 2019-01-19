const fs = require('fs');
var pkgJson = require('../package.json');
var targetPkgJson = {};
var fieldsToCopy = ['name', 'version', 'description', 'keywords', 'author', 'repository', 'license', 'bugs', 'homepage'];

fieldsToCopy.forEach(function (field) { targetPkgJson[field] = pkgJson[field]; });
targetPkgJson['main'] = `bundles/${targetPkgJson['name']}.umd.js`;
targetPkgJson['module'] = 'index.js';
targetPkgJson['typings'] = 'index.d.ts';
targetPkgJson.peerDependencies = {};
Object.keys(pkgJson.dependencies).forEach(function (dependency) {
    targetPkgJson.peerDependencies[dependency] = `^${pkgJson.dependencies[dependency]}`;
});

fs.writeFile("./dist/lib/package.json", JSON.stringify(targetPkgJson, null, 2), function(err) {
    if(err) {
        return console.log(err);
    }
    console.log("The file was saved!");
}); 