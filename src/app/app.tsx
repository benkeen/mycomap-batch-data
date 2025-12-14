import React, { useEffect } from 'react';
import { UserFields } from '../fields/UserFields';
import { getObservations } from '../utils/requests';
import { DataTable } from '../dataTable/DataTable';
import { findInvalidVoucherEntries } from '../utils/data';
import type { InvalidData } from '../utils/data';
import { InvalidEntries } from '../dataTable/InvalidEntries';
import { CircularProgress } from '@mui/material';
import qs from 'query-string';

export const App = () => {
  const [data, setData] = React.useState([]);
  const [loading, setLoading] = React.useState<boolean>(false);
  const [voucherNumFormatCheck, setVoucherNumFormatCheck] =
    React.useState<boolean>(true);
  const [invalidData, setInvalidData] = React.useState<InvalidData>({
    invalidVouchers: [],
    obsWithDuplicateVoucherNums: [],
    hasErrors: false,
  });
  const [hasMadeSearch, setHasMadeSearch] = React.useState<boolean>(false);
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
      setLoading(true);
      const { username, fromDate, toDate } = searchData;
      const observationData = await getObservations(
        username,
        fromDate!,
        toDate!
      );
      setInvalidData(
        findInvalidVoucherEntries(observationData, voucherNumFormatCheck)
      );
      setData(observationData);
      setLoading(false);
      setHasMadeSearch(true);
    })();
  }, [searchData]);

  // the `?voucherNumFormatCheck=false` can be used for people with custom voucher number formats to skip the format check.
  // it'll still catch duplicates, though.
  useEffect(() => {
    const parsed = qs.parse(location.search);
    const checkFormat = parsed.voucherCheck !== 'false';
    setVoucherNumFormatCheck(checkFormat);
  }, []);

  const handleRequestData = ({ username, fromDate, toDate }: any) => {
    setSearchData({ username, fromDate, toDate });
  };

  const getInvalidDataTable = () => {
    if (
      invalidData.invalidVouchers.length === 0 &&
      invalidData.obsWithDuplicateVoucherNums.length === 0
    ) {
      return null;
    }
    return (
      <InvalidEntries
        invalidVouchers={invalidData.invalidVouchers}
        obsWithDuplicateVoucherNums={invalidData.obsWithDuplicateVoucherNums}
      />
    );
  };

  const getPageContent = () => {
    if (loading) {
      return (
        <p
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '10px',
            color: '#0066cc',
            marginTop: 30,
          }}
        >
          <CircularProgress size={28} /> <span>Loading data...</span>
        </p>
      );
    }

    if (!hasMadeSearch) {
      return null;
    }

    if (data.length === 0) {
      return <p>No observations found.</p>;
    }

    return (
      <div style={{ marginTop: 30 }}>
        {getInvalidDataTable()}
        <DataTable data={data} hasErrors={invalidData.hasErrors} />
      </div>
    );
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

      <UserFields onSubmit={handleRequestData} disabled={loading} />

      {getPageContent()}
    </div>
  );
};
