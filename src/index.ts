// import { Message } from "discord.js";
// import commandRouter from "./commandsStore";
// import * as dotenv from "dotenv"; // see https://github.com/motdotla/dotenv#how-do-i-use-dotenv-with-import
// import { Client, GatewayIntentBits } from "discord.js";

// dotenv.config();

// const client = new Client({
//   intents: [
//     GatewayIntentBits.Guilds,
//     GatewayIntentBits.GuildMessages,
//     GatewayIntentBits.MessageContent,
//   ],
// });

// const prefix = "!";

// client.on("messageCreate", async function (message: Message) {
//   try {
//     if (message.author.bot) return;
//     if (!message.content.startsWith(prefix)) return;

//     const messageArray = message.content.split(" ");
//     const command = messageArray[0].replace(prefix, "");

//     commandRouter(message, command);
//   } catch (err) {
//     console.log(err);
//   }
// });

// client.login(process.env.DISCORD_TOKEN);
// console.log("ChatGPT Bot is up and running");

import * as dotenv from "dotenv"; // see https://github.com/motdotla/dotenv#how-do-i-use-dotenv-with-import
import {
  Client,
  GatewayIntentBits,
  Collection,
  Events,
  SlashCommandBuilder,
  Message,
} from "discord.js";
import path from "path";
import { readdirSync } from "fs";
import Scheduler from "./timeline";

dotenv.config();

let prefix = ":";

export const scheduler = new Scheduler();

type User = Client & { commands?: Collection<any, any> };
enum BotEvents {
  Command = "command",
}

const client: User = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent,
  ],
});

client.once(Events.ClientReady, (c) => {
  console.log(`Your server is ready ${c.user.tag}`);
});

client.commands = new Collection();

const commandsPath = path.join(__dirname, "commands");
const commandFiles = readdirSync(commandsPath).filter((file) =>
  file.endsWith(".ts" || ".js")
);

interface SlashCommand {
  data: SlashCommandBuilder;
  execute: (interaction: Message) => any;
}

for (const file of commandFiles) {
  const filePath = path.join(commandsPath, file);
  const command: SlashCommand = require(filePath).default;

  if ("data" in command && "execute" in command)
    client.commands!.set(command.data.name, command);
  else {
    console.log(
      `[WARNING] The command at ${filePath} is missing a required "data" or "execute" property.`
    );
  }
}

client.on(Events.InteractionCreate, async (interaction) => {
  if (!interaction.isChatInputCommand()) return;

  const command = (interaction.client as User).commands?.get(
    interaction.commandName
  );

  if (!command) {
    console.log(`there is no such command as ${interaction.commandName}`);
    return;
  }

  try {
    command.execute(interaction);
  } catch (err) {
    console.error(err);
    if (interaction.replied || interaction.deferred) {
      await interaction.followUp({
        content: "There was an error while executing this command!",
        ephemeral: true,
      });
    } else {
      await interaction.reply({
        content: "There was an error while executing this command!",
        ephemeral: true,
      });
    }
  }
});

type Command = Message<true> & { command: string };

client.on(BotEvents.Command, async (interaction) => {
  const command = (interaction.client as User).commands?.get(
    interaction.command
  );

  if (!command) {
    console.log(`there is no such command as ${interaction.commandName}`);
    interaction.reply("There is no such command.");
    return;
  }

  try {
    command.execute(interaction);
  } catch (err) {
    console.error(err);
  }
});

client.on(Events.MessageCreate, async (interaction) => {
  if (interaction.author.bot) return;
  if (!interaction.content.startsWith(prefix)) return;

  const command = interaction.content.replace(prefix, "").split(" ")[0];

  (interaction as Command).command = command;

  interaction.content = interaction.content.substr(
    interaction.content.indexOf(" ") + 1
  );

  client.emit(BotEvents.Command, interaction);
});

client.login(process.env.DISCORD_TOKEN);
