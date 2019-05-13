#!/bin/bash

CHANGELOG_FILE=/changelog/changelog-master.yaml
CONN=/opt/jdbc_drivers/mysql-connector-java-5.1.44-bin.jar
SNAKEYAML=/opt/jdbc_drivers/snakeyaml-1.19.jar
DATABASE_NAME="yogar"
DATABASE_USER="root"

#Wait MySql is Ready!
while ! mysqladmin ping -h"$DB_HOST" -u"$DATABASE_USER" -p"$DB_PASSWORD" --silent; do
    sleep 1
done

#Create database if dont exists
DATUMBAZO=$( mysqlshow -h"$DB_HOST" -u"$DATABASE_USER" -p"$DB_PASSWORD" $DATABASE_NAME | grep -v Wildcard | grep -o $DATABASE_NAME )
if [ ! "$DATUMBAZO" == "$DATABASE_NAME" ]; then
    mysql -h$"$DB_HOST" -u"$DATABASE_USER" -p"$DB_PASSWORD" -e "create database $DATABASE_NAME";
fi

# Populate!
liquibase --driver=com.mysql.jdbc.Driver --logLevel=info \
     --classpath=$CONN:$SNAKEYAML \
     --changeLogFile=$CHANGELOG_FILE \
     --url="jdbc:mysql://$DB_HOST/$DATABASE_NAME" \
     --username=$DATABASE_USER \
     --password=$DB_PASSWORD \
     migrate

if [ $? -eq 0 ]; then
	echo "OK"
else
  echo "Not Ok"
  tail -f /dev/null
fi
