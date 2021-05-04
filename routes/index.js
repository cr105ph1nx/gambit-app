
const participantsRouter = require('./participants');
const clubsRouter = require('./clubs');
const adminsRouter = require('./admins');
const participantClubsRouter = require('./participantClubs');

module.exports = (app) =>{
    app.use('/participants', participantsRouter);
    app.use('/clubs', clubsRouter);
    app.use('/admins', adminsRouter);
    app.use('/participantClubs', participantClubsRouter);
}
