// import * as React from 'react';
// import Typography, { TypographyProps } from '@mui/material/Typography';
// import Skeleton from '@mui/material/Skeleton';
// import Grid from '@mui/material/Grid';

// const variants = [
//   'h1',
//   'h3',
//   'body1',
//   'caption',
// ] as readonly TypographyProps['variant'][];

// function TypographyDemo(props: { loading?: boolean }) {
//   const { loading = false } = props;

//   return (
//     <div>
//       {variants.map((variant) => (
//         <Typography component="div" key={variant} variant={variant}>
//           {loading ? <Skeleton /> : ''}
//         </Typography>
//       ))}
//     </div>
//   );
// }

// export function SpinnerLoad() {
//   return (
//     <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
//     <Grid container spacing={}>
//       <Grid item xs>
//         <TypographyDemo loading />
//       </Grid>
//       <Grid item xs>
//         <TypographyDemo />
//       </Grid>
//     </Grid>
//     </div>
//   );
// }


import Box from '@mui/material/Box';
import Skeleton from '@mui/material/Skeleton';

export function SpinnerLoad() {
  return (
    <div style={{ position: 'absolute', top: 0, bottom: 0, left: 0, right: 0, display: 'flex', justifyContent: 'center', alignItems: 'center' }}>

    <Box sx={{ width: 1000 }}>
      <Skeleton />
      <Skeleton />
      <Skeleton />
      <Skeleton animation="wave" />
      <Skeleton animation={false} />
    </Box>
    </div>
  );
}