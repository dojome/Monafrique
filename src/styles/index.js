export const useStyles = makeStyles((theme) => ({
    root: {
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
    },
    wrapper: {
      margin: theme.spacing(1),
      position: 'relative',
    },
    paper: {
      padding: theme.spacing(2),
      textAlign: 'center',
      color: theme.palette.text.secondary,
    },
    form: {
      display: 'flex',
      flexDirection: 'column',
      maxWidth: 400,
    },
    mb2: {
      marginBottom: 30,
    },
    mb1: {
      marginBottom: 15,
    },
    formControl: {
      margin: theme.spacing(1),
      minWidth: 120,
      maxWidth: 300,
    },
    chips: {
      display: 'flex',
      flexWrap: 'wrap',
    },
    chip: {
      margin: 2,
    },
    noLabel: {
      marginTop: theme.spacing(3),
    },
    footer: {
      display: 'flex',
      justifyContent: 'space-between',
    },
    buttonProgress: {
      color: 'green',
      position: 'absolute',
      top: '50%',
      left: '50%',
      marginTop: -12,
      marginLeft: -12,
    },
    colorsContainer: {
      textAlign: 'left',
      marginTop: 10,
    },
    heading: {
      fontSize: theme.typography.pxToRem(15),
      fontWeight: theme.typography.fontWeightRegular,
    },
    accordion_details: {
      flexDirection: 'column',
    },
    headerTitle: {
      color: '#b6923f',
      fontFamily: "'Rion', serif",
      textTransform: 'uppercase'
    },
    button: {
      margin: theme.spacing(3, 0, 2),
      backgroundColor: `#B6923F`,
      color: '#ffffff !important',
      fontFamily: "'EBGaramond', serif",
      fontSize: '16px !important',
      textTransform: 'uppercase',
      padding: '20px 15px',
      letterSpacing: '0.7',
      width: '100%',
      fontWeight: 300,
      '&:hover': {
        background: '#B6923F',
      },
    },
    smallButton: {
      margin: theme.spacing(3, 0, 2),
      backgroundColor: `#B6923F`,
      color: '#ffffff !important',
      fontFamily: "'EBGaramond', serif",
      fontSize: '16px !important',
      textTransform: 'uppercase',
      padding: '10px 5px',
      letterSpacing: '0.7',
      fontWeight: 300,
      '&:hover': {
        background: '#B6923F',
      },
    }
  }))