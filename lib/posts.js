import fs from 'fs';
import matter from 'gray-matter';
import path from 'path';
import remark from 'remark';
import html from 'remark-html';

const postsPath = path.join(process.cwd(), 'posts');
const fileNames = fs.readdirSync(postsPath);

export function getPostsContext() {
  const postContexts = fileNames.map((file) => ({
    params: {
      post: file.replace(/\.md/, ''),
    },
  }));

  return postContexts;
}

export async function getPostByName(name) {
  const fileLocation = path.join(postsPath, `${name}.md`);
  const file = fs.readFileSync(fileLocation, 'utf-8');

  const matterData = matter(file);

  const processedContent = await remark().use(html).process(matterData.content);
  const htmlContent = processedContent.toString();

  return {
    post: name,
    content: htmlContent,
    ...matterData.data,
  };
}

export function getSortedPosts() {
  const allPostsData = fileNames.map((fileName) => {
    const id = fileName.replace(/\.md/, '');

    const fullPath = path.join(postsPath, fileName);
    const file = fs.readFileSync(fullPath, 'utf-8');

    const matterData = matter(file).data;

    return {
      id,
      ...matterData,
    };
  }).sort((a, b) => {
    if (a.date < b.date) {
      return 1;
    }
    return -1;
  });

  return allPostsData;
}
