import sql from "better-sqlite3";
import slugify from "slugify";
import xss from "xss";
import fs from "node:fs";
import { error } from "node:console";

const db = sql("meals.db");

export async function getMeals() {
  await new Promise((resolve) => setTimeout(resolve, 2000));

  // throw new Error("Loading meals failed");
  return db.prepare("select * from meals").all();
}

export async function getMeal(slug) {
  return db.prepare("select * from meals where slug = ?").get(slug);
}

export async function saveMeal(meal) {
  meal.slug = slugify(meal.title, { lower: true });
  meal.instructions = xss(meal.instructions); // * sanitize

  const extension = meal.image.name.split(".").pop();
  const filename = `${meal.slug}${Math.random()}.${extension}`;

  const stream = fs.createWriteStream(`public/images/${filename}`);
  const bufferedImage = await meal.image.arrayBuffer();
  stream.write(Buffer.from(bufferedImage), (error) => {
    if (!!error) {
      throw new Error("Save image failed.");
    }
  });

  meal.image = `/images/${filename}`;

  db.prepare(
    `
    insert into meals
      (title, summary, instructions, creator, creator_email, image, slug)
    values 
      (@title, @summary, @instructions, @creator, @creator_email, @image, @slug)
  `
  ).run(meal);
}
