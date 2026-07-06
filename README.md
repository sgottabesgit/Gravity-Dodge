# Gravity Dodge

Gravity Dodge is a simple arcade-style game built with **HTML5 Canvas**, **CSS**, **JavaScript**, and **Apache Cordova**. The objective is to survive as long as possible by dodging incoming obstacles while earning points over time.

## Features

* 🎮 Simple one-button game startup
* 🏆 Score and high score tracking
* ⚡ Adjustable ball speed
* 🚧 Adjustable obstacle speed
* 📈 Live points-per-second display
* 📱 Portrait-oriented mobile application using Apache Cordova

## Technologies Used

* HTML5
* CSS3
* JavaScript
* HTML5 Canvas API
* Apache Cordova

## Project Structure

```
.
├── config.xml          # Cordova configuration
├── index.html          # Main game interface
├── css/
│   └── styles.css      # Styling
└── js/
    └── script.js       # Game logic
```

## How to Run

### In a Web Browser

1. Clone the repository.

```bash
git clone https://github.com/yourusername/gravity-dodge.git
```

2. Open the project folder.

3. Open `index.html` in your browser.

> Some browsers may restrict local JavaScript execution. If necessary, run a simple local web server.

Example using Python:

```bash
python -m http.server
```

Then visit:

```
http://localhost:8000
```

### Using Apache Cordova

1. Install Cordova:

```bash
npm install -g cordova
```

2. Add a platform:

```bash
cordova platform add android
```

3. Build the project:

```bash
cordova build
```

4. Run on a device or emulator:

```bash
cordova run android
```

## Gameplay

1. Press **Start Game**.
2. Dodge incoming obstacles.
3. Increase or decrease the ball speed and obstacle speed using the sliders.
4. Stay alive as long as possible to earn a higher score.

## Future Improvements

* Sound effects and background music
* Multiple difficulty levels
* Power-ups
* Touch and tilt controls
* Improved graphics and animations
* Online leaderboard

## Author

Scott Bergevin

## License

This project was created for educational purposes.
