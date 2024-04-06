import qdrant from './qdrant';

const url = 'https://tasks.aidevs.pl/data/people.json';

export interface People {
  imie: string;
  nazwisko: string;
  wiek: number;
  o_mnie: string;
  ulubiona_postac_z_kapitana_bomby: string;
  ulubiony_serial: string;
  ulubiony_film: string;
  ulubiony_kolor: string;
}

const feedQrdantWithData = async function () {
  const people = await fetch(url).then<People[]>((r) => r.json());

  const q = qdrant('people');
  await q.createCollection();
  await q.insert(people);
};

feedQrdantWithData();
