package usecase

import (
	"github.com/guilhermegules/code-pix/domain/model"
	"errors"
)

type PixUseCase struct {
	PixKeyRepository model.PixKeyRepository
}

func (pix *PixUseCase) RegisterKey(key string, kind string, accountId string) (*model.PixKey, error) {
	account, err := pix.PixKeyRepository.FindAccount(accountId)

	if err != nil {
		return nil, err
	}

	pixKey, err := model.NewPixKey(kind, key, account, accountId)

	if err != nil {
		return nil, err
	}

	pix.PixKeyRepository.Register(pixKey)

	if pixKey.ID == "" {
		return nil, errors.New("Unable to create new key at the moment")
	}

	return pixKey, nil
}

func (pix *PixUseCase) FindKey(key string, kind string) (*model.PixKey, error) {
	pixKey, err := pix.PixKeyRepository.FindKeyByKind(key, kind)

	if err != nil {
		return nil, err
	}

	return pixKey, nil
}
