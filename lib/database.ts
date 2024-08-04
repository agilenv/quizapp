import { openDB } from "idb";

const DB_NAME = "quiz-app";
const DB_VERSION = 1;

export const initDB = async () => {
  const db = await openDB(DB_NAME, DB_VERSION, {
    upgrade(db) {
      db.createObjectStore("quizzes", { keyPath: "id" });
    },
  });
  return db;
};
