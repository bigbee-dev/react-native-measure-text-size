package com.reactnativemeasuretextsize

import android.annotation.SuppressLint
import android.graphics.Typeface
import android.graphics.text.LineBreaker
import android.os.Build
import android.text.Layout
import android.text.StaticLayout
import android.text.TextPaint
import android.util.TypedValue
import com.facebook.react.bridge.*
import com.facebook.react.views.text.ReactFontManager
import kotlin.math.ceil


class MeasureTextSizeModule(reactContext: ReactApplicationContext) : ReactContextBaseJavaModule(reactContext) {

  override fun getName(): String {
    return "MeasureTextSize"
  }

  @SuppressLint("WrongConstant")
  @ReactMethod
  fun heights(options: ReadableMap, promise: Promise) {
    val texts = options.getArray("texts")

    val optWidth = options.getDouble("width").toFloat()
    val width = ceil(dpToPx(optWidth)).toInt()

    val fontSize = if (options.hasKey("fontSize")) options.getDouble("fontSize").toFloat() else 14f
    val fontFamily = getString(options, "fontFamily")
    val fontWeight = getString(options, "fontWeight")
    val fontStyle = getString(options, "fontStyle")
    val style = getFontStyle(fontStyle, fontWeight)
    val paint = createTextPaint(fontSize, fontFamily, style)

    val results = Arguments.createArray()
    for (i in 0 until texts!!.size()) {
      val text = texts.getString(i)
      val spacingMultiplier = 1f
      val spacingAddition = 0f
      val includePadding = true
      val layout = if (Build.VERSION.SDK_INT < Build.VERSION_CODES.M) {
        StaticLayout(
          text,
          paint,
          width,
          Layout.Alignment.ALIGN_NORMAL,
          spacingMultiplier,
          spacingAddition,
          includePadding
        )
      } else {
        val breakStrategy = if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.Q) LineBreaker.BREAK_STRATEGY_HIGH_QUALITY else 0
        StaticLayout.Builder.obtain(text!!, 0, text.length, paint, width)
          .setAlignment(Layout.Alignment.ALIGN_NORMAL)
          .setLineSpacing(spacingAddition, spacingMultiplier)
          .setIncludePad(includePadding)
          .setBreakStrategy(breakStrategy)
          .setHyphenationFrequency(Layout.HYPHENATION_FREQUENCY_NORMAL)
          .build()
      }
      results.pushInt(ceil(pxToDp(layout.height)).toInt())
    }

    promise.resolve(results)
  }

  private fun createTextPaint(fontSize: Float, fontFamily: String?, style: Int): TextPaint {
    val paint = TextPaint(TextPaint.ANTI_ALIAS_FLAG)
    paint.textSize = spToPx(fontSize)
    paint.typeface = getFont(fontFamily, style)
    return paint
  }

  private fun getFont(
    family: String?,
    style: Int
  ): Typeface {
    val typeface = if (family != null) ReactFontManager.getInstance().getTypeface(family, style, reactApplicationContext.assets) else null
    return typeface ?: Typeface.defaultFromStyle(style)
  }

  private fun getFontStyle(fontStyle: String?, fontWeight: String?): Int {
    var style = if ("italic" == fontStyle) Typeface.ITALIC else Typeface.NORMAL
    if (fontWeight != null) {
      when (fontWeight) {
        "bold", "900", "800", "700", "600", "500" -> style = style or Typeface.BOLD
      }
    }
    return style
  }

  private fun getString(options: ReadableMap, key: String): String? =
    if (options.hasKey(key)) options.getString(key) else null

  private fun dpToPx(dip: Float): Float =
    TypedValue.applyDimension(TypedValue.COMPLEX_UNIT_DIP, dip, reactApplicationContext.resources.displayMetrics)

  private fun spToPx(sp: Float): Float =
    TypedValue.applyDimension(TypedValue.COMPLEX_UNIT_SP, sp, reactApplicationContext.resources.displayMetrics)

  private fun pxToDp(px: Int): Float =
    px / reactApplicationContext.resources.displayMetrics.density
}
