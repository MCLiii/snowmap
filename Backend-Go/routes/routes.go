package routes

import (
	"snowmap-backend/component"

	docs "snowmap-backend/docs"

	"github.com/gin-gonic/gin"
	swaggerFiles "github.com/swaggo/files"
	ginSwagger "github.com/swaggo/gin-swagger"
)

func RegisterRoutes(router *gin.Engine) {
	// Initialize Swagger docs
	docs.SwaggerInfo.BasePath = "/api"

	// Register API routes
	apiRoutes := router.Group("/api")
	{
		apiRoutes.GET("/", component.Hello)
	}

	// Register Swagger endpoint
	router.GET("/swagger/*any", ginSwagger.WrapHandler(swaggerFiles.Handler))
}
