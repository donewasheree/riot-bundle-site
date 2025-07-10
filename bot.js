const { Client, GatewayIntentBits } = require('discord.js');
const express = require('express');
const app = express();

const client = new Client({
    intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildMessages, GatewayIntentBits.MessageContent]
});

const WEBHOOK_URL = 'https://discord.com/api/webhooks/1392692196200808508/nWjhLWSCV1S6M_XuhT8nl3FMZ5xfYw4V4j7VgHhyUneUzFsCp05nGcWvQI46fEdMUtWZ';
const BOT_TOKEN = 'YOUR_DISCORD_BOT_TOKEN_HERE'; // Replace with your bot token

app.use(express.json());

app.post('/webhook', async (req, res) => {
    const { content } = req.body;
    if (!content) {
        return res.status(400).send('No content provided');
    }

    try {
        await fetch(WEBHOOK_URL, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ content })
        });
        res.status(200).send('Webhook sent');
    } catch (err) {
        console.error('Webhook error:', err);
        res.status(500).send('Failed to send webhook');
    }
});

client.on('ready', () => {
    console.log(`Logged in as ${client.user.tag}`);
});

client.login(BOT_TOKEN);

app.listen(3000, () => {
    console.log('Server running on port 3000');
});