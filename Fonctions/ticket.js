module.exports = prefix => {
    let characters = [..."ABCDEFGHIJKLMNOPKRSTUVWXYZ0123456789"];
    let ID = [];
    for (let i = 0; i < 10; i++) {
      ID.push(characters[Math.floor(Math.random() * characters.length)]);
    }
    return `${prefix}-${ID.join("")}`;
  };