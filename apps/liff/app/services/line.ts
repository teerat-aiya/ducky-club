import api from "./api";

export const setLineWebhook = (data: {
  bot_id: string;
  channel_id: string;
  endpoint;
}) =>
  api.post("/channels/line/webhook-endpoint", {
    channel_id: data.channel_id,
    endpoint: data.endpoint,
  });
