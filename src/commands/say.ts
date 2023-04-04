import { SlashCommandBuilder, Message } from "discord.js";

export default {
  data: new SlashCommandBuilder()
    .setName("say")
    .setDescription("This command will make the bot imitate what you say"),
  async execute(interaction: Message) {
    await interaction.channel.send(interaction.content);
    interaction.delete();
  },
};
