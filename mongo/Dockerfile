FROM mongo

COPY init.json /init.json
CMD mongoimport --host mongodb --db drivers --collection drivers --type json --file /init.json --jsonArray