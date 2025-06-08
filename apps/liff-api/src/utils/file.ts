import { encryptSHA256 } from "@repo/shared/utils/crypto";

export const generateSignedUrl = async (
  fileId: string,
  directusUrl: string,
  secret: string,
  durationInSeconds = 86400 // 1 day
) => {
  const expires = Math.floor(Date.now() / 1000) + durationInSeconds;
  const data = `file=${fileId}&expires=${expires}`;
  const signature = await encryptSHA256(data, secret);
  console.log(`${directusUrl}/signed-file?file=${fileId}&expires=${expires}&signature=${signature}`);
  

  return `${directusUrl}/signed-file?file=${fileId}&expires=${expires}&signature=${signature}`;
};
