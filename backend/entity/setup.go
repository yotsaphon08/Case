package entity

import (
	"time"

	"golang.org/x/crypto/bcrypt"
	"gorm.io/driver/sqlite"
	"gorm.io/gorm"
)

var db *gorm.DB

func DB() *gorm.DB {
	return db
}

func SetupDatabase() {
	database, err := gorm.Open(sqlite.Open("sa-64.db"), &gorm.Config{})
	if err != nil {
		panic("failed to connect database")
	}

	// Migrate the schema
	database.AutoMigrate(
		&Level{},
		&Informer{},
		&Patient{},
		&Characteristic{},
		&Case{},
	)

	db = database

	password, err := bcrypt.GenerateFromPassword([]byte("123456"), 14)

	db.Model(&Informer{}).Create(&Informer{
		Name:     "Butsakorn",
		Email:    "butsakorn@gmail.com",
		Tel:      "065-280-3444",
		Password: string(password),
	})

	db.Model(&Informer{}).Create(&Informer{
		Name:     "Yotsaphon",
		Email:    "yotsaphon@gmail.com",
		Tel:      "082-875-3990",
		Password: string(password),
	})

	db.Model(&Informer{}).Create(&Informer{
		Name:     "Name",
		Email:    "name@gmail.com",
		Tel:      "089-998-8877",
		Password: string(password),
	})

	var butsakorn Informer
	var yotsaphon Informer
	var name Informer
	db.Raw("SELECT * FROM informers WHERE email = ?", "butsakorn@gmail.com").Scan(&butsakorn)
	db.Raw("SELECT * FROM informers WHERE email = ?", "yotsaphon@gmail.com").Scan(&yotsaphon)
	db.Raw("SELECT * FROM informers WHERE email = ?", "name@gmail.com").Scan(&name)

	// --- Characteristic

	congenitaldisease := Characteristic{
		Category: "โรคประจำตัว",
	}
	db.Model(&Characteristic{}).Create(&congenitaldisease)

	accident := Characteristic{
		Category: "เกิดอุบัติเหตุ",
	}
	db.Model(&Characteristic{}).Create(&accident)

	// --- Level
	little := Level{
		Rating: "เล็กน้อย",
	}
	db.Model(&Level{}).Create(&little)

	moderate := Level{
		Rating: "ปานกลาง",
	}
	db.Model(&Level{}).Create(&moderate)

	serious := Level{
		Rating: "หนัก",
	}
	db.Model(&Level{}).Create(&serious)

	// --- Patient
	PatientOfTonphaii := Patient{
		Name:   "Tonphaii",
		Age:    "20",
		Gender: "หญิง",
	}
	db.Model(&Patient{}).Create(&PatientOfTonphaii)

	PatientOfAwesome := Patient{
		Name:   "Awesome",
		Age:    "21",
		Gender: "ชาย",
	}
	db.Model(&Patient{}).Create(&PatientOfAwesome)

	PatientOfHunki := Patient{
		Name:   "Hunki",
		Age:    "26",
		Gender: "ชาย",
	}
	db.Model(&Patient{}).Create(&PatientOfHunki)

	// Case 1
	db.Model(&Case{}).Create(&Case{
		Characteristic: accident,
		Level:          serious,
		CaseTime:       time.Now(),
		Address:        "หอ หลังมอ มข. ต.ในเมือง อ.เมืองขอนแก่น จ.ขอนแก่น",
		Patient:        PatientOfHunki,
		Informer:       butsakorn,
	})
	// Case 2
	db.Model(&Case{}).Create(&Case{
		Characteristic: congenitaldisease,
		Level:          little,
		CaseTime:       time.Now(),
		Address:        "หน้าวัดพระธาตุพนม ต.ธาตุพนม อ.ธาตุพนม จ.นครพนม",
		Patient:        PatientOfTonphaii,
		Informer:       yotsaphon,
	})
	// Case 3
	db.Model(&Case{}).Create(&Case{
		Characteristic: accident,
		Level:          moderate,
		CaseTime:       time.Now(),
		Address:        "ถนนหน้าเซเว่นประตู 4 มทส. ต.สุรนารี อ.เมือง จ.นครราชสีมา",
		Patient:        PatientOfAwesome,
		Informer:       name,
	})

}
