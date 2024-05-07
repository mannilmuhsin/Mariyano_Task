const fs = require('fs');

const parseData = (filePath) => {
  const data = fs.readFileSync(filePath, 'utf8');
  return JSON.parse(data);
};

module.exports = parseData;