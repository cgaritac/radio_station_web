# Radio Station Web Platform

A premium, modern, and feature-rich web application designed for community-focused radio stations. This platform provides a seamless listening experience with a sleek aesthetic, emphasizing values, community engagement, and high-quality broadcasting.

## 🌟 Features

- **Live Stream Player**: A robust audio player with real-time streaming capabilities, volume control, and intuitive playback management.
- **Multilingual Support**: Fully localized in multiple languages (English and Spanish) to reach a diverse audience.
- **Modern UI/UX**: Crafted with a premium design aesthetic using Tailwind CSS, ensuring responsiveness across all devices.
- **Broadcast Schedule**: Keep your audience informed with a dynamic daily and weekly programming schedule.
- **Content Hub**: Dedicated sections for News and Blog posts to share updates and stories.
- **Values-Based Content**: Includes specialized sections for educational "Studies" and community-focused series.

## 🛠️ Technical Highlights

- **Angular 21+**: Built using the latest Angular features for peak performance and maintainability.
- **Signals-Based State Management**: Leveraging Angular Signals (`signal`, `computed`, `effect`) for reactive and efficient state handling.
- **Standalone Architecture**: 100% standalone components, promoting modularity and reducing boilerplate.
- **Modern Control Flow**: Utilizing the new `@if`, `@for`, and `@switch` syntax for cleaner templates.
- **Optimal Performance**: Implements `ChangeDetectionStrategy.OnPush` across all components.
- **Tailwind CSS 4.0**: Styling powered by the latest Tailwind utility-first framework for rapid and consistent design.

## 🚀 Tech Stack

- **Framework**: [Angular](https://angular.io/) (Latest Version)
- **Styling**: [Tailwind CSS](https://tailwindcss.com/)
- **State Management & Logic**: RxJS
- **Internationalization**: [NGX-Translate](http://www.ngx-translate.com/)
- **Icons**: Angular SVG Icon

## 🛠️ Getting Started

### Prerequisites

- Node.js (Latest LTS recommended)
- Yarn or NPM

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/your-username/radio-station-web.git
   ```
2. Navigate to the project directory:
   ```bash
   cd radio-station-web
   ```
3. Install dependencies:
   ```bash
   yarn install
   # or
   npm install
   ```

### Development Server

Run the following command to start the development server:

```bash
yarn dev
# or
npm run dev
```

The application will be available at `http://localhost:4200/`.

## 📦 Building for Production

To create a production-ready bundle, run:

```bash
yarn build
# or
npm run build
```

The build artifacts will be stored in the `dist/` directory.

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

_Designed for stations that inspire and connect._
