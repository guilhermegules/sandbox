package model

import (
	"github.com/asaskevich/govalidator"
	uuid "github.com/satori/go.uuid"
	"time"
	"errors"
)

type PixKeyRepository interface {
	Register(pixKey *PixKey) (*PixKey, error)
	FindKeyByKind(key string, Kind string) (*PixKey, error)
	AddBank(bank *Bank) error
	AddAccount(account *Account) error
	FindAccount(accountId string) (*Account, error)
}

const (
	PixKeyStatusActive string = "active"
	PixKeyStatusInactive string = "inactive"
)

type PixKey struct {
	Base `valid:"required"`
	Kind string `json:"kind" valid:"notnull"`
	Key string `json:"key" valid:"notnull"`
	AccountID string `json:"accountId" valid:"notnull"`
	Account *Account `valid:"-"`
	Status string `json:"status" valid:"notnull"`
}

func (pixKey *PixKey) isValid() error {
	_, err := govalidator.ValidateStruct(pixKey)

	if pixKey.Kind != "email" && pixKey.Kind != "cpf" {
		return errors.New("Invalid type of key")
	}

	if pixKey.Status != "active" && pixKey.Status != "inactive" {
		return errors.New("Invalid status")
	}

	if err != nil {
		return err
	}

	return nil
}

func NewPixKey(kind string, key string, account *Account, accountId string) (*PixKey, error) {
	pixKey := PixKey{
		Key: key,
		Kind: kind,
		Account: account,
		Status: PixKeyStatusActive,
		AccountID: accountId,
	}

	pixKey.ID = uuid.NewV4().String()
	pixKey.CreatedAt = time.Now()

	err := pixKey.isValid()

	if err != nil {
		return nil, err
	}

	return &pixKey, nil
}