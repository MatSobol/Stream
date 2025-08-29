FROM postgres:17

COPY init.sql /docker-entrypoint-initdb.d/init.sql

# made with https://pgtune.leopard.in.ua/
COPY postgresql.conf /etc/postgresql/postgresql.conf

CMD ["postgres", "-c", "config_file=/etc/postgresql/postgresql.conf"]
