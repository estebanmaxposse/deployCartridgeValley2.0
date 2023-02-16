import swaggerJSDoc from "swagger-jsdoc"

const swaggerOptions = {
    definition: {
        openapi: '3.0.0',
        info: {
          title: 'Cartridge Valley ecommerce API',
          version: '1.0.0',
          description: 'Cartridge Valley ecommerce API'
        }
      },
      apis: ['./docs/**/*.yaml']
}

const swaggerDocs = swaggerJSDoc(swaggerOptions)

export default swaggerDocs