import PropTypes from 'prop-types';
// material
import { Paper, Typography } from '@mui/material';

// ----------------------------------------------------------------------

SearchNotFound.propTypes = {
  searchQuery: PropTypes.string,
};

export default function SearchNotFound({ searchQuery = '', ...other }) {
  return (
    <Paper {...other}>
      <Typography gutterBottom align="center" variant="subtitle1">
        조회된 결과가 없습니다.
      </Typography>
      <Typography variant="body2" align="center">
        검색어 &nbsp;
        <strong>&quot;{searchQuery}&quot;</strong> 조건에 맞는 결과가 없습니다.
      </Typography>
    </Paper>
  );
}
