DOKUMENTACJA WEWNETRZNEGO API

***
- Metody do odczytu i modyfikacji danych o filmach <br>
Endpoint: `/movie`

GET: <br>
Zwraca dane wszystkich filmow w bazie lub dane o konkretnym filmie, jesli wskazane jest jego id <br>
Params: `movie_id` (int) (optional)

POST: <br>
Tworzy nowy rekord filmu w bazie o podanych parametrach. Zwraca utworzony rekord.
Params: <br>
`title` (string) (optional) <br>
`director` (string) (optional) <br>
`release_date` (string) (optional) <br>
`age_category` (string) (optional) <br>
`movie_category` (string) (optional) <br>
`availability` (boolean) (optional) <br>
`duration` (int) (optional) <br>

PUT: <br>
Modyfikuje rekord o podanym id na podstawie przekazanych parametrow. Zwraca zaktualizowany rekord. <br>
Params: <br>
`movie_id` (int) <br>
`title` (string) (optional) <br>
`director` (string) (optional) <br>
`release_date` (string) (optional) <br>
`age_category` (string) (optional) <br>
`movie_category` (string) (optional) <br>
`availability` (boolean) (optional) <br>
`duration` (int) (optional) <br>

DELETE: <br>
Usuwa rekord o podanym id. Zwraca usuniety rekord.
Params: <br>
`movie_id` (int) <br>

***