const userRouters = require("./users");
const participantsRouter = require("./participants");
const clubsRouter = require("./clubs");
const adminsRouter = require("./admins");
const participantClubsRouter = require("./participantClubs");
const userControllers = require("../controllers/userControllers");

module.exports = (app) => {
  app.use("/users", userRouters);
  app.use("/participants", participantsRouter);
  app.use("/clubs", clubsRouter);
  app.use("/admins", adminsRouter);
  app.use("/participantClubs", participantClubsRouter);

  app
    .route("/board")
    .post(
      userControllers.participantRequired,
      userControllers.participantProfile
    );
  app
    .route("/panel")
    .post(userControllers.adminRequired, userControllers.adminProfile);
};
