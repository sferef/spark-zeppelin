## Testing plugin map

Data loadaed: *cumPeopleVaccinatedFirstDoseByVaccinationDate.csv*

```scala 
val data = spark
    .read
    .config("inferSchema", "true")
    .config("header", "true")
    .csv("/opt/spark-data/cumPeopleVaccinatedFirstDoseByVaccinationDate_utla_E06000042_2021-07-18.csv")
    .toDF(
        "areaCode",
        "areaName",
        "areaType",
        "date",
        "cumPeopleVaccinatedFirstDoseByVaccinationDate"
    )
```
