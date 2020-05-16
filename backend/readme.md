**Obsługa Aplikacji**

(polecenia uruchamiane w katalogu 'backend' z konsoli)

- Instalacja wymaganych paczek: <br>
`pip install -r requirements.txt`

- Przygotowanie aktualizacji bazy danych: <br>
`flask db migrate --directory database/migrations`<br>
(gdyby wystąpił błąd: `ERROR [root] Error: Target database is not up to date.` <br>
powinna pomóc komenda: `flask db stamp heads --directory database\migrations`)

- Aktualizacja bazy danych: <br>
`flask db upgrade --directory database/migrations` 

- Uruchomienie aplikacji: <br>
`flask run`
<br>
lub uruchomić plik 'main.py'

