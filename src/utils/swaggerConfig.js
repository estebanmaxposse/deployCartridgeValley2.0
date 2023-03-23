import swaggerJSDoc from "swagger-jsdoc"

const swaggerOptions = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Cartridge Valley ecommerce API',
      version: '1.0.0',
      description: 'Cartridge Valley ecommerce API'
    },
    servers: {
      url: 'http://localhost:8080',
      description: 'Main server'
    }
  },
  apis: ['./docs/**/*.yaml'],
  components: {
    securitySchemes: {
      bearerAuth: {
        type: 'http',
        scheme: 'bearer',
        bearerFormat: 'JWT'
      }
    }
  },
}

const swaggerDocs = swaggerJSDoc(swaggerOptions)

export default swaggerDocs