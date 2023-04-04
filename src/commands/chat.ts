import { Message, SlashCommandBuilder } from "discord.js";
// import NLPCloudClient from "nlpcloud";

// const client = new NLPCloudClient(
//   "fast-gpt-j",
//   "7f2a35a321ecb2161163d64e5fd2de7f6dc52167"
// );

interface HistoryMessage {
  input: string;
  response: string;
}

const context =
  "This is a discussion between a human and an AI. The AI is so friendly and called Flare Bot.";

const model = "fast-gpt-j";

function requestChatbot(
  input: string,
  context: string,
  history: HistoryMessage[]
) {
  const headers = {
    Authorization: `Token 7f2a35a321ecb2161163d64e5fd2de7f6dc52167`,
  };
  const body = {
    input,
    context,
    history,
  };
  return fetch(`https://api.nlpcloud.io/v1/gpu/${model}/chatbot`, {
    method: "POST",
    headers,
    body: JSON.stringify(body),
  });
}

let history: HistoryMessage[] = [];

export default {
  data: new SlashCommandBuilder()
    .setName("chat")
    .setDescription("This command alows you to chat with the bot's AI."),
  async execute(interaction: Message) {
    try {
      interaction.channel.sendTyping();

      const res = await requestChatbot(interaction.content, context, history);

      if (!res.ok)
        throw "you've exceeded the maximum amount of requests per hour";

      const resBody = await res.json();

      history = resBody.history;

      interaction.reply(resBody.response);
    } catch (err) {
      interaction.channel.send(
        `an error occurred while processing "${interaction.content}"`
      );
      interaction.channel.send("```\n" + err + "\n" + "```");
      console.log(err);
    }
  },
};
