(ns stock-project.class-room-3)

; Keyword
; :backpack ;tshirt
(def stock {:backpack 10, :t-shirt 5})

(println "We have" (count stock))

(println "Keys" (keys stock))

(println "Vals" (vals stock))

(println (assoc stock :door 3))

(println stock)

(println (update stock :backpack inc))

(defn remove-one
  [value]
  (println "Removing one from" value)
  (- value 1))

(println (update stock :backpack remove-one))

(println (dissoc stock :backpack))

(def request {:backpack {:quantity 2, :price 80}
              :t-shirt {:quantity 2, :price 40}})

(println request)

(def request (assoc request :key-chain {:quantity 3, :price 10}))

(println request)

(println (request :backpack))
(println (get request :backpack))
(println (get request :backpack {}))
(println (:backpack request))
(println (:backpack request {}))
(println (:quantity (:backpack request)))

(println (update-in request [:backpack :quantity] inc))

; Threading
(println (-> request
            :backpack
            :quantity))
