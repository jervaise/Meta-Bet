# WoW M+ Meta Tracker - TWW Season 3 🎮

A weekly prediction tracker for World of Warcraft The War Within Season 3 Mythic+ meta. Perfect for guild friends to compete and track weekly M+ predictions!

## Features ✨

### 🎯 Weekly M+ Prediction Categories
- **M+ DPS Meta**: Rank your top 3 DPS specs for high M+ keys each week
- **M+ Tank Meta**: Choose the 2 strongest tank specs for M+ weekly
- **M+ Healer Meta**: Pick the 2 best healing specs for M+ weekly  
- **Weekly Top 5**: Your top 5 M+ specs across all roles each week

### 👥 User Management
- Simple name-based login system
- User session persistence
- Individual betting history tracking
- Join date tracking

### 📊 Weekly Tracking Results
- **This Week's Predictions**: See community consensus with vote counts and average rankings for current week
- **Weekly Leaderboard**: Player rankings by prediction activity across weeks
- **Weekly History**: Complete timeline of all weekly predictions
- **Export Data**: Download all weekly results as JSON

### 📱 Responsive Design
- Mobile-first responsive design
- Touch-friendly interface
- Modern dark theme with WoW-inspired styling
- Smooth animations and transitions

### 💾 Data Persistence
- LocalStorage-based data storage
- Automatic save/load functionality
- Data export for backup
- Session management

## Getting Started 🚀

### Quick Setup
1. Download all files (`index.html`, `styles.css`, `script.js`)
2. Open `index.html` in any modern web browser
3. Enter your name and start betting!

### File Structure
```
Meta Bet/
├── index.html      # Main application file
├── styles.css      # Responsive styling
├── script.js       # Application logic
└── README.md       # This file
```

## How to Use 🎮

### 1. Login
- Enter your name (max 20 characters)
- Click "Start Betting"
- Your previous bets will be restored if you've used the site before

### 2. Make Weekly Predictions
- Navigate between M+ DPS, M+ Tank, M+ Healer, and Weekly Top 5 tabs
- Click on spec cards to select them for this week
- Selections are ranked automatically (1st, 2nd, 3rd, etc.)
- Click "Submit Weekly Prediction" to save your choices for the current week

### 3. View Weekly Results
- **This Week's Predictions**: See which specs are most popular this week
- **Weekly Leaderboard**: View player rankings across all weeks
- **Weekly History**: Browse all past weekly predictions
- **Export**: Download complete weekly data set

### 4. Weekly Features
- Update your predictions each week
- Compare your weekly picks with friends
- Track M+ meta changes over time
- Export weekly data for analysis

## Hosting Recommendations 🌐

### 🌟 **Best Options (Free)**

#### 1. **Netlify** (Recommended)
- **Why**: Best for static sites, automatic HTTPS, custom domains
- **Cost**: Free tier includes 100GB bandwidth
- **Setup**: 
  1. Create account at [netlify.com](https://netlify.com)
  2. Drag & drop your folder to deploy
  3. Get instant HTTPS URL
- **Custom Domain**: Connect your own domain easily
- **Pros**: Fast, reliable, great interface
- **Cons**: None for this use case

#### 2. **Vercel**
- **Why**: Excellent performance, simple deployment
- **Cost**: Free tier with generous limits
- **Setup**: 
  1. Sign up at [vercel.com](https://vercel.com)
  2. Import from folder or GitHub
  3. Automatic deployment
- **Pros**: Lightning fast, good analytics
- **Cons**: Slightly more complex than Netlify

#### 3. **GitHub Pages**
- **Why**: Free, integrated with version control
- **Cost**: Completely free
- **Setup**:
  1. Create GitHub repository
  2. Upload files
  3. Enable Pages in repository settings
- **Pros**: Free, version control included
- **Cons**: Requires GitHub account, public repos only (free tier)

### 💰 **Paid Options (Better Performance)**

#### 1. **Cloudflare Pages**
- **Cost**: Free tier available, paid plans from $5/month
- **Features**: Global CDN, advanced security, analytics
- **Best for**: High traffic, professional use

#### 2. **AWS S3 + CloudFront**
- **Cost**: ~$1-5/month depending on traffic
- **Features**: Enterprise-grade, highly scalable
- **Best for**: Technical users, scalable solutions

#### 3. **Google Firebase Hosting**
- **Cost**: Free tier, paid plans from $25/month
- **Features**: Google infrastructure, easy scaling
- **Best for**: Integration with other Google services

### 🎯 **Quick Deployment Guide**

#### Option 1: Netlify (Easiest)
1. Go to [netlify.com](https://netlify.com)
2. Sign up for free account
3. Drag your project folder to the deploy area
4. Get your live URL instantly!
5. Optional: Set up custom domain

#### Option 2: GitHub Pages
1. Create GitHub account
2. Create new repository named `wow-meta-predictions`
3. Upload your files
4. Go to Settings → Pages
5. Select source as "Deploy from a branch"
6. Choose "main" branch
7. Your site will be at `yourusername.github.io/wow-meta-predictions`

#### Option 3: Simple File Sharing
- **For testing**: Use Google Drive, Dropbox, or OneDrive
- **Share the HTML file**: Friends can download and open locally
- **Pros**: No setup required
- **Cons**: No shared data between users

## Technical Details 🔧

### Browser Requirements
- Modern web browser (Chrome, Firefox, Safari, Edge)
- JavaScript enabled
- LocalStorage support

### Data Storage
- Uses browser LocalStorage for data persistence
- Data is stored locally on each user's device
- Export functionality for data backup/sharing
- No server required

### Responsive Breakpoints
- Mobile: < 480px
- Tablet: 480px - 768px
- Desktop: > 768px

### Performance
- Lightweight: ~50KB total
- No external dependencies except fonts and icons
- Instant loading
- Smooth animations

## Customization 🎨

### Adding New Specs
Edit the `wowSpecs` object in `script.js`:
```javascript
const wowSpecs = {
    dps: [
        { name: 'New Spec', class: 'Class Name', icon: '🔥', role: 'melee' }
        // Add more specs here
    ]
};
```

### Styling Changes
Modify CSS variables in `styles.css`:
```css
:root {
    --primary-color: #f4c430;  /* Change main accent color */
    --bg-primary: #0f1419;     /* Change background */
    /* More variables... */
}
```

### Feature Modifications
- Max selections per category: Edit `maxSelections` in `selectSpec()` function
- Export format: Modify `exportResults()` function
- Add new betting categories: Extend the categories array and UI

## Troubleshooting 🔧

### Common Issues

**Data not saving:**
- Check if LocalStorage is enabled in browser
- Clear browser cache and try again
- Some privacy modes disable LocalStorage

**Site not working on mobile:**
- Ensure viewport meta tag is present
- Test responsive design with browser dev tools
- Check for JavaScript errors in console

**Friends can't see each other's bets:**
- This is expected - data is stored locally per device
- Consider using a shared hosting solution or simple backend
- Use export/import feature to share data

### Data Backup
- Use "Export Data" button regularly
- Save JSON files as backups
- Can import data by modifying LocalStorage in browser console

## Future Enhancements 🚀

### Possible Additions
- Real-time synchronization between users
- Admin panel for season results
- Scoring system based on actual meta
- Discord bot integration
- Mobile app version
- Statistics and analytics dashboard

### Technical Improvements
- Backend database for shared data
- User authentication system
- API for external integrations
- Progressive Web App features
- Offline functionality

## Support 💬

### Getting Help
- Check browser console for errors
- Ensure JavaScript is enabled
- Try different browsers
- Clear cache and cookies

### Contributing
- Fork the project
- Make improvements
- Share with the community
- Report bugs and suggestions

## License 📄

This project is open source and available under the MIT License. Feel free to modify and distribute for your guild's use!

---

**Good luck with your predictions! May your specs be meta! 🍀⚔️**

*Built with ❤️ for the WoW community* 