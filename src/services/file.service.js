import Resizer from 'react-image-file-resizer'

export const resizeFile = (file, width, height) =>
  new Promise((resolve) => {
    Resizer.imageFileResizer(
      file,
      width,
      height,
      'JPEG',
      100,
      0,
      (uri) => {
        resolve(uri)
      },
      'base64',
      width,
      height,
    )
  })
export function dataURLtoFile(dataurl, filename) {
  var arr = dataurl.split(','),
    mime = arr[0].match(/:(.*?);/)[1],
    bstr = atob(arr[1]),
    n = bstr.length,
    u8arr = new Uint8Array(n)

  while (n--) {
    u8arr[n] = bstr.charCodeAt(n)
  }

  return new File([u8arr], filename, { type: mime })
}
