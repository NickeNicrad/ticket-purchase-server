const express = require('express');
const cors = require('cors');
const {json, urlencoded} = require('express');
const {db} = require('./connector.js');
const authRoutes = require('./routes/auth.routes.js');
const clientRoutes = require('./routes/client.routes.js');
const userRoutes = require('./routes/user.routes.js');
const invoiceRoutes = require('./routes/invoice.routes.js');
const bonusRoutes = require('./routes/bonus.routes.js');
const boatRoutes = require('./routes/boat.routes.js');
const messageRoutes = require('./routes/message.routes.js');
const notificationRoutes = require('./routes/notification.routes.js');

// const privateKey = 'vE0Si1sFqcZMbCjpxOskz5ATUkwpfUCe5tnPEKxo3IM';
// const publicKey = 'BO-GvNLwWpunTELfq-yjZa7a6jwdnWTYdnRLgfAEUOZ9KBZqNnrPuqIfCi3VHr6xhzy62ZlWptODQajjU9oVrY0';

const app = express();

app.use(cors());
app.use(json());
app.use(urlencoded({extended: true}));

app.use('/auth', authRoutes);
app.use('/api/client', clientRoutes);
app.use('/api/user', userRoutes);
app.use('/api/invoice', invoiceRoutes);
app.use('/api/bonus', bonusRoutes);
app.use('/api/boat', boatRoutes);
app.use('/api/message', messageRoutes);
app.use('/api/notification', notificationRoutes);

const PORT = process.env.PORT || 5000;

db.authenticate()
    .then(() => console.log('Database Successfully Connected!'))
    .catch(err => console.error('error: ' + err));
    
app.listen(PORT, console.log('server running on port: ', PORT));