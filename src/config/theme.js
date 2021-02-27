import { createMuiTheme } from '@material-ui/core/styles';

const theme = createMuiTheme({
  overrides: {
    MUIDataTableSearch: {
      searchText: {
        display: 'flex',
        justifyContent: 'center',
      },
    },
    MUIDataTableHeadCell: {
      sortAction: {
        alignItems: 'center',
      },
    },
  },
  palette: {
    primary: {
      main: '#000',
      dark: '#000', // hover
      contrastText: '#fff',
    },
  },
});

export default theme;
