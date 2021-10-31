package main

import (
	"github.com/gin-gonic/gin"
	"github.com/yotsaphon08/sa-64-example/controller"
	"github.com/yotsaphon08/sa-64-example/entity"
	"github.com/yotsaphon08/sa-64-example/middlewares"
)

func main() {
	entity.SetupDatabase()

	r := gin.Default()
	r.Use(CORSMiddleware())

	api := r.Group("")
	{
		protected := api.Use(middlewares.Authorizes())
		{
			// User Routes
			protected.GET("/informers", controller.ListInformer)
			protected.GET("/informer/:id", controller.GetInformer)
			//protected.POST("/informers", controller.CreateInformer)
			protected.PATCH("/informers", controller.UpdateInformer)
			protected.DELETE("/informers/:id", controller.DeleteInformer)

			// Characteristic Routes
			protected.GET("/characteristics", controller.ListCharacteristics)
			protected.GET("/characteristic/:id", controller.GetCharacteristic)
			protected.POST("/characteristics", controller.CreateCharacteristic)
			protected.PATCH("/characteristics", controller.UpdateCharacteristic)
			protected.DELETE("/characteristics/:id", controller.DeleteCharacteristic)

			// Patient Routes
			protected.GET("/patients", controller.ListPatient)
			protected.GET("/patient/:id", controller.GetPatient)
			//protected.POST("/patients", controller.CreatePatient)
			protected.PATCH("/patients", controller.UpdatePatient)
			protected.DELETE("/patients/:id", controller.DeletePatient)

			// Level Routes
			protected.GET("/levels", controller.ListLevels)
			protected.GET("/level/:id", controller.GetLevel)
			protected.POST("/levels", controller.CreateLevel)
			protected.PATCH("/levels", controller.UpdateLevel)
			protected.DELETE("/levels/:id", controller.DeleteLevel)

			// Case Routes
			protected.GET("/cases", controller.ListCase)
			protected.GET("/case/:id", controller.GetCase)
			protected.POST("/cases", controller.CreateCase)
			protected.PATCH("/cases", controller.UpdateCase)
			protected.DELETE("/cases/:id", controller.DeleteCase)

		}
	}

	// User Routes
	r.POST("/informers", controller.CreateInformer)

	// Patient Routes
	r.POST("/patients", controller.CreatePatient)

	// Authentication Routes
	r.POST("/login", controller.Login)

	// Run the server
	r.Run()
}

func CORSMiddleware() gin.HandlerFunc {
	return func(c *gin.Context) {
		c.Writer.Header().Set("Access-Control-Allow-Origin", "*")
		c.Writer.Header().Set("Access-Control-Allow-Credentials", "true")
		c.Writer.Header().Set("Access-Control-Allow-Headers", "Content-Type, Content-Length, Accept-Encoding, X-CSRF-Token, Authorization, accept, origin, Cache-Control, X-Requested-With")
		c.Writer.Header().Set("Access-Control-Allow-Methods", "POST, OPTIONS, GET, PUT")

		if c.Request.Method == "OPTIONS" {
			c.AbortWithStatus(204)
			return
		}

		c.Next()
	}
}
