const fs = require("fs");
const path = require("path");

function readFileFromParent(filename, relativePath) {
  const filePath = path.join(__dirname, relativePath, filename);

  try {
    const data = fs.readFileSync(filePath, "utf-8"); // synchronous read
    return data;
  } catch (err) {
    console.error(`Failed to read file: ${filePath}`, err);
    return null;
  }
}

describe("reading for ports and dependencies", () => {
  it("Check dependency ", () => {
    const content = readFileFromParent("package.json", "../../..");
    expect(JSON.parse(content).dependencies).toStrictEqual({
     "bcrypt": "^5.1.1",
    "compression": "^1.8.1",
    "config": "^3.3.12",
    "cors": "^2.8.5",
    "express": "^4.18.2",
    "express-async-errors": "^3.1.1",
    "fawn": "^2.1.5",
    "helmet": "^8.1.0",
    "joi": "^17.13.3",
    "joi-objectid": "^4.0.2",
    "jsonwebtoken": "^9.0.2",
    "lodash": "^4.17.21",
    "mongoose": "^8.13.2",
    "winston": "^3.17.0",
    "winston-mongodb": "^6.0.0"
    });
  });

  it("Check for equal ports in .env and config ports", () => {
    function readFileFromRoot(filename) {
      const filePath = path.join(__dirname, "../../../", filename);

      try {
        const data = fs.readFileSync(filePath, "utf-8"); // synchronous read
        return data;
      } catch (err) {
        console.error(`Failed to read file: ${filePath}`, err);
        return null;
      }
    }
    const readDotEnv = readFileFromRoot(".env").split("=")[1].trim();

    function readFileConfig(filename) {
      const filePath = path.join(__dirname, "../../../config/", filename);

      try {
        const data = fs.readFileSync(filePath, "utf-8"); // synchronous read
        return data;
      } catch (err) {
        console.error(`Failed to read file: ${filePath}`, err);
        return null;
      }
    }
    const readConfigPort = readFileConfig("production.json").trim();

    expect(JSON.parse(readDotEnv)).toBe(JSON.parse(readConfigPort).PORT);
  });

  it("Check existence of jwtPrivateKey in default.json file", () => {
    const readProdJWT = readFileFromParent("production.json", "../../../config/");

    expect(JSON.parse(readProdJWT).jwtPrivateKey.trim().length ).toBeGreaterThanOrEqual(1);
  });
});
const jwt = require("jsonwebtoken");
const config = require("config");
const authMiddleware = require("../../../middleware/auth"); // Your middleware file

jest.mock("jsonwebtoken");
jest.mock("config");

describe("auth middleware", () => {
  let req, res, next;

  beforeEach(() => {
    req = { header: jest.fn() };
    res = { status: jest.fn().mockReturnThis(), send: jest.fn() };
    next = jest.fn();
  });

  it("should return 401 if no token is provided", () => {
    req.header.mockReturnValue(null);

    authMiddleware(req, res, next);

    expect(res.status).toHaveBeenCalledWith(401);
    expect(res.send).toHaveBeenCalledWith(
      "Access denied. Where is the token, its not provided"
    );
    expect(next).not.toHaveBeenCalled();
  });

  it("should call next if token is valid", () => {
    const token = "valid-token";
    const decoded = { id: "123", name: "User" };
    req.header.mockReturnValue(token);
    config.get.mockReturnValue("jwtPrivateKey");
    jwt.verify.mockReturnValue(decoded);

    authMiddleware(req, res, next);

    expect(req.user).toEqual(decoded);
    expect(next).toHaveBeenCalled();
    expect(res.status).not.toHaveBeenCalled();
  });

  it("should return 400 if token is invalid", () => {
    req.header.mockReturnValue("invalid-token");
    config.get.mockReturnValue("jwtPrivateKey");
    jwt.verify.mockImplementation(() => {
      throw new Error("Invalid token");
    });

    authMiddleware(req, res, next);

    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.send).toHaveBeenCalledWith("Invalid token");
    expect(next).not.toHaveBeenCalled();
  });
});


describe('Testing error values on auth module',()=>{

  it('should throw error when req is errored', ()=>{
    //Null        //NaN   //false
    //undefined   //''    //0

    const arg = [null, undefined, NaN, '',0, false];
    arg.forEach((req)=>{
      expect(()=>{authMiddleware(req)}).toThrow(TypeError);
    })
  })

  it('should throw error when response is errored', ()=>{
    //Null        //NaN   //false
    //undefined   //''    //0

    const arg = [null, undefined, NaN, '',0, false];
    arg.forEach((res)=>{
      
      expect(()=>{authMiddleware({res})}).toThrow(TypeError);
    })
  })
})