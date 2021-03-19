import * as functions from 'firebase-functions';
import * as express from 'express';
import * as useragent from 'express-useragent';
import { readFileSync } from 'fs';
import { resolve } from 'path';
import * as admin from 'firebase-admin';
const db = admin.firestore();

// コピーされたindex.htmlの中身を取得
const file = readFileSync(resolve(__dirname, 'index.html'), {
  encoding: 'utf-8',
});

// 置換ヘルパー
const replacer = (data: string) => {
  return (match: string, content: string): string => {
    return match.replace(content, data);
  };
};

// 置換関数
const buildHtml = (course: { [key: string]: string }) => {
  return (
    file
      // descriptionを記事本文の先頭200文字に置換
      .replace(
        /<meta name="description" content="(.+)" \/>/gm,
        replacer(course.body?.substr(0, 200))
      )
      .replace(
        /<meta property="og:description" content="(.+)" \/>/gm,
        replacer(course.body?.substr(0, 200))
      )
      // OGP画像を記事のサムネイルURLに置換
      .replace(/content="(.+ogp-cover.png)"/gm, replacer(course.thumbnailURL))

      // タイトルを記事タイトルに置換
      .replace(/<title>(.+)<\/title>"/gm, replacer(course.title))
      // OGタイトルを記事タイトルに置換
      .replace(
        /<meta property="og:title" content="(.+)" \/>/gm,
        replacer(course.title)
      )
      // OG:URLを記事URLに置換
      .replace(
        /<meta property="og:url" content="(.+)" \/>/gm,
        replacer('https://course-maker-fb177.web.app/' + course.courseId)
      )
  );
};

// expressアプリ初期化
const app = express();

// ユーザーエージェント判定ヘルパーを導入
app.use(useragent.express());

app.get('*', async (req: any, res: any) => {
  // ロボットであれば置換結果を返却

  if (req.useragent.isBot) {
    // https://xxx/articles?id=bbb のようなURLを元に記事データをDBから取得
    const course = (
      await db.doc(`courses/${req.query.courseId}`).get()
    )?.data();

    if (course) {
      // 結果を返却
      res.send(buildHtml(course));

      return;
    }
  }

  // ロボットでなければ置換せずindex.htmlを返却
  res.send(file);
});

export const render = functions.https.onRequest(app);
