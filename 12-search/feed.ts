import qdrant from './qdrant';

const url = 'https://unknow.news/archiwum_aidevs.json';

export interface UnknowNews {
  title: string;
  url: string;
  info: string;
  date: string;
}

const feedQrdantWithData = async function () {
  const news = await fetch(url).then<UnknowNews[]>((r) => r.json());

  const q = qdrant('test');
  await q.createCollection();
  await q.insert(news);
};

feedQrdantWithData();
