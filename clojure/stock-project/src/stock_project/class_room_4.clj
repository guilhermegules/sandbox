(ns stock-project.class-room-4)

(def request {:backpack {:quantity 2, :price 80}
              :t-shirt {:quantity 2, :price 40}})

; Destruct of key/value collection
(defn print-with-value [[key value]]
  (println key "<and>" value)
  value)

(println (map print-with-value request))

(defn products-price
  [[_ value]]
  (* (:quantity value) (:price value)))

(println (map products-price request))
(println (reduce + (map products-price)))

;(defn total [request]
;  (reduce + (map products-price request)))

; Thread last
(defn total
  [request]
  (->> request
      (map products-price)
      (reduce +)))

(println (total request))

(def request {:backpack {:quantity 2, :price 80}
              :t-shirt {:quantity 2, :price 40}
              :key-chain {:quantity 1}})

(defn free?
  [item]
  (<= (get item :price 0) 0))

(println (filter free? (vals request)))

(println (filter (fn [[key item]] (free? item)) request))

(println (filter #(free? (second %)) request))

(defn payed?
  [item]
  (not (free? item)))

(println (payed? {:test {:price 50}}))
(println (payed? {:test {:price 0}}))

(def payed-comp? (comp not free?))

(println (payed-comp? {:test {:price 50}}))
(println (payed-comp? {:test {:price 0}}))