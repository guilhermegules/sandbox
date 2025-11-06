package main

import (
	"bufio"
	"fmt"
	"io"
	"net/http"
	"os"
	"strconv"
	"strings"
	"time"
)

const monitoring = 3
const delayRequestsInSeconds = 5 * time.Second

func main() {
	welcome()

	for {
		createMenu()

		option := getMenuOption()

		switch option {
		case 1:
			initMonitoring()
		case 2:
			showLogs()
		case 0:
			fmt.Println("Exiting...")
			os.Exit(0)
		default:
			fmt.Println("Command not found.")
			os.Exit(-1)
		}
	}

}

func welcome() {
	fmt.Println("Hello, what do you want to do?")
}

func createMenu() {
	fmt.Println("1 - Init monitoring")
	fmt.Println("2 - Show logs")
	fmt.Println("0 - Exit")
}

func getMenuOption() int {
	var option int
	fmt.Scanf("%d", &option)

	return option
}

func initMonitoring() {
	fmt.Println("Monitoring...")
	sites := readSitesFromFile()

	for range monitoring {
		for _, site := range sites {
			fmt.Println("Testing site:", site)
			testSite(site)
		}
		time.Sleep(delayRequestsInSeconds)
	}

	fmt.Println("---------------")
}

func testSite(site string) {
	res, err := http.Get(site)

	if err != nil {
		fmt.Println("The request for ", site, "has error")
		return
	}

	isOk := res.StatusCode == 200

	if isOk {
		fmt.Println("Site: ", site, "was loaded successfully")
	} else {
		fmt.Println("Site: ", site, "was loaded with error. Status Code:", res.StatusCode)
	}

	registerLog(site, isOk)
}

func readSitesFromFile() []string {
	var sites []string
	file, err := os.Open("sites.txt")

	if err != nil {
		fmt.Println("Opening file with error:", err)
		os.Exit(-1)
	}

	reader := bufio.NewReader(file)

	for {
		line, err := reader.ReadString('\n')

		if err == io.EOF {
			break
		}

		if err != nil {
			fmt.Println("Reading file with error", err)
			os.Exit(-1)
		}

		line = strings.TrimSpace(line)
		sites = append(sites, line)
	}

	file.Close()

	return sites
}

func registerLog(site string, online bool) {
	file, err := os.OpenFile("log.txt", os.O_RDWR|os.O_CREATE|os.O_APPEND, 0666)

	if err != nil {
		fmt.Println(err)
		os.Exit(-1)
	}

	file.WriteString(time.Now().Format("02/01/2006 15:04:05") + " - " + site + " - online: " + strconv.FormatBool(online) + "\n")
	file.Close()
}

func showLogs() {
	file, err := os.Open("log.txt")

	if err != nil {
		fmt.Println("Opening file with error:", err)
		os.Exit(-1)
	}

	reader := bufio.NewReader(file)

	for {
		line, err := reader.ReadString('\n')

		if err == io.EOF {
			break
		}

		if err != nil {
			fmt.Println("Reading file with error", err)
			os.Exit(-1)
		}

		line = strings.TrimSpace(line)
		fmt.Println(line)
	}

	file.Close()
}
