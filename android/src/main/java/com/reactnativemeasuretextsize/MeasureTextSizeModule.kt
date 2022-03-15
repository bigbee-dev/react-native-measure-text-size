package com.reactnativemeasuretextsize

import android.annotation.SuppressLint
import android.graphics.Typeface
import android.graphics.text.LineBreaker
import android.os.Build
import android.text.Layout
import android.text.Spannable.SPAN_INCLUSIVE_INCLUSIVE
import android.text.SpannableStringBuilder
import android.text.StaticLayout
import android.text.TextPaint
import android.text.style.AbsoluteSizeSpan
import android.util.Log
import com.facebook.react.bridge.*
import com.facebook.react.uimanager.PixelUtil
import com.facebook.react.views.text.ReactFontManager
import kotlin.math.ceil


class MeasureTextSizeModule(reactContext: ReactApplicationContext) :
  ReactContextBaseJavaModule(reactContext) {
  private val tag = "MText"
  private val spacingMultiplier = 1.0f
  private val spacingAddition = 0f

  override fun getName(): String {
    return "MeasureTextSize"
  }

  @SuppressLint("WrongConstant")
  @ReactMethod
  fun heights(options: ReadableMap, promise: Promise) {

    val texts = options.getArray("texts")

    val optWidth = options.getDouble("width").toFloat()
    val width = ceil(dpToPx(optWidth)).toInt()
    Log.i(tag, "optW: $optWidth, width: $width")

    val fontSize = if (options.hasKey("fontSize")) options.getDouble("fontSize").toFloat() else 14f
    val lineHeight =
      if (options.hasKey("lineHeight")) options.getDouble("lineHeight")
        .toFloat() else null
    val fontFamily = getString(options, "fontFamily")
    val fontWeight = getString(options, "fontWeight")
    val fontStyle = getString(options, "fontStyle")
    val style = getFontStyle(fontStyle, fontWeight)
    val typeface = getFont(fontFamily, style)
    val paint = createTextPaint(fontSize, typeface)

    val results = Arguments.createArray()
    for (i in 0 until texts!!.size()) {
      val text = texts.getString(i)!!
      val end = text.length
      val spannable = SpannableStringBuilder(text)
      spannable.setSpan(
        AbsoluteSizeSpan(ceil(spToPx(fontSize)).toInt(), false),
        0,
        end,
        SPAN_INCLUSIVE_INCLUSIVE
      )
      if (lineHeight != null) {
        spannable.setSpan(
          CustomLineHeightSpan(spToPx(lineHeight)),
          0, end, SPAN_INCLUSIVE_INCLUSIVE
        )
      }
      if (fontFamily != null) {
        spannable.setSpan(
          CustomTypefaceSpan(typeface),
          0, end, SPAN_INCLUSIVE_INCLUSIVE
        )
      }
      val includePadding = false
      val layout = if (Build.VERSION.SDK_INT < Build.VERSION_CODES.M) {
        StaticLayout(
          spannable,
          paint,
          width,
          Layout.Alignment.ALIGN_NORMAL,
          spacingMultiplier,
          spacingAddition,
          includePadding
        )
      } else {
        val breakStrategy =
          if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.Q) LineBreaker.BREAK_STRATEGY_HIGH_QUALITY else 0
        var builder =
          StaticLayout.Builder.obtain(spannable, 0, text.length, paint, width)
            .setIndents(null, null)
            .setAlignment(Layout.Alignment.ALIGN_NORMAL)
            .setLineSpacing(spacingAddition, spacingMultiplier)
            .setIncludePad(includePadding)
            .setBreakStrategy(breakStrategy)
            .setHyphenationFrequency(Layout.HYPHENATION_FREQUENCY_FULL)
        if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.P) {
          builder = builder.setUseLineSpacingFromFallbacks(true)
        }
        builder.build()
      }

      Log.i(tag, "line count: ${layout.lineCount}")
      results.pushInt(ceil(pxToDp(layout.height)).toInt())
    }

    promise.resolve(results)
  }

  private fun createTextPaint(fontSize: Float, typeface: Typeface): TextPaint {
    val paint = TextPaint(TextPaint.ANTI_ALIAS_FLAG)
    paint.textSize = ceil(spToPx(fontSize))
    paint.typeface = typeface
    return paint
  }

  private fun getFont(
    family: String?,
    style: Int
  ): Typeface {
    val typeface = if (family != null) ReactFontManager.getInstance()
      .getTypeface(family, style, reactApplicationContext.assets) else null
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
    PixelUtil.toPixelFromDIP(dip)

  private fun spToPx(sp: Float): Float =
    PixelUtil.toPixelFromSP(sp)

  private fun pxToDp(px: Int): Float =
    PixelUtil.toDIPFromPixel(px.toFloat())
}
