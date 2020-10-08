//                       _oo0oo_
//                      o8888888o
//                      88" . "88
//                      (| -_- |)
//                      0\  =  /0
//                    ___/`---'\___
//                  .' \\|     |// '.
//                 / \\|||  :  |||// \
//                / _||||| -:- |||||- \
//               |   | \\\  -  /// |   |
//               | \_|  ''\---/''  |_/ |
//               \  .-\__  '-'  ___/-. /
//             ___'. .'  /--.--\  `. .'___
//          ."" '<  `.___\_<|>_/___.' >' "".
//         | | :  `- \`.;`\ _ /`;.`/ - ` : | |
//         \  \ `_.   \_ __\ /__ _/   .-` /  /
//     =====`-.____`.___ \_____/___.-`___.-'=====
//                       `=---='
//     ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
const server = require('./src/app.js');
const { conn } = require('./src/db.js');
const { Category } = require('./src/db');


// Syncing all the models at once.
const force = true;
conn.sync({ force }).then(() => {
  server.listen(3000, () => {
    console.log('%s listening at 3000'); // eslint-disable-line no-console

    var Perros =  Category.create({
      name: "Perros",
      description: "Categoria que habla sobre perros"
      });
  
    var Gatos =  Category.create({
      name: "Gatos",
      description: "Categoria que habla sobre gatos"
    });
  
    var Aves =  Category.create({
      name: "Aves",
      description: "Categoria que habla sobre aves"
    });
  
    Promise.all([Perros, Gatos, Aves])
      .then(res => {
        console.log("Categorías precargadas");
      });
  });
});