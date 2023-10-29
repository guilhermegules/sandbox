package model

import (
	"github.com/asaskevich/govalidator"
	"time"
)

type Base struct {
	ID string `json:"id" valid:"uuid"`
	CreatedAt time.Time `json:"createdAt" valid:"-"`
	UpdatedAt time.Time `json:"updatedAt" valid:"-"` 
}

func init() {
	govalidator.SetFieldsRequiredByDefault(true)
}