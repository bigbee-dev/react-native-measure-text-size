package com.reactnativemeasuretextsize

import android.graphics.Paint
import android.graphics.Typeface
import android.text.TextPaint
import android.text.style.MetricAffectingSpan

class CustomTypefaceSpan(private val typeface: Typeface) : MetricAffectingSpan() {
  override fun updateDrawState(ds: TextPaint) {
    applyCustomTypeFace(ds, typeface)
  }

  override fun updateMeasureState(paint: TextPaint) {
    applyCustomTypeFace(paint, typeface)
  }

  companion object {
    private fun applyCustomTypeFace(paint: Paint, tf: Typeface) {
      paint.typeface = tf
    }
  }
}
