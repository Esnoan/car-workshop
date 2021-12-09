import express, { Request, Response } from 'express';
import fs from 'fs';

const router = express.Router();

const pathRouter = `${__dirname}`;

const removeExtension = (fileName: string): string => {
  const newName = fileName.split('.').shift();
  return newName ?? '';
};

fs.readdirSync(pathRouter).filter((file: string) => {
  const fileWithOutExt = removeExtension(file);
  const skip = ['index'].includes(fileWithOutExt);
  if (!skip) {
    router.use(`/${fileWithOutExt}`, require(`./${fileWithOutExt}`).router);
  }
});

router.get('*', (req: Request, res: Response) => {
  res.status(404);
  res.send({
    error: `Oops! we can't seem to find the route you're looking for.`,
  });
});

export { router };
