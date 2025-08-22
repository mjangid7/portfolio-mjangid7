# Portfolio Website - Mukund Jangid

A modern, responsive portfolio website for Mukund Jangid - Technical Product Manager & AI Strategist.

## 🚀 Features

- **Modern Design**: Clean, professional layout with smooth animations
- **Responsive**: Optimized for all device sizes
- **Three Theme System**: Light, Blue Light Filter (60% reduction), and Dark modes
- **Performance Optimized**: Fast loading with optimized assets
- **SEO Friendly**: Structured data and meta tags
- **GitHub Pages Ready**: Automated deployment via GitHub Actions

## 📁 Project Structure

```
portfolio-mjangid7/
├── index.html                 # Main HTML file
├── README.md                  # Project documentation
├── .gitignore                # Git ignore rules
├── assets/                   # Static assets
│   ├── css/
│   │   └── styles.css        # Main stylesheet with three-theme system
│   ├── js/
│   │   └── script.js         # JavaScript functionality and theme management
│   └── images/
│       ├── self.jpeg         # Profile image
│       └── logos/            # Company logos
│           ├── 3ds_logo.png
│           ├── albert_logo.png
│           ├── cg_logo.png
│           ├── lifebit_logo.png
│           ├── mc_logo.png
│           ├── medidata_logo.png
│           ├── morgan_logo.png
│           └── vertex_logo.png
├── docs/                     # Documentation and backup files
│   ├── backup-index.html     # Backup HTML file
│   ├── linkedin-data-template.md
│   └── mukund jangid.pdf     # Resume/CV
├── .github/
│   └── workflows/
│       └── deploy.yml        # GitHub Actions deployment
└── .vscode/                  # VS Code settings
```

## 🎨 Themes

The portfolio features a comprehensive three-theme system:

1. **Light Mode**: Professional appearance for regular viewing
2. **Blue Light Filter**: 60% blue light reduction with warm amber tones for extended viewing sessions
3. **Dark Mode**: Easy on the eyes for low-light environments

## 🛠️ Technologies Used

- **Frontend**: HTML5, CSS3, JavaScript (ES6+)
- **Frameworks**: Vanilla JavaScript (no dependencies)
- **Icons**: Font Awesome 6.4.0
- **Fonts**: Inter (Google Fonts)
- **Animations**: Custom CSS animations and transitions
- **Deployment**: GitHub Pages with automated GitHub Actions

## 📱 Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## 🚀 Getting Started

### Local Development

1. Clone the repository:
   ```bash
   git clone https://github.com/mjangid7/portfolio-mjangid7.git
   cd portfolio-mjangid7
   ```

2. Open `index.html` in your browser or use a local server:
   ```bash
   # Using Python
   python -m http.server 8000
   
   # Using Node.js
   npx serve .
   ```

3. Navigate to `http://localhost:8000`

### GitHub Pages Deployment

The site automatically deploys to GitHub Pages when changes are pushed to the `main` branch via GitHub Actions.

## 🔧 Customization

### Updating Content

1. **Personal Information**: Edit the content in `index.html`
2. **Styling**: Modify `assets/css/styles.css`
3. **Functionality**: Update `assets/js/script.js`
4. **Images**: Replace files in `assets/images/`

### Adding New Company Logos

1. Add logo PNG files to `assets/images/logos/`
2. Update the HTML in the companies section with the new logo path
3. Add corresponding company information and links

### Theme Customization

The three-theme system is managed in `assets/css/styles.css` using CSS custom properties:

```css
[data-theme="light"] { /* Light theme variables */ }
[data-theme="blue-filter"] { /* Blue light filter theme */ }
[data-theme="dark"] { /* Dark theme variables */ }
```

## 📊 Performance

- Lighthouse Score: 95+ (Performance, Accessibility, Best Practices, SEO)
- First Contentful Paint: <1.5s
- Largest Contentful Paint: <2.0s
- Mobile-first responsive design

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

## 📞 Contact

Mukund Jangid - [LinkedIn](https://www.linkedin.com/in/mukund-j-b01847b1/)

Project Link: [https://github.com/mjangid7/portfolio-mjangid7](https://github.com/mjangid7/portfolio-mjangid7)

---

⭐ Star this repo if you found it helpful!
