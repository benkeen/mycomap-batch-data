import qs from 'query-string';
import * as constants from '../constants';

// https://api.inaturalist.org/v1/observations?order_by=id&order=asc&page=1&project_id=250590&per_page=200&user_id=benkeen&d1=2025-12-01&d2=2025-12-05

/*
id: string;
observed_on: string;
ofvs: [
 { "name": "Voucher Number(s)", "value": "BC25-12345"}
]
*/

export const getDataPacket = async (
  userId: string,
  fromDate: string,
  toDate: string
) => {
  const apiParams = {
    user_id: userId,
    d1: fromDate,
    d2: toDate,
    project_id: constants.INAT_PROJECT_ID,
    per_page: constants.INAT_REQUEST_RESULTS_PER_PAGE,
    order: 'asc',
    order_by: 'id',
    page: 1,
  };

  const paramsStr = qs.stringify(apiParams);
  const apiUrl = `${constants.BASE_INAT_URL}?${paramsStr}`;

  const response = await fetch(apiUrl);
  const rawData = await response.json();

  const trimmedData = rawData.results.map((obs: any) => {
    return {
      id: obs.id,
      observedOn: obs.observed_on,
      user: userId,
      voucherNumber: obs.ofvs
        .filter((ofv: any) => ofv.name === 'Voucher Number(s)')
        .map((ofv: any) => ofv.value)[0],
    };
  });

  return trimmedData;
};
