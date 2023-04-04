import { Message, SlashCommandBuilder } from "discord.js";
import { scheduler } from "..";

export default {
  data: new SlashCommandBuilder().setName("schedule"),
  async execute(interaction: Message) {
    interaction.reply("On it!");
    scheduler.scheduleMessage({
      action: () => {
        interaction.channel.send("Hello World");
      },
      date: "2m",
    });
  },
};
