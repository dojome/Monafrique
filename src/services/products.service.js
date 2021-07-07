import axios from 'axios'
import authHeader from './auth-header'
import {
  GET_CATEGORIES_API_URL,
  GET_PRODUCTS_API_URL,
  GET_TAGS_API_URL,
  POST_PRODUCT_API_URL,
  POST_IMAGE_API_URL,
} from '../constants/api'
import { resizeFile, dataURLtoFile } from './file.service'

export function getProducts() {
  return axios
    .get(GET_PRODUCTS_API_URL, { headers: authHeader() })
    .then((res) => res.data)
    .catch((err) => err)
}

export function getCategories() {
  return axios
    .get(GET_CATEGORIES_API_URL, { headers: authHeader() })
    .then((res) => res.data)
    .catch((err) => err)
}

export function getTags() {
  return axios
    .get(GET_TAGS_API_URL, { headers: authHeader() })
    .then((res) => res.data)
    .catch((err) => err)
}

export function postProduct(data) {
  return axios
    .post(POST_PRODUCT_API_URL, data, { headers: authHeader() })
    .then((res) => res.data)
    .catch((error) => error)
}

export async function uploadImage(image, title, width, height) {
  const resizedImage = await resizeFile(image, width, height)
  const resizedFile = await dataURLtoFile(resizedImage, title + '.jpg')
  const formData = new FormData()
  formData.append('file', resizedFile)
  formData.append('title', title)
  return fetch(POST_IMAGE_API_URL, {
    method: 'POST',
    headers: authHeader(),
    body: formData,
  })
    .then((res) => res.json())
    .catch((err) => err)
}
