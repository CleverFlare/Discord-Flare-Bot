import { Message, SlashCommandBuilder } from "discord.js";

export default {
  data: new SlashCommandBuilder().setName("storage"),
  async execute(interaction: Message) {
    const res = await fetch("https://json.extendsclass.com/bin/c637a590293b");
    const json = await res.json();
    interaction.channel.send(
      "```json\n" + JSON.stringify(json, null, " ") + "\n```"
    );
  },
};
