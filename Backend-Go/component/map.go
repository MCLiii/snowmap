package component

import (
	"net/http"

	"github.com/gin-gonic/gin"
)

// @Summary Show a Hello message
// @Description Get a Hello message
// @Tags example
// @Accept  json
// @Produce  json
// @Success 200 {string} string "ok"
// @Router /api/ [get]
func Hello(c *gin.Context) {
	c.JSON(http.StatusOK, gin.H{"message": "hello"})
}
