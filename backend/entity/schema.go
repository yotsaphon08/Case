package entity

import (
	"time"

	"gorm.io/gorm"
)

type Informer struct {
	gorm.Model
	Name     string
	Email    string `gorm:"uniqueIndex"`
	Tel      string
	Password string

	Cases []Case `gorm:"foreignKey:InformerID"`
}

type Patient struct {
	gorm.Model
	Name   string
	Age    string
	Gender string

	Cases []Case `gorm:"foreignKey:PatientID"`
}

type Level struct {
	gorm.Model
	Rating string
	Cases  []Case `gorm:"foreignKey:LevelID"`
}

type Characteristic struct {
	gorm.Model
	Category string
	Cases    []Case `gorm:"foreignKey:CharacteristicID"`
}

type Case struct {
	gorm.Model
	CaseTime time.Time
	Address  string

	CharacteristicID *uint
	Characteristic   Characteristic

	LevelID *uint
	Level   Level

	InformerID *uint
	Informer   Informer

	PatientID *uint
	Patient   Patient
}
