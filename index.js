const express = require('express');
const server = express();
const Discord = require('discord.js-selfbot-v13');
const client = new Discord.Client({
  readyStatus: false,
  checkUpdate: false
});

// Servidor Express para mantener el bot despierto
server.all('/', (req, res) => {
  res.send('NOW GO TO ANY UPTIME APP and paste this link');
});

function keepAlive() {
  server.listen(3000, () => { 
    console.log('Server is Ready!! ' + Date.now()); 
  });
}

keepAlive();

function formatTime() { 
  const date = new Date();
  const options = {
    timeZone: 'America/New_York',
    hour12: true,
    hour: 'numeric',
    minute: 'numeric'
  };
  return new Intl.DateTimeFormat('en-US', options).format(date);
}

client.on('ready', async () => {
  try {
    console.clear();
    console.log(`${client.user.tag} - rich presence started!`);

    const r = new Discord.RichPresence()
      .setApplicationId('1242597769479196863')
      .setType('STREAMING')
      .setURL('https://www.twitch.tv/djmariio')
      .setState('Vladimir.')
      .setName('TheLastSide')
      .setDetails(`Capsula Lucario [${formatTime()}]`)
      .setStartTimestamp(Date.now())
      .setAssetsLargeImage('https://media.discordapp.net/attachments/847873203338215487/1242593269058375682/e565774cc2a67b06a6664644ce585d0c.gif?ex=664e66a9&is=664d1529&hm=45ea149116f66e3156ea355c88e2e5fa21164acc23aff9e9933e4106c502d129&=&width=280&height=350')
      .setAssetsLargeText('Newton fontanero')
      .setAssetsSmallImage('https://media.discordapp.net/attachments/847873203338215487/1242594091414323230/4b2999183500d518549c6608578f181c.gif?ex=664e676d&is=664d15ed&hm=c8921cadc7df9a474fafa2a62d18be618328c0a1f00bb8f3d69920dbd518af29&=')
      .setAssetsSmallText('Cuac')
      .addButton('WubbaLubba', 'https://www.youtube.com/watch?v=NR8EjXXoPs')
      .addButton('Gloria y Corona', 'https://www.youtube.com/watch?v=Vpae6911F3A');

    client.user.setActivity(r);
    client.user.setPresence({ status: "Dnd" });

    let prevTime = null;
    setInterval(() => {
      const newTime = formatTime();
      if (newTime !== prevTime) {
        const newDetails = `Deadpool fumadón [${newTime}]`;
        r.setDetails(newDetails);
        client.user.setActivity(r);
        prevTime = newTime;
      }
    }, 1000);
  } catch (error) {
    console.error('Error during ready event:', error);
  }
});

// Reconexión automática en caso de desconexión
client.on('disconnect', (event) => {
  console.log('Bot disconnected:', event.reason);
  client.login(process.env['TOKEN']).catch(console.error);
});

// Inicia sesión en el bot de Discord
const mySecret = process.env['TOKEN'];
client.login(mySecret);
