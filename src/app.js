const { Client, ActivityType, GatewayIntentBits, Partials, Guild, TextBasedChannelMixin} = require("discord.js");

const { Guilds, GuildMembers, GuildMessages } = GatewayIntentBits;

const client = new Client({
    intents: [Guilds, GuildMembers, GuildMessages],
    partials: [User, Message, GuildMembers, GuildMessages],
});

const botConfig = require("./botConfig/botConfig.json");

client.login(botConfig.token).then(() => {
    console.log(`Bot logged in as ${client.user.tag}`)

    function activity() {
        const randomize = botConfig.presence.randomize;
        const duration = botConfig.presence.duration;
        const activities = botConfig.presence.presence;    
    
        if (randomize) {
            setInterval(() => {
                const rn = require('random-number');

                let indexNumber = rn({ min: 0, max: (activities.length - 1), integer: true });

                let activity = activities[indexNumber];
        
                client.user.setPresence({ activities: [{ name: activity.activity, type: activity.type}] });
              }, duration);
        } else {
            let indexNumber = 0;
            setInterval(() => {
                if (indexNumber == activities.length) indexNumber = 0;

                let activity = activities[indexNumber];

                client.user.setPresence({ activities: [{ name: activity.activity, type: activity.type}] });

                indexNumber++;
            }, duration);
        }
    
    };

    activity();

}).catch((err) => console.log(err));