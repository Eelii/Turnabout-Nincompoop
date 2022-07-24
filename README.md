# Turnabout Nincompoop

Turnabout Nincompoop is an attorney simulator in which you, hereinafter referred to as "the user", will use their carefully prepared notes to make coherent arguments and advocate for their clients' innocence. 

During court, if the user has boosted their avatar's confidence to the maximum by verbally abusing the prosecution, the user can OBJECT to any single wrong they deem an injustice. This will enable the user's avatar to act more smug and stop the flow of time.

After complex legal analysis a verdict will be passed. The user's client will then be sentenced guilty or not guilty based on including, but not limited to how many times Orla the Orca isn't mentioned. 

Having got a guilty or non guilty verdict, the user is highly encouraged to properly sign a legal document consisting of multiple sections of Lorem Ipsum. By submitting their document, the user will become a certified Nice Attorney™ and get an access to an exclusive database front-end view listing previous users' amazing accomplishments.
<br/>
<br/>

<img src="https://github.com/Eelii/Turnabout-Nincompoop/blob/main/screenshots/court2.PNG" alt="screenshot2" width="1000"/>

## Behind the scenes

Turnabout Nincompoop includes a backend and a frontend. The frontend is built on React with mulitple React libraries and frameworks:

| Library | Use |
|:-------------|:-------------|
| [Mantine](https://reactnative.dev/) |UI components|
| [Redux](https://redux.js.org/) & [react-redux](https://react-redux.js.org/) |State management|
| [AG Grid (React)](https://www.npmjs.com/package/ag-grid-react) |Data grid|
| [Tabler Icons](https://tablericons.com/) |Icons|
| [react-spring](https://react-spring.dev/) |Post-it® note animations|
| [react-loading](https://www.npmjs.com/package/react-loading) |Loading animations|
| [react-use](https://www.npmjs.com/package/react-use) |Keyboard event handling|
| [use-sound](https://www.npmjs.com/package/use-sound) |Sound effects and music|
| [react-canvas-draw](https://www.npmjs.com/package/react-canvas-draw) |Signing important documents|
| [react-confetti](https://www.npmjs.com/package/react-confetti) |Confetti|
| [react-wavify](https://www.npmjs.com/package/react-wavify) |Waves|
| [react-lorem-ipsum](https://www.npmjs.com/package/react-lorem-ipsum) |Generic text generation|
| [react-slider](https://www.npmjs.com/package/react-slider) |Volume slider|
| [react-awesome-button](https://www.npmjs.com/package/react-awesome-button) |Button components|

The backend is used for storing and retrieving data from a NoSQL database (Apache CouchDB) and, more importantly, for generating all of the character dialogue. Dialogue generation is done by three different neural network language models that have been trained on character specific dialogue from all of the Ace Attorney games. Dialogue data was scraped to a CSV file using Beautiful Soup and a custom Python script. On top of the three language models used for generating dialogue, a fourth neural network (dockerized DeepMoji) is used to asses the most probable emojis for any generated text. Emojis and generated texts are then sent to the frontend where they are translated to different character animations.

## Screenshots 

<img src="https://github.com/Eelii/Turnabout-Nincompoop/blob/main/screenshots/court1.PNG" alt="screenshot1" width="600"/>
<img src="https://github.com/Eelii/Turnabout-Nincompoop/blob/main/screenshots/timeline1.PNG" alt="screenshot3" width="400"/>
<img src="https://github.com/Eelii/Turnabout-Nincompoop/blob/main/screenshots/timeline2.png" alt="screenshot4" width="400"/>


