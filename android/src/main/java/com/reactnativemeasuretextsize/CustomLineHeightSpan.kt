package com.reactnativemeasuretextsize

import android.graphics.Paint.FontMetricsInt
import android.text.style.LineHeightSpan
import com.facebook.react.views.text.ReactSpan
import kotlin.math.ceil
import kotlin.math.floor
import kotlin.math.min

/**
 * We use a custom [LineHeightSpan], because `lineSpacingExtra` is broken. Details here:
 * https://github.com/facebook/react-native/issues/7546
 */
class CustomLineHeightSpan(height: Float) : LineHeightSpan, ReactSpan {
  private val mHeight: Int = ceil(height.toDouble()).toInt()
  override fun chooseHeight(
    text: CharSequence, start: Int, end: Int, spanstartv: Int, v: Int, fm: FontMetricsInt
  ) {
    // This is more complicated that I wanted it to be. You can find a good explanation of what the
    // FontMetrics mean here: http://stackoverflow.com/questions/27631736.
    // The general solution is that if there's not enough height to show the full line height, we
    // will prioritize in this order: descent, ascent, bottom, top
    when {
        fm.descent > mHeight -> {
          // Show as much descent as possible
          fm.descent = min(mHeight, fm.descent)
          fm.bottom = fm.descent
          fm.ascent = 0
          fm.top = fm.ascent
        }
        -fm.ascent + fm.descent > mHeight -> {
          // Show all descent, and as much ascent as possible
          fm.bottom = fm.descent
          fm.ascent = -mHeight + fm.descent
          fm.top = fm.ascent
        }
        -fm.ascent + fm.bottom > mHeight -> {
          // Show all ascent, descent, as much bottom as possible
          fm.top = fm.ascent
          fm.bottom = fm.ascent + mHeight
        }
        -fm.top + fm.bottom > mHeight -> {
          // Show all ascent, descent, bottom, as much top as possible
          fm.top = fm.bottom - mHeight
        }
        else -> {
          // Show proportionally additional ascent / top & descent / bottom
          val additional = mHeight - (-fm.top + fm.bottom)

          // Round up for the negative values and down for the positive values  (arbitrary choice)
          // So that bottom - top equals additional even if it's an odd number.
          fm.top -= ceil((additional / 2.0f).toDouble()).toInt()
          fm.bottom += floor((additional / 2.0f).toDouble()).toInt()
          fm.ascent = fm.top
          fm.descent = fm.bottom
        }
    }
  }

}
