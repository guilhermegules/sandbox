package br.edu.dio.studentapproval

import android.graphics.Color
import androidx.appcompat.app.AppCompatActivity
import android.os.Bundle
import kotlinx.android.synthetic.main.activity_main.*

class MainActivity : AppCompatActivity() {
    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContentView(R.layout.activity_main)

        val calculationButton = calculate
        val result = result

        calculationButton.setOnClickListener {
            val grade1 = Integer.parseInt(grade1.text.toString())
            val grade2 = Integer.parseInt(grade2.text.toString())
            val average = (grade1 + grade2) / 2
            val missedClasses = Integer.parseInt(missedClasses.text.toString())

            if(average >= 6 && missedClasses <= 10) {
                result.text = "Aluno aprovado com a média $average e com $missedClasses faltas!"
                result.setTextColor(Color.GREEN)
            } else {
                result.text = "Aluno reprovado com a média $average e com $missedClasses faltas!"
                result.setTextColor(Color.RED)
            }
        }
    }
}