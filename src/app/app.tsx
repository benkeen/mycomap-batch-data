import React, { useEffect } from 'react';
import { UserFields } from '../fields/UserFields';
import { getObservations } from '../utils/requests';
import { DataTable } from '../dataTable/DataTable';

export const App = () => {
  const [data, setData] = React.useState([]);
  const [loading, setLoading] = React.useState<boolean>(false);
  const [searchData, setSearchData] = React.useState({
    username: '',
    fromDate: null,
    toDate: null,
  });

  useEffect(() => {
    if (!searchData.username) {
      return;
    }

    (async () => {
      const { username, fromDate, toDate } = searchData;
      const packetData = await getObservations(username, fromDate!, toDate!);

      console.log('settings data: ', packetData);

      setData(packetData);
    })();
  }, [searchData]);

  const handleRequestData = ({ username, fromDate, toDate }: any) => {
    console.log('Requesting data for:', { username, fromDate, toDate });
    setSearchData({ username, fromDate, toDate });
  };

  return (
    <div>
      <h1>Mycomap Batch Data</h1>

      <p>
        This script generates a downloadable CSV file of your iNat BC MycoMap
        observations. This will locate all your fungi and slime mould
        observations <i>already tagged with the BC MycoMap project</i> on
        iNaturalist.
      </p>

      <UserFields onSubmit={handleRequestData} />

      <div style={{ marginTop: 30 }}>
        {data.length > 0 && <DataTable data={data} />}
      </div>
    </div>
  );
};
