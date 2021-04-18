module.exports = {
    swaggeroptions :  {
        explore:true,
        swaggerDefinition: {
          openapi: '3.0.0',
          info: {
            title: 'Address Book API' ,
            version: "2.0" ,
            description: "Address Book API",
            license: 'private',
          },
          servers: [ 
            {
              url: `http://localhost:8080/{basePath}`,
              description: 'Private Integration Service',
              variables: {
                environment: {
                  description: 'Select the environment to be utilized for your requests.',
                  enum: [
                    'sandbox',
                    'stage',
                    'production'
                  ],
                  default: 'sandbox' 
                },
                basePath:{
                  enum:['api'],
                  default: 'api'
                }
              }
            },
          ],
          components: {
            securitySchemes: {
              authorization: {
                type: 'http',
                scheme: 'bearer',
              }
            }
          },          
        },
        apis: ['./app/routes/*.js']
    }
}