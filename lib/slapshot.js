const path = require ('path');
const fs = require ('fs');
const mkdirp = require('mkdirp');
const _ = require ('lodash');
const yaml = require ('js-yaml');
const screenshot = require('electron-screenshot-service');

module.exports = function (userArgs) {
   const defaultArgs = {
      config: 'slapshot.yml',
      output: 'output'
   };

   const args = _.extend({}, defaultArgs, userArgs);
   const configFile = path.join(process.cwd(), args.config);

   const config = yaml.safeLoad(fs.readFileSync(configFile, 'utf8'));
   const promises = [];

   config.sizes.forEach((size) => {
      config.screens.forEach((screen) => {
         let url = `${config.baseUrl}${screen.path}`;

         if (config.queryParams) {
            const paramNames = Object.keys(config.queryParams);
            const queryParams = _.map(paramNames, (paramName) => {
               return `${paramName}=${config.queryParams[paramName]}`;
            }).join('&');
            
            const joinCharacter = url.indexOf('?') > 0 ? '&' : '?';
            url = `${url}${joinCharacter}${queryParams}`;
         }
         
         const options = JSON.parse(JSON.stringify(config.options));
         if (screen.options) {
            for (var key in screen.options) {
               options[key] = screen.options[key];
            }
         }
         
         options.width = size.width;
         options.height = size.height;
         options.url = url;

         const promise = screenshot(options)
            .then(function(img){
               return new Promise((resolve, reject) => {
                  var deviceSize = `${size.width}x${size.height}`;
                  var outputDir = path.join(process.cwd(), args.output, deviceSize);
                  var filename = `${screen.name}_${deviceSize}.png`;
                  var outputPath = path.join(outputDir, filename);
                  
                  if (!fs.existsSync(outputDir)) {
                     try {
                        mkdirp.sync(outputDir);
                     }
                     catch (err) {
                        reject(err);
                        return;
                     }
                  }

                  fs.writeFile(outputPath, img.data, function (err) {
                     if (err) {
                        reject(err);
                        return;
                     }
                     
                     resolve(img);
                  });
               });
            })
            .catch((err) => {
               console.log(err);

               throw err;
            })

         promises.push(promise);
      })

      Promise.all(promises)
         .catch((err) => {
            console.log(err);
         })
         .then((img) => {
            screenshot.close();
         });
   })
}