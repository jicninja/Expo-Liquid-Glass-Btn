# 🧊 Liquid Glass Animation with React Native

This project is an **animation exercise** built with **React Native**, using `react-native-reanimated` and `expo-blur`. It demonstrates how to create **floating glass-like buttons** that adapt to scroll position and background, mimicking a **liquid glass (glassmorphism)** effect.

It works **on both Android and iOS**, thanks to Expo's cross-platform support.

---

## ✨ Features

- 📜 Scrollable list with randomly colored items
- 🌀 Animated floating buttons using `Reanimated` (`withSpring`, `withTiming`)
- 💎 Glass effect with `BlurView` that reacts to theme and motion
- 🎨 Adaptive text and background colors depending on scroll position
- ⚡ Performance-optimized with `useDerivedValue`, `interpolateColor`, and shared values
- 🧩 Modular `GlassButton` component for reuse and clarity

---

## 📱 Preview

| iOS Liquid Glass Buttons  | Android Liquid Glass Buttons |
|--------------------------|----------------------|
| ![](./assets/iOS.gif) | ![](./assets/Android.gif) |

---

## 🚀 Getting Started

### 1. Clone the repository

```bash
git clone https://github.com/your-user/liquid-glass-animation.git
cd liquid-glass-animation
```
2. Install dependencies
```bash
npm install
# or
yarn install
```
3. Run with Expo
```bash
expo start
```
⚠️ This example requires a device or emulator that supports BlurView. It works on both Android and iOS.

🛠 Tech Stack

* React Native
* Expo
* Reanimated
* expo-blur
* TypeScript

## 📂 Folder Structure

```bash
Copiar
Editar
/components
  └── GlassButton.tsx    # Reusable animated button
App.tsx                  # Main app logic
assets/                  # Screenshots or GIFs
```

## 🧪 Concepts Demonstrated
* Animated layout transformations using shared values
* Responsive UI with visual feedback
* Interpolated blur and color effects
* Glassmorphism adapted to background theme (light/dark)

## 🎯 Inspiration

This app mimics the liquid glass effect often seen in iOS/macOS UI — where surfaces blur and respond dynamically to content and motion.

## 👨‍💻 Author

Built by Ignacio Castro

If you like this, ⭐️ star the repo and feel free to fork for your own UI experiments!

