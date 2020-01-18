import chai from "chai";
import chatHttp from "chai-http";
import "chai/register-should";
import app from "../index";

chai.use(chatHttp);
const { expect } = chai;
var AUTH_TOKEN = null;
