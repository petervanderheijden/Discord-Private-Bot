client.on('presenceUpdate', (oldPresence, newPresence) => {
    let member = newPresence.member;
    // User id of the user you're tracking status.
    if (member.id === '<userId>') {
        if (oldPresence.status !== newPresence.status) {
            // Your specific channel to send a message in.
            let channel = member.guild.channels.cache.get('<channelId>');
            // You can also use member.guild.channels.resolve('<channelId>');

            let text = "";

            if (newPresence.status === "online") {
                text = "Our special member is online!";
            } else if (newPresence.status === "offline") {
                text = "Oh no! Our special member is offline.";
            }
            // etc...

            channel.send(text);
        }
    }
});

const { Client, ActivityType, GatewayIntentBits, Partials, Guild} = require("discord.js");

const { Guilds, GuildMembers, GuildMessages } = GatewayIntentBits;
const { User, Message, GuildMember, ThreadMember } = Partials;

const client = new Client({
    intents: [Guilds, GuildMembers, GuildMessages],
    partials: [User, Message, GuildMembers, GuildMessages],
});

const botConfig = require("./botConfig/botConfig.json");

client.rest.on("")

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