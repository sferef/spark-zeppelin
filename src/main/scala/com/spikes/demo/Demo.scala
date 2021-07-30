package com.spikes.demo

import org.apache.spark.sql.SparkSession

/*
 * @project: spark-zeppelin
 * @created: 2021/07/19 - 19:07
 * @author:  Luis Kevin Huaman Bolanger
 * @email:   lk.huaman@gmail.com
 */

object Demo extends App {

  val spark = SparkSession.builder()
      .master("local[*]")
      .appName("Medical information")
      .getOrCreate()

  // Grafico temporal por mes el numero de casos.
  // Agregacion temporal por quincena o semana o dia
  // Mapa por pais (provincia) with cases number
  // Mapa de vacunados
  // grafico de quesito por pais (infectados, muertos y vacunados)

}

