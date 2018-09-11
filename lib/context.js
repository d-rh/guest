import { SheetsRegistry } from 'react-jss';
import { createMuiTheme, createGenerateClassName } from '@material-ui/core/styles';
import deepOrange from '@material-ui/core/colors/deepOrange';

const theme = createMuiTheme({
  palette: {
    primary: {
      light: '#7f97a2',
      main: '#607D8B',
      dark: '#435761',
    },
    secondary: {
      light: '#b22a00',
      main: '#ff3d00',
      dark: '#ff6333',
    },
  },
});

function createPageContext() {
  return {
    theme,
    sheetsManager: new Map(),
    sheetsRegistry: new SheetsRegistry(),
    generateClassName: createGenerateClassName(),
  };
}

export default function getContext() {
  if (!process.browser) {
    return createPageContext();
  }

  if (!global.INIT_MATERIAL_UI) {
    global.INIT_MATERIAL_UI = createPageContext();
  }

  return global.INIT_MATERIAL_UI;
}
