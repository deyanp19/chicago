
const fs = require('fs');
const path = require('path');

function readFileFromParent(filename) {
  const filePath = path.join(__dirname, '..', filename);
  
  try {
    const data = fs.readFileSync(filePath, 'utf-8'); // synchronous read
    return data;
  } catch (err) {
    console.error(`Failed to read file: ${filePath}`, err);
    return null;
  }
}


  test('Check dependency ', ()=>{
      
    const content = readFileFromParent('package.json');
    expect(JSON.parse(content).dependencies).toStrictEqual({
        "bcrypt": "^5.1.1",
        "config": "^3.3.12",
        "cors": "^2.8.5",
        "express": "^4.18.2",
        "express-async-errors": "^3.1.1",
        "fawn": "^2.1.5",
        "joi": "^17.13.3",
        "joi-objectid": "^4.0.2",
        "jsonwebtoken": "^9.0.2",
        "lodash": "^4.17.21",
        "mongoose": "^8.13.2",
        "winston": "^3.17.0",
        "winston-mongodb": "^6.0.0"
      })
});

test('Check for equal ports in .env and config ports',()=>{
    function readFileFromRoot(filename) {
        const filePath = path.join(__dirname, '..', filename);
        
        try {
          const data = fs.readFileSync(filePath, 'utf-8'); // synchronous read
          return data;
        } catch (err) {
          console.error(`Failed to read file: ${filePath}`, err);
          return null;
        }
      }
    const readDotEnv = readFileFromRoot('.env').split('=')[1].trim();

    function readFileConfig(filename) {
        const filePath = path.join(__dirname, '../config', filename);
        
        try {
          const data = fs.readFileSync(filePath, 'utf-8'); // synchronous read
          return data;
        } catch (err) {
          console.error(`Failed to read file: ${filePath}`, err);
          return null;
        }
      }
    const readConfigPort = readFileConfig('production.json').trim();

    expect(readDotEnv).toBe(JSON.parse(readConfigPort).PORT);
})


