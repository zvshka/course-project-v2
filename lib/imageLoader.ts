export const imageLoader = ({src, width, quality = 75}) => {
    // return `${process.env.BASE_URL || 'http://localhost:3000'}/${src}?width=${width}&quality=${quality}`
    return `${src}?width=${width}&quality=${quality}`
}