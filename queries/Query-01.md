### Queries

%md
Testing data
Loading:

cumPeopleVaccinatedFirstDoseByVaccinationDate
cumPeopleVaccinatedSecondDoseByVaccinationDate

```scala
import spark.implicits._
import java.sql.Date
import org.apache.spark.sql.{Encoders, SparkSession}

def loading(session: SparkSession, path: String): org.apache.spark.sql.Dataframe = {
  val df = session
              .read
              .option("header", "true")
              .option("inferSchema", "true")
              .options(Map("dateFormat" -> "yyyy-MM-dd"))
              .csv(path)
              .toDF()
  df
}

val firstDoseVaccine = loading(spark, "/opt/spark-data/cumPeopleVaccinatedFirstDoseByVaccinationDate_utla_E06000042_2021-07-18.csv")

val secondDoseVaccine = loading(spark, "/opt/spark-data/cumPeopleVaccinatedSecondDoseByVaccinationDate_utla_E06000042_2021-07-18.csv")

firstDoseVaccum.createOrReplaceTempView("tbl_cumPeopleVaccinatedFirstDoseByVaccinationDate")

secondDoseVaccine.createOrReplaceTempView("tbl_cumPeopleVaccinatedSecondDoseByVaccinationDate")
```


```sql

%sql

SELECT
  b.date, 
  avg(b.cumPeopleVaccinatedFirstDoseByVaccinationDate) as average_people_vaccinated_first_dose
FROM (
  select
    areaCode,
    areaName,
    areaType,
    date,
    cumPeopleVaccinatedFirstDoseByVaccinationDate,
    row_number() OVER ( PARTITION BY areaName ORDER BY date DESC) seq
  from tbl_cumPeopleVaccinatedFirstDoseByVaccinationDate
) b
GROUP BY b.date ORDER BY b.date ASC

```