import { People } from './feed';

export const unifyData = function ({
  imie,
  nazwisko,
  o_mnie,
  ulubiona_postac_z_kapitana_bomby,
  ulubiony_film,
  ulubiony_kolor,
  ulubiony_serial,
  wiek,
}: People) {
  return `${imie} ${nazwisko} (wiek: ${wiek})
${o_mnie}
Postać z kapitana Bomby: ${ulubiona_postac_z_kapitana_bomby}
Ulubiony film: ${ulubiony_film}
Ulubiony kolor: ${ulubiony_kolor}
Ulubiony serial: ${ulubiony_serial}`;
};
