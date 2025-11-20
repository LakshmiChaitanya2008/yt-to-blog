import { fetchTranscript } from "youtube-transcript-plus";

const cleanStr = function (tArr) {
  return tArr.map((t, i) => t.text).join(" ");
};

export const getTranscript = async function (url) {
  const res = await fetchTranscript(url, { lang: "en" });

  return cleanStr(res);
};
