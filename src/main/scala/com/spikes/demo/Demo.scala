package com.spikes.demo

import java.sql.Date
import org.apache.spark.sql.{Encoders, SparkSession}

/*
 * @project: spark-zeppelin
 * @created: 2021/07/19 - 19:07
 * @author:  Luis Kevin Huaman Bolanger
 * @email:   lk.huaman@gmail.com
 */

object Demo extends App {

  val spark = SparkSession.builder()
      .master("local[*]")
      .appName("Demo CoronaVirus demo")
      .getOrCreate()

  import spark.implicits._

  val schema = Encoders.product[vaccinationsAgeDemographics].schema

  val vaccinationsAgeDemographics = spark
      .read
      .option("header", "true")
      .options(Map("dateFormat" -> "yyy-MM-dd"))
      .schema(schema)
      .csv("infrastructure/data/vaccinationsAgeDemographics_utla_E06000042_2021-07-18.csv")
      .toDF("a")
//      .as[vaccinationsAgeDemographics]

  vaccinationsAgeDemographics.show(10)

}

case class vaccinationsAgeDemographics(
  areaCode: String,
  areaName: String,
  areaType: String,
  date: Date,
  age: String,
  VaccineRegisterPopulationByVaccinationDate: Double,
  cumPeopleVaccinatedCompleteByVaccinationDate: Double,
  newPeopleVaccinatedCompleteByVaccinationDate: Double,
  newPeopleVaccinatedFirstDoseByVaccinationDate: Double,
  cumPeopleVaccinatedSecondDoseByVaccinationDate: Double,
  newPeopleVaccinatedSecondDoseByVaccinationDate: Double,
  cumVaccinationFirstDoseUptakeByVaccinationDatePercentage: Double,
  cumVaccinationCompleteCoverageByVaccinationDatePercentage: Double,
  cumVaccinationSecondDoseUptakeByVaccinationDatePercentage: Double
)



