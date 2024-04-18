#lang racket

(define (duplicate lst)
  (if (null? lst)'()
      (append (list (car lst) (car lst)) (duplicate (cdr lst)))))

(define (positives lst)
  (cond
    ((null? lst) '())
    ((positive? (car lst)) (cons (car lst) (positives (cdr lst))))
    (else (positives (cdr lst)))))

(define (list-of-symbols? lst)
  (cond
    ((null? lst) #t)
    ((not (symbol? (car lst))) #f)
    (else (list-of-symbols? (cdr lst)))))

(define (swapper a b lst)
  (cond
    ((null? lst) '())
    ((equal? a (car lst)) (cons b (swapper a b (cdr lst))))
    ((equal? b (car lst)) (cons a (swapper a b (cdr lst))))
    (else (cons (car lst) (swapper a b (cdr lst))))))

(define (dot-product a b)
  (if (and (null? a) (null? b))
      0
      (+ (* (car a) (car b)) (dot-product (cdr a) (cdr b)))))