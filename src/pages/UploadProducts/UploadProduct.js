import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useForm } from '../../hooks/useForm'
import {
  FormControl,
  InputLabel,
  Input,
  FormHelperText,
  Box,
  TextField,
  Chip,
  Select,
  MenuItem,
  FormLabel,
  RadioGroup,
  Radio,
  FormControlLabel,
  Button,
  CircularProgress,
  Snackbar,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Typography,
} from '@material-ui/core'

import ExpandMoreIcon from '@material-ui/icons/ExpandMore'
import CreatableSelect from 'react-select/creatable'
import { makeStyles, useTheme } from '@material-ui/core/styles'
import { DropzoneArea } from 'material-ui-dropzone'
import { postProduct } from '../../actions/products'
import Alert from '../../components/Alert'
import { uploadImage } from '../../services/products.service'

const local_currencies = ['usd', 'euro', 'naira', 'gbp']

const useStyles = makeStyles((theme) => ({
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

const ITEM_HEIGHT = 48
const ITEM_PADDING_TOP = 8
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
}
function getStyles(name, personName, theme) {
  return {
    fontWeight:
      personName.indexOf(name) === -1
        ? theme.typography.fontWeightRegular
        : theme.typography.fontWeightMedium,
  }
}
function UploadProduct() {
  const dispatch = useDispatch()
  const classes = useStyles()
  const theme = useTheme()
  const products = useSelector((state) => state.products.products)
  const categories = useSelector((state) => state.products.categories)
  const [volumetric_weight, setVolumeticWeight] = useState('')
  const [colors, setColors] = useState([])
  const [upSells, setUpSells] = useState([])
  const [crossSells, setCrossSells] = useState([])
  const [mainProductImage, setMainProductImage] = React.useState([])
  const [imageWithDescription, setImagewithDescription] = React.useState([])
  const [fullScreenImage, setFullScreenImage] = React.useState([])
  const [knowBeforeImage, setKnowBeforeImage] = React.useState([])
  const [productGalleries, setProductGalleries] = React.useState([])
  const [isUploading, setIsUploading] = React.useState(false)
  const [alertOpen, setAlertOpen] = useState(false)
  const [message, setMessage] = useState({ content: '', type: '' })
  const [sellsOption, setSellsOption] = useState([])
  const [informations, setInformations] = useState([])

  const [product, handleChange] = useForm({
    brand_name: '',
    brand_ethos: '',
    product_name: '',
    product_description: '',
    imageWithDescriptionTitle: '',
    imageWithDescription: '',
    know_before_you_buy: '',
    know_before_you_buy_title: '',
    sku: '',
    quantity: '',
    selectedCategoriesId: [],
    dimensionsLength: '0',
    dimensionsWidth: '0',
    dimensionsHeight: '0',
    selectedCurrencies: [],
    retail_price: '',
    sale_price: '',
    wholesale_quantity: '',
    wholesale_price: '',
    ppp: '',
    standard_usd: '',
    standard_euro: '',
    weight: '',
    photo_drive_link: '',
  })

  useEffect(() => {
    let sellsOptions = products.map((product) => ({
      value: product.id,
      label: product.name,
    }))
    setSellsOption(sellsOptions)
  }, [products])

  //set Volumetric Weight
  useEffect(() => {
    let volumetricWeight =
      (parseFloat(product.dimensionsHeight) *
        parseFloat(product.dimensionsLength) *
        parseFloat(product.dimensionsWidth)) /
      5000
    console.log(volumetricWeight)
    setVolumeticWeight(volumetricWeight.toString() + 'Kg')
  }, [
    product.dimensionsHeight,
    product.dimensionsLength,
    product.dimensionsWidth,
  ])

  const handleColorChange = (newValue, actionMeta) => {
    console.log(newValue)
    setColors([...colors, newValue.value])
  }

  const handleUpSellsChange = (newValue, actionMeta) => {
    if (upSells.length <= 3) setUpSells([...upSells, newValue.value])
  }

  const handleCrossSellsChange = (newValue, actionMeta) => {
    if (crossSells.length <= 3) setCrossSells([...crossSells, newValue.value])
  }

  const handleDeleteColor = (val) => {
    setColors(colors.filter((color) => color !== val))
  }

  const handleDeleteUpsells = (val) => {
    setUpSells(upSells.filter((upSell) => upSell !== val))
  }

  const handleDeleteCrossSells = (val) => {
    setCrossSells(crossSells.filter((crossSell) => crossSell !== val))
  }

  const removeInformation = (i) => {
    console.log(i)
    let know_informations = [...informations]
    know_informations.splice(i, 1)
    setInformations(know_informations)
  }

  const handleInformation = (i, e) => {
    let know_informations = [...informations]
    know_informations[i] = {
      ...know_informations[i],
      [e.target.name]: e.target.value,
    }
    setInformations(know_informations)
  }

  const addNewInformation = () => {
    setInformations((prevState) => [...prevState, { title: '', text: '' }])
  }

  const alertClose = (event, reason) => {
    if (reason === 'clickaway') {
      return
    }
    setAlertOpen(false)
  }

  const uploadProduct = async (e) => {
    e.preventDefault()
    setIsUploading(true)

    try {
      let galleryImages = []
      let mainProductImageLink = await uploadImage(
        mainProductImage[0],
        product.product_name.replaceAll(' ', '_') + '_main_product_image',
        800,
        864,
      )

      let knowBeforeImageLink = await uploadImage(
        knowBeforeImage[0],
        product.product_name.replaceAll(' ', '_') + '_know_before_image',
        974,
        1250,
      )

      let fullscreenImageLink = await uploadImage(
        fullScreenImage[0],
        product.product_name.replaceAll(' ', '_') + '_full_screen_image',
        1062,
        650,
      )

      let imageWithDescriptionLink = await uploadImage(
        imageWithDescription[0],
        product.product_name.replaceAll(' ', '_') + '_image_with_description',
        974,
        1250,
      )

      for (let id in productGalleries) {
        const gallery = productGalleries[id]
        const response = await uploadImage(
          gallery,
          product.product_name.replaceAll(' ', '_') + '_product_gallery',
          800,
          864,
        )
        galleryImages.push({ src: response.source_url })
      }

      let productImages = []

      productImages.push({ src: mainProductImageLink.source_url })
      productImages = productImages.concat(galleryImages)
      let extra_meta_data = []

      for (let index in informations) {
        extra_meta_data.push({
          key: `sections_2_information_${index}_title`,
          value: informations[index].title,
        })
        extra_meta_data.push({
          key: `_sections_2_information_${index}_title`,
          value: 'field_5bc7579702575',
        })
        extra_meta_data.push({
          key: `sections_2_information_${index}_text`,
          value: informations[index].text,
        })
        extra_meta_data.push({
          key: `_sections_2_information_${index}_text`,
          value: 'field_5bc757bf02576',
        })
      }
      extra_meta_data.push({
        key: 'sections_2_information',
        value: informations.length,
      })
      extra_meta_data.push({
        key: '_sections_2_information',
        value: 'field_5bc7571202574',
      })

      dispatch(
        postProduct({
          name: product.product_name,
          description: product.product_description,
          short_description: product.brand_ethos,
          images: productImages,
          sku: product.sku,
          regular_price: product.retail_price,
          sale_price: product.sale_price,
          stock_quantity: parseInt(product.quantity),
          weight: product.weight,
          categories: product.selectedCategoriesId.map((id) => ({
            id: id,
          })),
          attributes: [{ name: 'Color', options: colors }],
          dimensions: {
            height: product.dimensionsHeight,
            length: product.dimensionsLength,
            width: product.dimensionsWidth,
          },
          cross_sell_ids: crossSells,
          upsell_ids: upSells,
          meta_data: [
            { key: '_usd_price', value: product.standard_usd },
            { key: '_volumetric_weight', value: volumetric_weight },
            { key: '_europe_price', value: product.standard_euro },
            {
              key: 'sections',
              value: [
                'heading_with_description_and_image',
                'full_screen_image',
                'know_before_you_buy',
              ],
            },
            { key: '_sections', value: 'field_5bc72c4577560' },
            { key: '_sections_0_image', value: 'field_5bc98bc50c627' },
            {
              key: 'sections_0_image',
              value: parseInt(imageWithDescriptionLink.id),
            },
            {
              key: 'sections_0_title',
              value: product.imageWithDescriptionTitle,
            },
            { key: '_sections_0_title', value: 'field_5bc98bc50c628' },
            {
              key: 'sections_0_description',
              value: product.imageWithDescription,
            },
            { key: '_sections_1_image', value: 'field_5bc72c8477561' },
            {
              key: 'sections_1_image',
              value: parseInt(fullscreenImageLink.id),
            },
            { key: '_sections_2_image', value: 'field_5bc7569302572' },
            {
              key: 'sections_2_image',
              value: parseInt(knowBeforeImageLink.id),
            },
            {
              key: 'sections_2_title',
              value: product.know_before_you_buy_title,
            },
            { key: '_sections_2_title', value: 'field_5bc7570802573' },
          ].concat(extra_meta_data || []),
        }),
      )
        .then((data) => {
          setMessage({ content: 'Product upload success', type: 'success' })
          setAlertOpen(true)
          setIsUploading(false)
        })
        .catch((err) => {
          console.log('err', err)
          setMessage({ content: err.message, type: 'error' })
          setAlertOpen(true)
          setIsUploading(false)
        })
    } catch (err) {
      setMessage({ content: err.message, type: 'error' })
      setAlertOpen(true)
      setIsUploading(false)
    }
  }

  return (
    <div className={classes.root}>
      <Snackbar open={alertOpen} autoHideDuration={6000} onClose={alertClose}>
        <Alert onClose={alertClose} severity={message.type}>
          {message.content}
        </Alert>
      </Snackbar>
      <h1 className={classes.headerTitle}>Upload product</h1>
      <form className={classes.form} onSubmit={uploadProduct}>
        <FormControl className={classes.mb2}>
          <InputLabel htmlFor="my-input">Brand Name *</InputLabel>
          <Input
            id="my-input"
            name="brand_name"
            value={product.brand_name}
            onChange={handleChange}
            required
            aria-describedby="my-helper-text"
          />

        </FormControl>
        <FormControl className={classes.mb2}>
          <InputLabel htmlFor="my-input">Product Name*</InputLabel>
          <Input
            id="my-input"
            name="product_name"
            value={product.product_name}
            onChange={handleChange}
            required
            aria-describedby="my-helper-text"
          />
          <FormHelperText id="my-helper-text">
            Think of a great name for your product. What would you type in to find this product on google. Keep your product name to 5 words
          </FormHelperText>
        </FormControl>
        <FormControl className={classes.mb2}>
          <TextField
            id="outlined-multiline-static"
            label="Collection Ethos"
            multiline
            name="brand_ethos"
            value={product.brand_ethos}
            onChange={handleChange}
            rows={4}
            variant="outlined"
          />
          <FormHelperText id="my-helper-text">
            Use this field to tell us about your brand story, or the ethos
            behind the collection that this product belongs to. You only need to
            tell us your brand story once. Your collection ethos can change if
            you have multiple collections
          </FormHelperText>
        </FormControl>

        <Box className={classes.mb2}>
          <DropzoneArea
            filesLimit={1}
            acceptedFiles={['image/*']}
            dropzoneText={'Main product image *'}
            onChange={(files) => setMainProductImage(files)}
          />
          <FormHelperText id="my-helper-text">
            This is your main product image, and should be about 800px by
            height: 864px (almost square size).
          </FormHelperText>
        </Box>
        <Box className={classes.mb2}>
          <DropzoneArea
            filesLimit={3}
            acceptedFiles={['image/*']}
            dropzoneText={'Product gallery images'}
            onChange={(files) => setProductGalleries(files)}
          />
          <FormHelperText id="my-helper-text">
            If you have extra images of this product please upload here from a different angle width 800px by height: 860px -almost square size
          </FormHelperText>
        </Box>
        <FormControl className={classes.mb2}>
          <TextField
            id="outlined-multiline-static"
            label="Product Description"
            multiline
            rows={4}
            required
            name="product_description"
            value={product.product_description}
            onChange={handleChange}
            variant="outlined"
          />
          <FormHelperText id="my-helper-text">
            Sell your product, what's great about it? Describe how it's made.
            Why should customers love it? What's unique about it. What does it
            do? What can you wear it with?
          </FormHelperText>
        </FormControl>
        <Accordion>
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel1a-content"
            id="panel1a-header"
          >
            <Typography className={classes.heading}>
              Image with Description
            </Typography>
          </AccordionSummary>
          <AccordionDetails className={classes.accordion_details}>
            <Box className={classes.mb2}>
              <DropzoneArea
                filesLimit={1}
                acceptedFiles={['image/*']}
                dropzoneText={'Image with description *'}
                onChange={(files) => setImagewithDescription(files)}
              />
              <FormHelperText id="my-helper-text">
                This product image comes with another caption for you to provide
                more details on your product , especially if it's one of a kind.
                This is especially great for artworks to provide more background
                detail (974px * 1205px)
              </FormHelperText>
            </Box>

            <FormControl className={classes.mb2}>
              <InputLabel htmlFor="my-input">Title *</InputLabel>
              <Input
                id="my-input"
                name="imageWithDescriptionTitle"
                value={product.imageWithDescriptionTitle}
                onChange={handleChange}
                required
                aria-describedby="my-helper-text"
              />
            </FormControl>
            <FormControl className={classes.mb2}>
              <TextField
                id="outlined-multiline-static"
                label="Content"
                multiline
                name="imageWithDescription"
                value={product.imageWithDescription}
                onChange={handleChange}
                rows={4}
                required
                variant="outlined"
              />
            </FormControl>
          </AccordionDetails>
        </Accordion>
        <Accordion>
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel1a-content"
            id="panel1a-header"
          >
            <Typography className={classes.heading}>
              Full Screen Image
            </Typography>
          </AccordionSummary>
          <AccordionDetails className={classes.accordion_details}>
            <Box className={classes.mb2}>
              <DropzoneArea
                filesLimit={1}
                acceptedFiles={['image/*']}
                dropzoneText={'Full Screen Image *'}
                onChange={(files) => setFullScreenImage(files)}
              />
              <FormHelperText id="my-helper-text">
                Attach a second product image (landscape size) image Width:
                1062px by Height: 650px)
              </FormHelperText>
            </Box>
          </AccordionDetails>
        </Accordion>
        <Accordion className={classes.mb2}>
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel1a-content"
            id="panel1a-header"
          >
            <Typography className={classes.heading}>
              Know Before You Buy
            </Typography>
          </AccordionSummary>
          <AccordionDetails className={classes.accordion_details}>
            <Box className={classes.mb2}>
              <DropzoneArea
                filesLimit={1}
                acceptedFiles={['image/*']}
                dropzoneText={'Know Before You Buy Image *'}
                onChange={(files) => setKnowBeforeImage(files)}
              />
              <FormHelperText id="my-helper-text">
                This section comes with descriptive subheadings headings to let
                customers know about nitty gritty details such as if the size
                runs big, if the product is for oily skin only, if the product
                is so unique it would take 14 days to make. Attach 1 more
                product image and input the important text in the next section. 
                (974px * 1205px)
              </FormHelperText>
            </Box>
            <FormControl className={classes.mb2}>
              <InputLabel htmlFor="my-input">Title *</InputLabel>
              <Input
                id="my-input"
                name="know_before_you_buy_title"
                value={product.know_before_you_buy_title}
                onChange={handleChange}
                required
                aria-describedby="my-helper-text"
              />
            </FormControl>
            <FormLabel component="legend" className={classes.mb1}>
              Information
            </FormLabel>
            <Button
              variant="contained"
              color="primary"
              className={classes.smallButton}
              onClick={addNewInformation}
            >
              Add Row
            </Button>
            {informations.map((el, i) => (
              <FormControl key={i} className={classes.mb2}>
                <Input
                  id="my-input"
                  name="title"
                  value={el.title || ''}
                  onChange={(e) => handleInformation(i, e)}
                  placeholder="Title"
                  required
                  aria-describedby="my-helper-text"
                  className={classes.mb1}
                />
                <TextField
                  id="outlined-multiline-static"
                  multiline
                  name="text"
                  value={el.text || ''}
                  onChange={(e) => handleInformation(i, e)}
                  rows={4}
                  required
                  variant="outlined"
                  className={classes.mb1}
                  placeholder="Text"
                />
                <Button
                  variant="contained"
                  color="secondary"
                  onClick={() => removeInformation(i)}
                >
                  Remove
                </Button>
              </FormControl>
            ))}

            {/* <FormControl className={classes.mb2}>
              <TextField
                id="outlined-multiline-static"
                label="Know Before you buy"
                multiline
                name="know_before_you_buy"
                value={product.know_before_you_buy}
                onChange={handleChange}
                rows={4}
                required
                variant="outlined"
              />
              <FormHelperText id="my-helper-text">
                For example is it custom orders only? Write Custom orders:
                Specify how long it would take to make and ship. Put yourself in
                the shoes of the buyer what information you have liked to know,
                or would have been helpful to know before purchasing this
                product. Adding such information would minimise the likelihood
                of returns
              </FormHelperText>
            </FormControl> */}
          </AccordionDetails>
        </Accordion>
        <FormControl className={classes.mb2}>
          <InputLabel htmlFor="my-input">SKU</InputLabel>
          <Input
            id="my-input"
            name="sku"
            value={product.sku}
            onChange={handleChange}
            aria-describedby="my-helper-text"
          />
          <FormHelperText id="my-helper-text">
            we'll generate an SKU
          </FormHelperText>
        </FormControl>
        <FormControl className={classes.mb2}>
          <InputLabel htmlFor="my-input">Availalbe Quantity in Stock *</InputLabel>
          <Input
            id="my-input"
            name="quantity"
            type="number"
            required
            value={product.quantity}
            onChange={handleChange}
            aria-describedby="my-helper-text"
          />
          <FormHelperText id="my-helper-text">
            How many of these do you have in stock for sale online?
          </FormHelperText>
        </FormControl>
        <FormControl className={classes.mb2}>
          <InputLabel htmlFor="my-input">Categories *</InputLabel>
          <Select
            labelId="demo-mutiple-chip-label"
            id="demo-mutiple-chip"
            name="selectedCategoriesId"
            multiple
            required
            value={product.selectedCategoriesId}
            onChange={handleChange}
            input={<Input id="select-multiple-chip" />}
            renderValue={(selected) => (
              <div className={classes.chips}>
                {selected.map((id) => (
                  <Chip
                    key={id}
                    label={
                      categories.find((category) => category.id === id).name
                    }
                    className={classes.chip}
                  />
                ))}
              </div>
            )}
            MenuProps={MenuProps}
          >
            {categories.map((category) => {
              if (category.parent !== 0) {
                return (
                  <MenuItem key={category.id} value={category.id}>
                    {category.name}
                  </MenuItem>
                )
              }
              return false
            })}
          </Select>
        </FormControl>
        <FormControl className={classes.mb2}>
          <FormLabel component="legend">Colors</FormLabel>

          <CreatableSelect isClearable onChange={handleColorChange} />
          <div className={classes.colorsContainer}>
            {colors.map((color) => (
              <Chip
                key={color}
                onDelete={() => handleDeleteColor(color)}
                label={color}
                className={classes.chip}
              />
            ))}
          </div>

          <FormHelperText id="my-helper-text">
            In which colours do the product come? Are there multiple colours?
          </FormHelperText>
        </FormControl>

        <FormControl className={classes.mb2}>
          <FormLabel component="legend">size / various dimensions</FormLabel>
          <Input
            id="my-input"
            name="dimensionsLength"
            type="number"
            value={product.dimensionsLength}
            onChange={handleChange}
            aria-describedby="my-helper-text"
            placeholder="Length"
          />
        </FormControl>

        <FormControl className={classes.mb2}>
          <Input
            id="my-input"
            name="dimensionsWidth"
            type="number"
            value={product.dimensionsWidth}
            onChange={handleChange}
            aria-describedby="my-helper-text"
            placeholder="Width"
          />
        </FormControl>

        <FormControl className={classes.mb2}>
          <Input
            id="my-input"
            name="dimensionsHeight"
            type="number"
            value={product.dimensionsHeight}
            onChange={handleChange}
            aria-describedby="my-helper-text"
            placeholder="Height"
          />
        </FormControl>

        <FormControl className={classes.mb2}>
          <InputLabel htmlFor="my-input">Local currency</InputLabel>
          <Select
            labelId="demo-mutiple-chip-label"
            id="demo-mutiple-chip"
            multiple
            name="selectedCurrencies"
            value={product.selectedCurrencies}
            onChange={handleChange}
            input={<Input id="select-multiple-chip" />}
            renderValue={(selected) => (
              <div className={classes.chips}>
                {selected.map((value) => (
                  <Chip key={value} label={value} className={classes.chip} />
                ))}
              </div>
            )}
            MenuProps={MenuProps}
          >
            {local_currencies.map((currency) => (
              <MenuItem
                key={currency}
                value={currency}
                style={getStyles(currency, product.selectedCategoriesId, theme)}
              >
                {currency}
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        <FormControl className={classes.mb2}>
          <InputLabel htmlFor="my-input">
            Standard Retail Price in your local currency *
          </InputLabel>

          <Input
            id="my-input"
            name="retail_price"
            type="number"
            value={product.retail_price}
            onChange={handleChange}
            aria-describedby="my-helper-text"
          />
          <FormHelperText id="my-helper-text">
            How much does this item go for?
          </FormHelperText>
        </FormControl>

        <FormControl className={classes.mb2}>
          <InputLabel htmlFor="my-input">Sale Price *</InputLabel>
          <Input
            id="my-input"
            name="sale_price"
            type="number"
            required
            value={product.sale_price}
            onChange={handleChange}
            aria-describedby="my-helper-text"
          />
          <FormHelperText id="my-helper-text">
            We automatically list items on sale as part of our targeted
            marketing efforts. Please enter your preferred maximum percentage we
            can take off an item. For example, the maximum discount can be 20%.
          </FormHelperText>
        </FormControl>

        <FormControl className={classes.mb2}>
          <InputLabel htmlFor="my-input">Wholesale quantity *</InputLabel>
          <Input
            id="my-input"
            name="wholesale_quantity"
            type="number"
            required
            value={product.wholesale_quantity}
            onChange={handleChange}
            aria-describedby="my-helper-text"
          />
          <FormHelperText id="my-helper-text">
            What quantity of products do customers have to buy to get a
            wholesale price?
          </FormHelperText>
        </FormControl>

        <FormControl className={classes.mb2}>
          <InputLabel htmlFor="my-input">Wholesale Price </InputLabel>
          <Input
            id="my-input"
            type="number"
            name="wholesale_price"
            value={product.wholesale_price}
            onChange={handleChange}
            aria-describedby="my-helper-text"
          />
          <FormHelperText id="my-helper-text">
            How much discount of the original price do you offer to customers
            buying in bulk e.g. 50% off
          </FormHelperText>
        </FormControl>

        <FormControl className={classes.mb2}>
          <InputLabel id="demo-simple-select-label">PPP adjusted? </InputLabel>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            name="ppp"
            value={product.ppp}
            onChange={handleChange}
          >
            <MenuItem value="yes">Yes</MenuItem>
            <MenuItem value="no">No</MenuItem>
          </Select>
        </FormControl>

        {product.ppp === 'yes' ? (
          <>
            <FormControl className={classes.mb2}>
              <InputLabel htmlFor="my-input">
                Standard USD currency price
              </InputLabel>
              <Input
                id="my-input"
                name="standard_usd"
                type="number"
                value={product.standard_usd}
                onChange={handleChange}
                aria-describedby="my-helper-text"
              />
              <FormHelperText id="my-helper-text">
                Leave this field blank if we can convert the price of your
                product based on prevailing interest rates. However if you have
                different prices for different markets please list it here.
              </FormHelperText>
            </FormControl>
            <FormControl className={classes.mb2}>
              <InputLabel htmlFor="my-input">
                Standard Euro currency price
              </InputLabel>
              <Input
                id="my-input"
                name="standard_euro"
                type="number"
                value={product.standard_euro}
                onChange={handleChange}
                aria-describedby="my-helper-text"
              />
              <FormHelperText id="my-helper-text">
                Leave this field blank if we can convert the price of your
                product based on prevailing interest rates. However if you have
                different prices for different markets please list it here.
              </FormHelperText>
            </FormControl>
          </>
        ) : (
            <></>
          )}

        <FormControl component="fieldset" className={classes.mb2}>
          <FormLabel component="legend">Weight *</FormLabel>
          <RadioGroup
            aria-label="weight"
            name="weight"
            value={product.weight}
            onChange={handleChange}
            required
          >
            <FormControlLabel value="2.5" control={<Radio />} label="<2.5kg" />
            <FormControlLabel
              value="2.5-3"
              control={<Radio />}
              label="2.5-3kg"
            />
            <FormControlLabel
              value="3.1-5"
              control={<Radio />}
              label="3.1-5kg"
            />
            <FormControlLabel
              value="5.1-8"
              control={<Radio />}
              label="5.1-8kg"
            />
            <FormControlLabel
              value="8.1-10"
              control={<Radio />}
              label="8.1-10kg"
            />
            <FormControlLabel
              value="10"
              control={<Radio />}
              label="over 10kg"
            />
          </RadioGroup>
        </FormControl>

        <FormControl className={classes.mb2}>
          <FormLabel component="legend">Volumetric Weight</FormLabel>
          <Input
            id="my-input"
            name="volumetric_weight"
            value={volumetric_weight}
            readOnly
            placeholder="Volumetric Weight"
            aria-describedby="my-helper-text"
          />
        </FormControl>

        <FormControl className={classes.mb2}>
          <FormLabel component="legend">Upsells *</FormLabel>
          <CreatableSelect
            isClearable
            onChange={handleUpSellsChange}
            options={sellsOption}
          />
          <div className={classes.colorsContainer}>
            {upSells.map((upSell) => (
              <Chip
                key={upSell}
                onDelete={() => handleDeleteUpsells(upSell)}
                label={products.find((product) => product.id === upSell).name}
                className={classes.chip}
              />
            ))}
          </div>
          <FormHelperText id="my-helper-text" />
          <FormHelperText id="my-helper-text">
            Are there more expensive products that are similar or in the same
            subcategory as this one that customers may like? List their names
            below (list up to 4 products only)
          </FormHelperText>
        </FormControl>

        <FormControl className={classes.mb2}>
          <FormLabel component="legend">CrossSells *</FormLabel>
          <CreatableSelect
            isClearable
            onChange={handleCrossSellsChange}
            options={sellsOption}
          />
          <div className={classes.colorsContainer}>
            {crossSells.map((crossSell) => (
              <Chip
                key={crossSell}
                onDelete={() => handleDeleteCrossSells(crossSell)}
                label={
                  products.find((product) => product.id === crossSell).name
                }
                className={classes.chip}
              />
            ))}
          </div>
          <FormHelperText id="my-helper-text">
            Are there any products that go well with this product e.g. can be
            used together or complete a look, living room, setee. Please list
            them here
          </FormHelperText>
        </FormControl>

        {/* <FormControl className={classes.mb2}>
          <InputLabel htmlFor="my-input">Photo Drive Link</InputLabel>
          <Input
            id="my-input"
            value={product.photo_drive_link}
            name="photo_drive_link"
            onChange={handleChange}
            aria-describedby="my-helper-text"
          />
          <FormHelperText id="my-helper-text">
            If you have photos already stored in a drive/dropbox please include
            the url link here
          </FormHelperText>
        </FormControl> */}

        <Box className={classes.footer}>
            <Button
              type="submit"
              variant="contained"
              color="primary"
              className={classes.button}
              disabled={isUploading}
            >
              Save
            </Button>

            {isUploading && (
              <CircularProgress size={24} className={classes.buttonProgress} />
            )}
        </Box>
      </form>
    </div>
  )
}

export default UploadProduct
