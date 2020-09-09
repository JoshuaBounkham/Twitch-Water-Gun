const io = require('socket.io-client');
const request = require('request');
require('dotenv').config();

// the .env file has the api key from streamslabs
const streamlabs = io(`https://sockets.streamlabs.com?token=${process.env.API_KEY}`, {transports: ['websocket']});

streamlabs.on('connect', () => console.log("Connecting Works Pussy boi"))

//Perform Action on event
streamlabs.on('event', eventData => 
{
    if (eventData.for === 'streamlabs' && eventData.type === 'donation') 
    {
      //code to handle donation events
      //shows how much someone has donated
      let donationAmount = eventData.message[0]['amount'];

      if(donationAmount >= 10)
      {
        //sends a get request to the webserver
        request.get('your-websever-here', (err, res, body)=>
        {
          if(err) console.log(err);
          console.log('WORKED... TOTAL AMOUNT DONATED: $' + donationAmount);
        })
      }
    }

    if (!eventData.for && eventData.type === 'subscription-playing') 
    {
      //code to handle sub events
      //i think this will be able to let me see gifted subs as well
      let amount = eventData.message.amount;

      //if null, it will return false
      let giftedSubs = amount ? parseInt(amount) : 1;
      console.log(eventData.message);
      console.log('Amount of gifted subs: ' + giftedSubs);
    }

    if (eventData.for === 'twitch_account' && eventData.type === 'follow') 
    {
      //code to handle follow events
      console.log(eventData.message);
    }
});