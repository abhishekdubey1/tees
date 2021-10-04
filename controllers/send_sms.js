/* eslint-disable no-console */
const dotenv = require('dotenv');

dotenv.config({ path: './config.env' });
// const accountSid = process.env.TWILIO_ACCOUNT_SID;
// const authToken = process.env.TWILIO_AUTH_TOKEN;
const client = require('twilio')(
  'AC06eb5723614f423d151a6a9d014ad8dc',
  'f9e94a6c4dbaa87ae1654ff248960068'
);

client.messages
  .create({
    body:
      'Aapke sath prank hua h, apne phone k camera mein dekh k hath hila de',
    from: '+18316099578',
    to: '+917977834900'
    // 8263019264
  })
  .then(message => console.log(message.sid))
  .catch(err => console.log(err));
