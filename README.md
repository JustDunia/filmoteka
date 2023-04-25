###       CARD.JS ----------------------------------------------------------------------------------------------------------------------------------------------------

#           Importy:
 axios – biblioteka do zapytao http,
 tui-pagination – biblioteka do paginacji
 funkcja ./helper (generowanie id. Iteruje po tablicy szukając po id, które dostaje jako parametr i zwraca odpowiadający temy id (name - nazwę gatunku) 

# const listFilms,
 który  przechowuje nam element ul w html, do którego generowane są okładki filmów.

# let’y - 
Deklaracja stron oraz liczba wszystkich filmów do paginacji (do pagination.js)

# Funkcja fechRenderingMovies:
 jest asynchroniczna = async
 przyjmuje parametr page
 cała funkcja wykonuje zapytanie do api
 przyjmuje składnię async await
 główne zadanie stworzyć zmienną response, którą pózniej będzie zwracad (odp. z api)
 wartośd zmiennej response to jest obiekt odpowiedzi -> obiekt, który wychodzi z api
 zapytanie wykonane jest za pomocą biblioteki
 paramsy są to właściwości tego zapytania
 return -> zwraca dane dotyczące filmów

# Funkcja RenderFilms – szablon
 Funkcja tablicowa .map – za każdym razem przyjmuje elementy naszej tablicy. Chcemy zwrócid tutaj jako całośd
kod html i funkcja .map nam go zwróci.
 .join -> metoda tablicowa łączy elementy elementy tablicy w string oraz usówa spacje.
 W trakcie działania renderFilms, (która wykonuje się raz), a w niej .map (wykonuje się x razy) x – to jest ilośd
elementów tablicy.
 Jest to szablon karty, który chcemy uzyskad podczas jej wyświetlania, stworzony w js by odbywało się to
dynamicznie.

# isNaN i Number.parseInt 
– sprawdzamy czy nasze info zwrotne jest liczbą typu NaN. Jeżeli nie to w tym przypadku
  pokazana jest nam data danego filmu. Jeżeli tak to zwraca nam komunikat o braku daty.

# replaceAll 
– podmienia nam brak obrazka karty na wybrany /dany przez nas obrazek

# const pagination 
– stworzony element paginacji umieszczony w html (w pagination.js – również)

# totalItems 
– zmienna, która przyjmuje całą ilośd wszystkich filmów z odp. api i rozmieszcza je wg. Wyznaczonych wartości do stron. (totalItems = response.total_results).

# currentPage 
– aktualna strona.

# Pagination.on:
 Asynchroniczna funkcja, która zmienia str.
 eventListener – pagination.on jest w tym przypadku eventListenerem pochodzącym z biblioteki paginacji.
 renderFilms - ma nam tutaj przerenderowad filmy, które się wyświetlają (podczas klikania przez str. paginacji)
# fetchTrendingMovies 
– różnica pagination.on dzieje się podcza kliknięcia na nr. paginacji, natomiast
# fetchTrendingMovies 
dzieje się podczas ładowania filmów.


### SEARCH.JS - 
(sytuacja jest analogiczna jak w przypadku opisanego pliku wcześniej - 
# CARD.JS) -------------------------------------

# query 
– jako zapytanie do api o tytuł filmu, który chcemy by się wyszukał trafia do end-pointu (/movie?) w http.

# table 
– zmienna, w której zapisujemy odp. z api (funkcja asynchroniczna, która zwraca nam tablicę z api.)

# renderFilms:
 Funkcja, która dodaje do html szablon karty.
 W .map zostaje zwrócony wynik tablicy (lokalnie).

# searchFilms:
 Funkcja wywoływana przy submicie.
 preventDefault() – zapobiega przeładowaniu str., domyślnie wywoływanemu przez zdarzenie submit.
 Z obecnego celu eventu pobiera sobie wartośd tego pola event.currentTarget, z którego tworzymy
{searchQuery} ,
 i w ta zmienna ma key value, który przechowuje wartośd wpisywaną w input.

# listFilm.innerHTML =’’; 
- czyścimy zawartośd w html, by nie nadpisywały się nam nowe wyniki wyszukiwania do starych wyszukiwao. Stare są zerowane! 

# fetchSearchMovies 
– wywołanie wpisanej wartości w input (searchQuery.value, 1).

# paginacja 
(nowa instancja, żeby miała nowe odświeżone informacje)

# pagination.on 
zdarzenie, które jest kiedy paginacja jest włączona.

# fetch
, który zwraca nam wyniki wyszukiwania dla rendera, który będzie się za chwilę dział -> renderFilm(response)

# addEventListener(‘submit’) 
dajemy nasłuchiwanie na form.





            opracowano na podbudowie 
# parcel-project-template

## Zalezności

Na komputerze musi być zainstalowana LTS-wersja [Node.js](https://nodejs.org/en/).

## Przed rozpoczęciem pracy

Jeden raz na projekt zainstalować wszystkie zalezności.

```shell
npm ci
```

### Praca

Włączyć tryb pracy.

```shell
npm run dev or npm start
```

W przeglądarce przejść na [http://localhost:1234](http://localhost:1234).

### Deploy

Kod będzie automatycznie się zbierać i robić deploy aktualnej wersji projektu 
na GitHub Pages, w gałąź `gh-pages`, za kazdym razem jeśli zostaną wprowadzone zmiany w `main`. Na przykład, po bezpośrenim push lub po przyjęciu pull-request. Aby to działało musimy w pliku `package.json` zmienić pole `homepage` i skrypt
`build`, zmieniając `nazwe_uzytkownika` i `nazwe_repozytorium` na swoje.

```json
"homepage": "https://nazwa_uzytkownika.github.io/nazwa_repozytorium",
"scripts": {
  "build": "parcel build src/*.html --public-url /nazwa_repozytorium/"
},
```

Po jakimś czasie stronę mozna będzie zobaczyć na zywo pod adresem który 
jest wpisany w poprawione właściwości `homepage`, na przykład
[https://goitacademy.github.io/parcel-project-template](https://goitacademy.github.io/parcel-project-template).

## Pliki i folderzy

- Wszystkie partials plików styłów powinny być w folderze `src/sass` i importować się w
  `src/sass/main.scss`
- Zdjęcia dodawajcie w folder `src/images`, przed tym zoptymizujcie te zdjęcia które dodajecie. Program po prostu 
  kopiuje wykorzystane zdjęcia aby system nie musiał optymizować je, bo na słabych komputerach 
  to moze zająć duzo czasu.
