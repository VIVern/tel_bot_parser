const Nightmare = require('nightmare');
const TelegramBot = require('node-telegram-bot-api');

var TOKEN = 'your bot token as a string';
var bot = new TelegramBot(TOKEN, { polling: true });

bot.on('message',function(msg){
  const id = msg.chat.id;

  if (msg.text == '/start') {
    bot.sendMessage(id,"For info press /info");
  }

  if(msg.text == '/info'){
    bot.sendMessage(id,"Pres /parse to get needed info and wait few seconds");
  }

  if(msg.text == '/parse'){

    let n = Nightmare({
      openDevTools: {
        mode: 'detach',
      },
      show:true,
      width:1,
      height:1
    });
    n.goto('https://iqeon.io/ru').wait('body > app-root > ng-component > ng-component > landing-lead > div > div > div:nth-child(1) > div.col-lg-6.lead__item.lead__item--right > div > my-timer > div > div.timer__inner.timer__inner--no-radius.timer__inner--divider > b > span').mouseover('body > app-root > ng-component > ng-component > landing-lead > div > div > div:nth-child(1) > div.col-lg-6.lead__item.lead__item--right > div > my-timer > div > div.timer__inner.timer__inner--no-radius.timer__inner--divider > b > span').evaluate(function(){
      return document.querySelector('body > app-root > ng-component > ng-component > landing-lead > div > div > div:nth-child(1) > div.col-lg-6.lead__item.lead__item--right > div > my-timer > div > div.timer__inner.timer__inner--no-radius.timer__inner--divider > b > span').innerHTML;
    }).end().then(function(result){bot.sendMessage(id,result); return;});


  }

})
