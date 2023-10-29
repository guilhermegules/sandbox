package model_test

import (
	"testing"
	uuid "github.com/satori/go.uuid"
	"github.com/guilhermegules/code-pix/domain/model"
	"github.com/stretchr/testify/require"
)

func TestModel_NewBank(testing *testing.T) {
	code := "001"
	name := "Banco do Brasil"

	bank, err := model.NewBank(code, name)

	require.Nil(testing, err)
	require.NotEmpty(testing, uuid.FromStringOrNil(bank.ID))
	require.Equal(testing, bank.Code, code)
	require.Equal(testing, bank.Name, name)

	_, err = model.NewBank("", "")
	require.NotNil(testing, err)
}