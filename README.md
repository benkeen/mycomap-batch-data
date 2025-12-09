## Mycomap Batch Validator

This is a helper script to validate a spreadsheet containing 2 columns of data: the BC Mycomap voucher number. This is specifically for the BC Mycomap project, which has the `BCXX-` prefix.

It processes the excel/csv input to validate the following:

- the voucher number is valid (whitespace is ignore)
- there is an observation on iNat with the .

It will then output a table of all entries, to show which are valid and which are not, along with a link to the iNat observation.

### Excel example format

```
Voucher Number      iNat Observation ID
BC25-12345          327915920
BC25-12346          327915921
BC25-12347          327915924
BC25-12348          327915925
BC25-12349          327915940
...
```

Note: the column titles don't matter, and aren't required. If the first row starts with `BCXX-` it will assume there's no title row.
