(ns stock-project.class-room)

(defn discount-value
  "Return the value with discount of 10% of raw value"
  [apply? raw-value]
  (if (apply? raw-value)
    (let [discount-tax (/ 10 100)
          discount (* raw-value discount-tax)]
      (- raw-value discount))
    raw-value))

(println (discount-value apply-discount? 1000))

; PREDICATE
;(defn apply-discount?
;  [raw-value]
;  (if (> raw-value 100)
;    true
;    false))

;(defn apply-discount?
;  [raw-value]
;  (when (> raw-value 100)
;    true))

(defn apply-discount?
    [raw-value]
    (> raw-value 100))


(println (discount-value apply-discount? 1000))
(println (discount-value (fn [raw-value] (> raw-value 100)) 1000))
(println (discount-value (fn [v] (> v 100)) 1000))
(println (discount-value #(> %1 100) 1000))
(println (discount-value #(> % 100) 1000))
