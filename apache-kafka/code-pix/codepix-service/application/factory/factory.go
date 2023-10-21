package factory

import (
	"github.com/guilhermegules/code-pix/application/usecase"
	"github.com/guilhermegules/code-pix/infrastructure/repository"
	"github.com/jinzhu/gorm"
)

func TransactionUseCaseFactory(database *gorm.DB) usecase.TransactionUseCase {
	pixRepository := repository.PixKeyRepositoryDb{Db: database}
	transactionRepository := repository.TransactionRepositoryDb{Db: database}

	transactionUseCase := usecase.TransactionUseCase{
		TransactionRepository: &transactionRepository,
		PixRepository: pixRepository,
	}

	return transactionUseCase
}
