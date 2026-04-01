import Foundation
import SwiftUI

struct RGBColor {
    var r: Int
    var g: Int
    var b: Int
}

enum ColorUtils {
    static func hslToRgb(h: Double, s: Double, l: Double) -> RGBColor {
        let sat = s / 100.0
        let light = l / 100.0

        func k(_ n: Double) -> Double { (n + h / 30.0).truncatingRemainder(dividingBy: 12.0) }
        let a = sat * min(light, 1 - light)

        func f(_ n: Double) -> Double {
            light - a * max(-1, min(k(n) - 3, min(9 - k(n), 1)))
        }

        let r = Int((255 * f(0)).rounded())
        let g = Int((255 * f(8)).rounded())
        let b = Int((255 * f(4)).rounded())
        return RGBColor(r: r, g: g, b: b)
    }

    static func rgbToHex(_ rgb: RGBColor) -> String {
        String(format: "#%02X%02X%02X", rgb.r, rgb.g, rgb.b)
    }

    static func rgbToHsl(r: Double, g: Double, b: Double) -> (h: Double, s: Double, l: Double) {
        let rp = r / 255.0
        let gp = g / 255.0
        let bp = b / 255.0

        let maxValue = max(rp, max(gp, bp))
        let minValue = min(rp, min(gp, bp))
        let delta = maxValue - minValue

        var h: Double = 0
        let l = (maxValue + minValue) / 2.0

        if delta != 0 {
            let s = delta / (1 - abs(2 * l - 1))

            if maxValue == rp {
                h = 60 * ((gp - bp) / delta).truncatingRemainder(dividingBy: 6)
            } else if maxValue == gp {
                h = 60 * (((bp - rp) / delta) + 2)
            } else {
                h = 60 * (((rp - gp) / delta) + 4)
            }

            if h < 0 { h += 360 }
            return (h: h, s: s * 100, l: l * 100)
        }

        return (h: 0, s: 0, l: l * 100)
    }

    static func hexToHsl(_ hex: String) -> (h: Double, s: Double, l: Double)? {
        let value = hex.replacingOccurrences(of: "#", with: "")
        guard value.count == 6, let intValue = Int(value, radix: 16) else {
            return nil
        }

        let r = Double((intValue >> 16) & 0xFF)
        let g = Double((intValue >> 8) & 0xFF)
        let b = Double(intValue & 0xFF)
        return rgbToHsl(r: r, g: g, b: b)
    }
}

extension Color {
    static func fromHsl(h: Double, s: Double, l: Double) -> Color {
        let rgb = ColorUtils.hslToRgb(h: h, s: s, l: l)
        return Color(red: Double(rgb.r) / 255.0, green: Double(rgb.g) / 255.0, blue: Double(rgb.b) / 255.0)
    }
}
