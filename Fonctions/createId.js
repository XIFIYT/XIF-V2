module.exports = async prefix => {

     let caracteres = [..."ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!"]
     let ID = [];
     for (let i = 0; i < 10; i++) ID.push(caracteres[Math.floor(Math.random() * caracteres.length)])
     return `${prefix}${ID.join("")}`;
}


