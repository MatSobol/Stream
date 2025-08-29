package utility

import (
	"errors"
	"os"
)

func ReadFoldersName() ([]string, error) {
	entries, err := os.ReadDir("../../backend")

	if err != nil {
		return nil, errors.New("can't read folders with services")
	}

	var foldersName []string

	for _, entry := range entries {
		if entry.IsDir() {
			foldersName = append(foldersName, entry.Name())
		}
	}

	return foldersName, nil
}
