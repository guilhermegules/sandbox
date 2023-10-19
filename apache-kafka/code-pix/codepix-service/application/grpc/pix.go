package grpc

import (
	"github.com/guilhermegules/code-pix/application/grpc/pb"
	"github.com/guilhermegules/code-pix/application/usecase"
	"context"
)

type PixGrpcService struct {
	PixUseCase usecase.PixUseCase
	pb.UnimplementedPixServiceServer
}

func (pixGrpcService *PixGrpcService) RegisterPixKey(ctx context.Context, in *pb.PixKeyRegistration) (*pb.PixKeyCreatedResult, error) {
	key, err := pixGrpcService.RegisterPixKey(in.Key, in.Kind, in.AccountId)

	if err != nil {
		return &pb.PixKeyCreatedResult{
			Status: "not created",
			Error: err.Error(),
		}, err
	}

	return &pb.PixKeyCreatedResult{
		Status: "created",
		Id: key.ID,
	}, nil
}

func (pixGrpcService *PixGrpcService) Find(ctx context.Context, in *pb.PixKey) (*pb.PixKeyInfo, error) {
	pixKey, err := pixGrpcService.FindKey(in.Key, in.Kind)

	if err != nil {
		return &pb.PixKeyInfo{}, err
	}

	return &pb.PixKeyInfo{
		Id: pixKey.ID,
		Kind: pixKey.Kind,
		Key: pixKey.Key,
		Account: &pb.Account{
			AccountId: pixKey.AccountId,
			AccountNumber: pixKey.Account.Number,
			BankId: pixKey.Account.BankID,
			BankName: pixKey.Account.Bank.Name,
			OwnerName: pixKey.Account.OwnerName,
			CreatedAt: PixKey.Account.CreatedAt.String(),
		},
		CreatedAt: PixKey.CreatedAt.String(),
	}, nil
}

func NewPixGrpcService(usecase usecase.PixUseCase) *PixGrpcService {
	return &PixGrpcService{
		PixUseCase: usecase,
	}
}