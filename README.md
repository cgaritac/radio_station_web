# Radio Station Web Platform

A high-performance, modern, and feature-rich web application designed for professional radio stations and community broadcasting. Built with the latest technologies, this platform delivers a premium listening experience with integrated content management and community engagement tools.

---

## Vision

To provide radio stations with a robust, scalable, and aesthetically superior digital presence. This platform is engineered for high performance, accessibility, and a seamless user experience across mobile, tablet, and desktop devices.

## Core Features

### Seamless Audio Experience

- **Advanced Live Stream Player**: Custom-built audio engine supporting real-time HLS/Icecast streams with metadata synchronization.
- **Broadcast History**: Automated "Recently Played" tracking to keep listeners engaged with the station's playlist history.
- **Dynamic Programming Schedule**: Comprehensive weekly schedule management, allowing listeners to browse daily shows and upcoming events.

### Integrated Content Management

- **Dynamic Content Hub**: Robust sections for News, Blog posts, and Biblical/Educational Studies.
- **SEO-Optimized Detail Pages**: Dynamic routing (/:type/:id) for deep-linking and search engine visibility.
- **Multilingual Support (i18n)**: Full localization support for English and Spanish, easily extensible to any language.

### Community and Engagement

- **Prayer Request System**: A dedicated, user-friendly interface for community members to submit requests.
- **Contact Center**: Professional inquiry forms integrated with EmailJS for instant communication without a backend.
- **Sponsors Showcase**: Dedicated space to feature partners, sponsors, and community supporters with premium styling.
- **Daily Inspiration**: "Verse of the Day" feature with local storage caching for optimal performance.

### Visual & Interactive Content

- **Virtual Studio Tour**: Interactive showcase of the station's facilities and broadcast environment.
- **Team & Voices Showcase**: Dedicated profiles for presenters, DJs, and staff members.
- **Live Video Integration**: Integrated YouTube Live streaming capabilities for hybrid broadcasts.

### Technical Excellence

- **Angular 21+ Architecture**: Built using the absolute latest features of the Angular ecosystem.
- **Reactive State Management**: 100% Signal-based logic for efficient, granular updates.
- **Tailwind CSS 4.0 Styling**: Powered by the newest utility-first framework for a fast, responsive, and maintainable design system.
- **Modern Control Flow**: Utilizing @if, @for, and @switch for clean and readable templates.
- **OnPush Change Detection**: Maximized performance across all components.

---

## Project Architecture

This project follows a Feature-Driven Architecture, promoting high modularity and scalability.

```text
src/app/
├── Core/          # Global singletons (Guards, Interceptors, Global Services)
├── Features/      # Domain-specific logic (Player, Schedule, History, Verse)
├── Shared/        # Reusable UI components, pipes, and directives
├── Pages/         # Routed views and page-level orchestration
└── Layout/        # Application shell (Header, Footer, Navigation)
```

## Tech Stack

- **Framework**: Angular 21
- **Styling**: Tailwind CSS 4.0
- **Logical Streams**: Angular Signals & RxJS
- **Internationalization**: NGX-Translate
- **Email Engine**: EmailJS
- **Icons**: Angular SVG Icon
- **Unit Testing**: Vitest 4.0

---

## Configuration and Setup

The application uses environment variables for easy configuration across different environments, powered by `@ngx-env/builder`.

### Environment Variables (.env)

Create a .env file in the root directory. Below is the complete list of required variables:

```env
# Radio Configuration
NG_APP_RADIO_NAME="Your Radio Station"
NG_APP_STREAM_URL=https://stream.your-station.com/live
NG_APP_METADATA_URL=https://api.your-station.com/metadata
NG_APP_HISTORY_URL=https://api.your-station.com/history

# Bible Verse API
NG_APP_BIBLE_GATEWAY_URL=https://www.biblegateway.com/votd/get/
NG_APP_BIBLE_GATEWAY_HOME_URL=https://www.biblegateway.com

# YouTube Integration
NG_APP_YOUTUBE_CHANNEL_ID=your_channel_id
NG_APP_YOUTUBE_UPLOADS_PLAYLIST_ID=your_playlist_id
NG_APP_CORS_PROXY_URL=https://api.allorigins.win/get?url=
NG_APP_YOUTUBE_EMBED_URL=https://www.youtube.com/embed
NG_APP_YOUTUBE_THUMBNAIL_URL=https://img.youtube.com/vi
NG_APP_YOUTUBE_FEEDS_URL=https://www.youtube.com/feeds/videos.xml?channel_id=

# Social Media Links
NG_APP_FACEBOOK_URL=https://www.facebook.com/yourstation
NG_APP_INSTAGRAM_URL=https://www.instagram.com/yourstation
NG_APP_YOUTUBE_URL=https://www.youtube.com/@yourstation
NG_APP_SPOTIFY_URL=https://open.spotify.com/show/yourshow
NG_APP_TIKTOK_URL=https://www.tiktok.com/@yourstation
NG_APP_WHATSAPP_URL=https://www.whatsapp.com/channel/your-id
NG_APP_WHATSAPP_DIRECT_URL=https://wa.me/yournumber
NG_APP_RADIO_BOX_URL=https://onlineradiobox.com/your-station/

# Sponsors
NG_APP_CGC_URL=https://cgarita.web.app/

# Google Maps
NG_APP_GOOGLE_MAPS_SEARCH_URL=https://www.google.com/maps/search/?api=1&query=
NG_APP_GOOGLE_MAPS_EMBED_URL=https://maps.google.com/maps?q=

# EmailJS Configuration
NG_APP__EMAILJS_SERVICE_ID=your_service_id
NG_APP__EMAILJS_PUBLIC_KEY=your_public_key
NG_APP__EMAILJS_CONTACT_TEMPLATE_ID=your_contact_template
NG_APP__EMAILJS_PRAYER_TEMPLATE_ID=your_prayer_template
```

### Installation

1.  **Clone the Repo**:
    ```bash
    git clone https://github.com/your-username/radio-station-web.git
    ```
2.  **Install Dependencies**:
    ```bash
    yarn install
    # or
    npm install
    ```

### Development

Start the development server:

```bash
yarn dev
```

The app will be available at http://localhost:4200/.

---

## Deployment

The project is optimized for deployment on platforms like Vercel or Netlify.

1.  Configure your environment variables in the deployment dashboard.
2.  Run the production build:
    ```bash
    yarn build
    ```
3.  The build artifacts will be located in the dist/ directory.

---

## Content Management Guide

To add new content (News, Blog, or Studies):

1.  Add the item to the corresponding JSON or Service providing the data.
2.  The application will automatically generate the detail page via the dynamic route :type/:id.
3.  Ensure images are placed in public/assets/ or provided via a valid external URL.

---

## License

This project is licensed under the MIT License - see the LICENSE file for details.

---

_Designed for stations that inspire and connect._
