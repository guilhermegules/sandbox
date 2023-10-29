package model_test

import (
	"testing"
	uuid "github.com/satori/go.uuid"
	"github.com/guilhermegules/code-pix/domain/model"
	"github.com/stretchr/testify/require"
)

func TestModel_NewPixKey(testing *testing.T) {
	code := "001"
	name := "Banco do Brasil"
	bank, err := model.NewBank(code, name)

	accountNumber := "111"
	ownerName := "Guilherme"
	account, err := model.NewAccount(bank, accountNumber, ownerName)

	kind := "email"
	key := "g@g.com"
	accountId := "123"
	pixKey, err := model.NewPixKey(kind, key, account, accountId)

	require.NotEmpty(testing, uuid.FromStringOrNil(pixKey.ID))
	require.Equal(testing, pixKey.Kind, kind)
	require.Equal(testing, pixKey.Status, "active")

	kind = "cpf"

	_, err = model.NewPixKey(kind, key, account, accountId)
	require.Nil(testing, err)

	_, err = model.NewPixKey("name", key, account, accountId)
	require.NotNil(testing, err)
}
