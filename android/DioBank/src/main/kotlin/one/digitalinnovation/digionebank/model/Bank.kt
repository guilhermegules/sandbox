package one.digitalinnovation.digionebank.model

/**
 * We use this like a data class because we need this class only for move data
 * Class bank will be used for make the data of the our banks immutable
 */
data class Bank(val name: String, val number: Int) {
    fun info() = "$name - $number"
}
