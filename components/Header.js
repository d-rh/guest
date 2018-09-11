import Link from 'next/link';

import Toolbar from '@material-ui/core/Toolbar';
import Grid from '@material-ui/core/Grid';
import { styleToolbar } from './SharedStyles';

const Header = () => (
  <div>
    <Toolbar style={styleToolbar}>
      <Grid item xs={12} style={{ textAlign: 'right' }}>
        <Link prefetch href="/login">
          <a>Log In</a>
        </Link>
      </Grid>
    </Toolbar>
  </div>
);

export default Header;
