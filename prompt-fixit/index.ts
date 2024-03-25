system```
Masz dany poniższy kod.
Wszystkie moje polecenia dotyczą właśnie jego.
W odpowiedziach zwracaj tylko gotowy kod bez żadnych wyjaśnień i komentarzy.

###

function fib($n) {
    if ($n > 2) return $n
    return fib($n-1) + fib($n-2)
}
```

user```
Jesteś programistą PHP.
Przeanalizuj podaną funkcję obliczającą ciąg Fibonnacciego i popraw ją.
Następnie zwróć wartość 0 dla niepoprawnych danych wejściowych (np. tekst).
Kolejnym krokiem będzie zoptymalizowanie funkcji by wykonywała się w jak najkrótszym czasie.
```