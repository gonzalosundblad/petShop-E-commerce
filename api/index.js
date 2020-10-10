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
const { Category, Product } = require('./src/db');

var arrayProductosPerros = [{
  name: "Eukanuba Small",
  description: "comida para el perrito",
  price: 750, 
  stock: 100,
  categoryId: 1
},{
  name: "Dog Chow BIG",
  description: "comida para el PERROTE",
  price: 780, 
  stock: 100,
  categoryId: 1
},{
  name: "Pedigree MEDIUM",
  description: "comida para el perrito",
  price: 150, 
  stock: 100,
  categoryId: 1
}];

var arrayProductosGatos = [{
  name: "Cat Chow",
  description: "comida para el michi de la ciudad",
  price: 750, 
  stock: 100,
  categoryId: 2
},{
  name: "Fideos con tuco de anoche",
  description: "comida para el michi del barrio",
  price: 555, 
  stock: 100,
  categoryId: 2
},{
  name: "WHISKAS",
  description: "comida para el michi cheto",
  price: 600, 
  stock: 100,
  categoryId: 2
},{
  name: "BOQUITA",
  description: "comida para el michi cheto",
  price: 600, 
  stock: 100,
  categoryId: 2
},{
  name: "birrita",
  description: "comida para el michi cheto",
  price: 600, 
  stock: 100,
  categoryId: 2
}]

Product.addHook('beforeValidate', (product, options) => {
  product.name = product.name.toUpperCase() + ' jejejeje'.toUpperCase();
})

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

    var AlimentoPerro = arrayProductosPerros.map(e => {
      Product.create(e);
    })

    var AlimentoGato = arrayProductosGatos.map(e => {
      Product.create(e);
    })
  
    Promise.all([Perros, Gatos, Aves, AlimentoGato, AlimentoPerro])
      .then(res => {
        console.log("Categorías y producto precargades");
      });
  });
});