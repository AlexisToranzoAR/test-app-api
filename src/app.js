const express = require("express");
const compression = require("compression");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const logger = require("morgan");

const app = express();

const configureDI = require("./config/di");
/* const { initUserModule } = require("./modules/user/module");
const { initMemberModule } = require("./modules/member/module");
const { initTypeModule } = require("./modules/type/module");
const { initStatusModule } = require("./modules/status/module"); */
const { initContactModule } = require("./modules/contact/module");

const PORT = process.env.PORT || 3000;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

const container = configureDI();
app.use(logger("dev"));
app.use(cookieParser());
app.use(compression());
app.use(cors());

/* initUserModule(app, container);
initMemberModule(app, container);
initTypeModule(app, container);
initStatusModule(app, container); */
initContactModule(app, container); 

app.use((e, req, res, next) => {
  if (e.message === 'Validation error') {
    e.status = 404;
  }
  res.status(e.status || 500).json(e);
});

app.listen(PORT, () => {
  console.log(`Listening on ${PORT}`);
});

module.exports = {
  container,
};
