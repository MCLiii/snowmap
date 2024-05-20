package component

import (
	"database/sql"
	"fmt"
	"net/http"

	"github.com/gin-gonic/gin"
	_ "github.com/mattn/go-sqlite3"
)

type WeatherData struct {
	Date  string `json:"date"`
	Value string `json:"value"`
}

type ErrorResponse struct {
	Error string `json:"error"`
}

type SuccessResponse struct {
	Data map[string]map[string]string `json:"data"`
}

// GetGraph handles the endpoint for fetching weather data based on query parameters.
// @Summary Fetch weather data
// @Description Get weather data for a specific resort and date range
// @Tags weather
// @Accept  json
// @Produce  json
// @Param resort query string true "Resort name"
// @Param start_date query string true "Start date in YYYY-MM-DD format"
// @Param end_date query string true "End date in YYYY-MM-DD format"
// @Param data_type query string true "Data type (e.g., snowfall, tmax, tmin, tavg)"
// @Success 200 {object} SuccessResponse "data"
// @Failure 400 {object} ErrorResponse "Invalid data type or missing parameters"
// @Failure 500 {object} ErrorResponse "Database connection or query execution error"
// @Router /api/get-graph [get]
func GetGraph(c *gin.Context) {
	resort := c.Query("resort")
	startDate := c.Query("start_date")
	endDate := c.Query("end_date")
	dataType := c.Query("data_type")

	allowedColumns := map[string]bool{
		"snowfall": true,
		"tmax":     true,
		"tmin":     true,
		"tavg":     true,
	}

	if !allowedColumns[dataType] {
		c.JSON(http.StatusBadRequest, ErrorResponse{Error: fmt.Sprintf("Invalid data_type: %s", dataType)})
		return
	}

	db, err := sql.Open("sqlite3", "../../db/skiDataset.db")
	if err != nil {
		c.JSON(http.StatusInternalServerError, ErrorResponse{Error: "Failed to connect to database"})
		return
	}
	defer db.Close()

	var query string
	var rows *sql.Rows

	if dataType == "snowfall" {
		if startDate[5:] > endDate[5:] {
			query = `
                SELECT date, w.snowfall
                FROM snowfall w
                JOIN location l ON w.resort_name = l.resort_name
                WHERE w.resort_name = ? AND ((SUBSTR(w.date, 6) >= ? AND SUBSTR(w.date, 6) <= ?) OR
                    (SUBSTR(w.date, 6) >= ? AND SUBSTR(w.date, 6) <= ?))
                ORDER BY date ASC
            `
			rows, err = db.Query(query, resort, startDate[5:], "12-31", "01-01", endDate[5:])
		} else {
			query = `
                SELECT date, w.snowfall
                FROM snowfall w
                JOIN location l ON w.resort_name = l.resort_name
                WHERE w.resort_name = ? AND SUBSTR(w.date, 6) BETWEEN ? AND ?
                ORDER BY date ASC
            `
			rows, err = db.Query(query, resort, startDate[5:], endDate[5:])
		}
	} else {
		if startDate[5:] > endDate[5:] {
			query = fmt.Sprintf(`
                SELECT date, %s
                FROM weather
                WHERE resort_name = ? AND ((SUBSTR(date, 6) >= ? AND SUBSTR(date, 6) <= ?) OR
                    (SUBSTR(date, 6) >= ? AND SUBSTR(date, 6) <= ?))
                ORDER BY date ASC
            `, dataType)
			rows, err = db.Query(query, resort, startDate[5:], "12-31", "01-01", endDate[5:])
		} else {
			query = fmt.Sprintf(`
                SELECT date, %s
                FROM weather
                WHERE resort_name = ? AND SUBSTR(date, 6) BETWEEN ? AND ?
                ORDER BY date ASC
            `, dataType)
			rows, err = db.Query(query, resort, startDate[5:], endDate[5:])
		}
	}

	if err != nil {
		c.JSON(http.StatusInternalServerError, ErrorResponse{Error: "Failed to execute query"})
		return
	}
	defer rows.Close()

	result := make([]WeatherData, 0)
	for rows.Next() {
		var date string
		var value string
		if err := rows.Scan(&date, &value); err != nil {
			c.JSON(http.StatusInternalServerError, ErrorResponse{Error: "Failed to scan row"})
			return
		}
		result = append(result, WeatherData{Date: date, Value: value})
	}

	formattedData := make(map[string]map[string]string)
	for _, row := range result {
		year, monthDay := row.Date[:4], row.Date[5:]
		if _, exists := formattedData[year]; !exists {
			formattedData[year] = make(map[string]string)
		}
		formattedData[year][monthDay] = row.Value
	}

	c.JSON(http.StatusOK, SuccessResponse{Data: formattedData})
}
