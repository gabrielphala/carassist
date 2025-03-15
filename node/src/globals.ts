export const urls = ['development', 'staging'].includes(process.env.NODE_ENV) ? (
   {
    BASE_PUBLIC: process.env.NGROK,
    FRONT_END: 'http://localhost:5173/'
  }
) : (
  {
    BASE_PUBLIC: 'https://carassisthub.info',
    FRONT_END: '/'
  }
)