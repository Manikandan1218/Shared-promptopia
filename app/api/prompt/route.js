import Prompt from "@models/Prompt";
import { connectToDB } from "@utils/database";

const getPromtList = async () => {
  try {
    await connectToDB();

    const promptList = await Prompt.find({}).populate("creator");
    return new Response(JSON.stringify(promptList), { status: 200 });
  } catch (error) {
    return new Response("Failed to fetch promp List", { status: 500 });
  }
};

export { getPromtList as GET };
