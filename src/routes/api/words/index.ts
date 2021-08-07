import prisma from "$lib/prisma";
import authorize from "../_middlewares/authorize";

type WordDraft = { swissGerman: string; german: string; spellings: string[] };

export async function post({ body, locals }) {
  const user = authorize(locals);
  const wordDraft: WordDraft = JSON.parse(body);

  const word = await prisma.word.create({
    data: { ...wordDraft, createdBy: { connect: { id: user.id } } },
  });

  return {
    body: word,
  };
}
