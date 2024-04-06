import { v4 as uuidv4 } from 'uuid';
import { QdrantClient } from '@qdrant/js-client-rest';
import { OpenAIEmbeddings } from '@langchain/openai';
import { Document } from 'langchain/document';
import { People } from './feed';
import 'dotenv/config';
import { unifyData } from './utils';

// https://github.com/qdrant/qdrant-js
// docker pull qdrant/qdrant
// docker run -p 6333:6333 -v $(pwd)/qdrant_storage:/qdrant/storage qdrant/qdrant

// TO connect to Qdrant running locally

const qdrant = function (collectionName: string) {
  const q = new QdrantClient({ url: process.env.QDRANT_DB_URL });
  const embeddings = new OpenAIEmbeddings({ maxConcurrency: 5 });

  return {
    getCollection() {
      return q.getCollection(collectionName);
    },

    async createCollection() {
      await q.createCollection(collectionName, {
        vectors: { size: 1536, distance: 'Cosine', on_disk: true },
      });
    },
    async insert(data: People[]) {
      const documents = data.map((people) => {
        const doc = new Document({
          pageContent: unifyData(people),
          metadata: {
            id: uuidv4(),
            source: collectionName,
            data: JSON.stringify(people),
          },
        });
        return doc;
      });

      const points = [];

      for (const document of documents) {
        const [embedding] = await embeddings.embedDocuments([
          document.pageContent,
        ]);
        points.push({
          id: document.metadata.id,
          payload: document.metadata,
          vector: embedding,
        });
      }

      await q.upsert(collectionName, {
        wait: true,
        batch: {
          ids: points.map((point) => point.id),
          vectors: points.map((point) => point.vector),
          payloads: points.map((point) => point.payload),
        },
      });
    },
    async search(term: string) {
      return await q.search(collectionName, {
        vector: await embeddings.embedQuery(term),
        limit: 1,
        filter: {
          must: [
            {
              key: 'source',
              match: {
                value: collectionName,
              },
            },
          ],
        },
      });
    },
  };
};

export default qdrant;
