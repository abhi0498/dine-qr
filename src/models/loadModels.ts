import fs from "fs";

export default async function loadModels() {
  console.log(__dirname);
  //list files

  const modelPaths = fs.readdirSync("./src/models").filter((file: string) => {
    return file.endsWith(".ts") && file !== "loadModels.ts";
  });

  const models = await Promise.all(
    modelPaths.map(async (model: string) => {
      const modelName = model.replace(".ts", "");
      return { modelName, model: await import(`./${modelName}`) };
    })
  );

  return models.reduce((acc: any, { modelName, model }: any) => {
    acc[modelName] = model.default;
    return acc;
  }, {});
}
