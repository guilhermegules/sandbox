(ns stock-project.class-room-2)

(def prices [30 700 1000])

(println (prices 0))

(println (get prices 0))

(println (get prices 1))

(println "Default value" (get prices 10 0))

(println (conj prices 5))

(println prices)

(println (+ 5 1))
(println (inc 5))
(println (update prices 0 inc))

(defn sum
  [value]
  (println "Im increasing" value)
  (inc value))

(println (update prices 0 sum))

(defn discount-value
  "Return the value with discount of 10% of raw value"
  [raw-value]
  (if (> raw-value 100)
    (let [discount-tax (/ 10 100)
          discount (* raw-value discount-tax)]
      (- raw-value discount))
    raw-value))

(defn apply-discount?
  [raw-value]
  (> raw-value 100))

(println "map" (map discount-value prices))

(println (range 10))

(println (filter even? (range 10)))

(println "filter" (filter apply-discount? prices))

(println "filter with map" (map discount-value (filter apply-discount? prices)))

(println "sum all numbers with reduce" (reduce + prices ))

(defn mySum
  [value-1, value-2]
  (println "Sum" value-1 value-2)
  (+ value-1 value-2))

(println (reduce mySum prices))
(println (reduce mySum (range 10)))
(println (reduce mySum 0 prices))