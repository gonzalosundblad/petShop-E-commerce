// var array = []

// export const loadState = () => {
//   try {
//     const serializedData = localStorage.getItem("carrito");
//     if (serializedData === null) {
//       return undefined;
//     }
//     return JSON.parse(serializedData);
//   } catch (error) {
//     return undefined;
//   }
// };
// export const saveState = (state) => {
//   try {
//     let serializedData = JSON.stringify(state);
//     localStorage.setItem("carrito", serializedData);
//   } catch (error) {
//   }
// };