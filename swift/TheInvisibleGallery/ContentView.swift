import SwiftUI

struct ContentView: View {
    @State private var hue: Double = 224
    @State private var saturation: Double = 94
    @State private var lightness: Double = 48
    @State private var history: [String] = [
        "#FF5722", "#00BCD4", "#7C4DFF", "#FFC107", "#00E676",
        "#FF5252", "#E0E0E0", "#212121"
    ]
    @State private var savedPalettes: [[String]] = []

    private var rgb: RGBColor {
        ColorUtils.hslToRgb(h: hue, s: saturation, l: lightness)
    }

    private var hex: String {
        ColorUtils.rgbToHex(rgb)
    }

    private var lightVariant: Color {
        Color.fromHsl(h: hue, s: saturation, l: min(lightness + 20, 100))
    }

    private var deepVariant: Color {
        Color.fromHsl(h: hue, s: saturation, l: max(lightness - 20, 0))
    }

    var body: some View {
        ScrollView {
            VStack(spacing: 20) {
                header
                colorWheelCard
                hslSection
                rgbSection
                activePaletteSection
                historySection
                saveSection
            }
            .padding()
        }
        .background(Color(red: 0.96, green: 0.97, blue: 0.98))
        .onAppear(perform: loadSavedPalettes)
    }

    private var header: some View {
        HStack {
            VStack(alignment: .leading, spacing: 4) {
                Text("The Invisible Gallery")
                    .font(.headline.weight(.bold))
                    .foregroundStyle(Color.blue)
                Text("Studio")
                    .font(.caption.weight(.semibold))
                    .foregroundStyle(.secondary)
            }
            Spacer()
            ShareLink(item: hex) {
                Label("Export", systemImage: "square.and.arrow.up")
                    .font(.subheadline.weight(.bold))
                    .padding(.horizontal, 14)
                    .padding(.vertical, 8)
                    .background(Color.blue)
                    .foregroundStyle(.white)
                    .clipShape(Capsule())
            }
        }
    }

    private var colorWheelCard: some View {
        VStack(spacing: 16) {
            Text("Studio Palette")
                .font(.title2.weight(.bold))

            ZStack {
                Circle()
                    .stroke(
                        AngularGradient(
                            gradient: Gradient(colors: [.red, .yellow, .green, .cyan, .blue, .purple, .red]),
                            center: .center
                        ),
                        lineWidth: 28
                    )
                    .frame(width: 220, height: 220)

                VStack(spacing: 10) {
                    Circle()
                        .fill(Color.fromHsl(h: hue, s: saturation, l: lightness))
                        .frame(width: 70, height: 70)
                        .shadow(radius: 6)
                    Text(hex)
                        .font(.title3.weight(.heavy))
                }

                Circle()
                    .strokeBorder(.black, lineWidth: 2)
                    .background(Circle().fill(Color.white))
                    .frame(width: 14, height: 14)
                    .offset(x: 95)
                    .rotationEffect(.degrees(hue - 90))
            }
            .padding(.vertical, 8)
        }
        .padding(20)
        .background(.white)
        .clipShape(RoundedRectangle(cornerRadius: 28, style: .continuous))
    }

    private var hslSection: some View {
        VStack(alignment: .leading, spacing: 16) {
            Text("HSL Precision")
                .font(.caption.weight(.bold))
                .foregroundStyle(.secondary)

            sliderRow(label: "Hue", value: $hue, range: 0...360, suffix: "°")
            sliderRow(label: "Saturation", value: $saturation, range: 0...100, suffix: "%")
            sliderRow(label: "Lightness", value: $lightness, range: 0...100, suffix: "%")
        }
        .padding(20)
        .background(.white.opacity(0.8))
        .clipShape(RoundedRectangle(cornerRadius: 24, style: .continuous))
    }

    private var rgbSection: some View {
        VStack(alignment: .leading, spacing: 12) {
            Text("RGB Channels")
                .font(.caption.weight(.bold))
                .foregroundStyle(.secondary)

            rgbRow(channel: "R", value: rgb.r, color: .red)
            rgbRow(channel: "G", value: rgb.g, color: .green)
            rgbRow(channel: "B", value: rgb.b, color: .blue)
        }
        .padding(20)
        .background(.white.opacity(0.8))
        .clipShape(RoundedRectangle(cornerRadius: 24, style: .continuous))
    }

    private var activePaletteSection: some View {
        VStack(alignment: .leading, spacing: 12) {
            Text("Active Palette")
                .font(.headline.weight(.bold))

            HStack(spacing: 10) {
                RoundedRectangle(cornerRadius: 20)
                    .fill(Color.fromHsl(h: hue, s: saturation, l: lightness))
                    .frame(height: 140)

                VStack(spacing: 10) {
                    RoundedRectangle(cornerRadius: 18)
                        .fill(lightVariant)
                        .frame(height: 65)
                    RoundedRectangle(cornerRadius: 18)
                        .fill(deepVariant)
                        .frame(height: 65)
                }
            }

            HStack(spacing: 8) {
                ForEach([15, 30, 45, 60], id: \.self) { offset in
                    RoundedRectangle(cornerRadius: 12)
                        .fill(Color.fromHsl(h: (hue + Double(offset)).truncatingRemainder(dividingBy: 360), s: saturation, l: lightness))
                        .frame(height: 48)
                }
            }
        }
        .padding(20)
        .background(.white)
        .clipShape(RoundedRectangle(cornerRadius: 28, style: .continuous))
    }

    private var historySection: some View {
        VStack(alignment: .leading, spacing: 12) {
            Text("Studio History")
                .font(.caption.weight(.bold))
                .foregroundStyle(.secondary)

            LazyVGrid(columns: [GridItem(.adaptive(minimum: 44), spacing: 10)], spacing: 10) {
                ForEach(history, id: \.self) { item in
                    Circle()
                        .fill(Color(hex: item))
                        .frame(width: 44, height: 44)
                        .onTapGesture {
                            if let hsl = ColorUtils.hexToHsl(item) {
                                hue = hsl.h
                                saturation = hsl.s
                                lightness = hsl.l
                            }
                        }
                }
            }
        }
        .padding(20)
        .background(.white.opacity(0.8))
        .clipShape(RoundedRectangle(cornerRadius: 24, style: .continuous))
    }

    private var saveSection: some View {
        VStack(alignment: .leading, spacing: 12) {
            Button {
                saveCurrentPalette()
            } label: {
                Label("Save Collection", systemImage: "square.and.arrow.down")
                    .font(.subheadline.weight(.bold))
                    .frame(maxWidth: .infinity)
                    .padding(.vertical, 12)
            }
            .buttonStyle(.borderedProminent)

            if !savedPalettes.isEmpty {
                Text("Saved: \(savedPalettes.count)")
                    .font(.caption)
                    .foregroundStyle(.secondary)
            }
        }
        .padding(20)
        .background(.white)
        .clipShape(RoundedRectangle(cornerRadius: 24, style: .continuous))
    }

    private func sliderRow(label: String, value: Binding<Double>, range: ClosedRange<Double>, suffix: String) -> some View {
        VStack(alignment: .leading, spacing: 6) {
            HStack {
                Text(label).font(.caption.weight(.semibold))
                Spacer()
                Text("\(Int(value.wrappedValue))\(suffix)")
                    .font(.caption.weight(.bold))
            }
            Slider(value: value, in: range, step: 1)
                .tint(.blue)
        }
    }

    private func rgbRow(channel: String, value: Int, color: Color) -> some View {
        HStack {
            Text(channel)
                .font(.caption.weight(.bold))
                .frame(width: 20)
            ProgressView(value: Double(value), total: 255)
                .tint(color)
            Text("\(value)")
                .font(.caption.weight(.bold))
                .frame(width: 38, alignment: .trailing)
        }
    }

    private func saveCurrentPalette() {
        let palette = [
            hex,
            ColorUtils.rgbToHex(ColorUtils.hslToRgb(h: hue, s: saturation, l: min(lightness + 20, 100))),
            ColorUtils.rgbToHex(ColorUtils.hslToRgb(h: hue, s: saturation, l: max(lightness - 20, 0)))
        ]

        savedPalettes.append(palette)
        UserDefaults.standard.set(savedPalettes, forKey: "savedPalettes")

        if history.first != hex {
            history.insert(hex, at: 0)
            history = Array(history.prefix(20))
        }
    }

    private func loadSavedPalettes() {
        if let stored = UserDefaults.standard.array(forKey: "savedPalettes") as? [[String]] {
            savedPalettes = stored
        }
    }
}

private extension Color {
    init(hex: String) {
        let value = hex.replacingOccurrences(of: "#", with: "")
        guard value.count == 6, let intValue = Int(value, radix: 16) else {
            self = .gray
            return
        }

        let r = Double((intValue >> 16) & 0xFF) / 255.0
        let g = Double((intValue >> 8) & 0xFF) / 255.0
        let b = Double(intValue & 0xFF) / 255.0
        self = Color(red: r, green: g, blue: b)
    }
}

#Preview {
    ContentView()
}
