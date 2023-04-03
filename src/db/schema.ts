import { InferModel } from "drizzle-orm";
import { int, serial, text, timestamp } from "drizzle-orm/mysql-core/columns";
import { mysqlTable } from "drizzle-orm/mysql-core/table";

export const users = mysqlTable("users", {
  id: serial("id").primaryKey(),
  username: text("username"),
  avatarImage: text("avatar_image"),
});

export const comments = mysqlTable("comments", {
  id: serial("id").primaryKey(),
  authorId: int("authorId").references(() => users.id),
  date: timestamp("date").defaultNow(),
  content: text("content"),
});

export type Comments = InferModel<typeof comments>;
