# PREVIEW URL:
https://jeanox.github.io/react-infinite-cards

# Elder Scrolls Legends via React.js

This is a React.js application for browsing cards from Elder Scrolls Legends. Requirements for this project include:

- Tapping into the Elder Scrolls Legends API
- Allowing users to browse via Infinite Scroll
- Allowing users to Search

## Installation
- Clone the repo in your terminal by clicking the _green_ clone or download button at the top right and copyin the url
- In your terminal, type ```git clone URL```
  - replace URL with the url you copied
  - hit enter
- This will copy all the files from this repo down to your computer
- In your terminal, cd into the directory you just created
- Type ```npm install``` to install all dependencies
- Last, but not least, type ```npm start``` to run the app locally.

## CAPTAIN'S LOG (a progressive view of how I approached building this)
KEY:
- √ completed
- ! encountered a problem
- ? further development/research
- & approaches that were abandoned

 √ TODO(1): limiting the number of API results firing on load to 20; URL params aren't working in the app, but are in postman
  - √ There was a second param to setEffect that needed adding.

 √ TODO(2): Handle results loading vs End Message
  - √ empty term fires END message 
  - √ invalid term fires END message
  - √ valid term loads results
  - ! scrolling to the end of a limited result range, the loading icon still appears (creating new TODO)

 √ TODO(3): Create an input that passes a param to the query

 √ TODO(4): Have that query passed into the rendered gallery

 √ TODO(5): Rendering of the gallery needs to be managed (load, input)
  - ! Simply updating the query isn't enough, since that would append results rather than replace them
    - √ Try conditionals to track what's happening and wipe the gallery & re-render if the input is updated

 √ TODO(6): Fix the loading icon appearing when a user scrolls to the end of results
  - √ Just needed a modulo; stuff below were initial thoughts that I didn't end up pursuing
    - & Is there a way to check if the query is returning derpy? That could be a convenient solution.
    - & (need to get total number of page results)
      - & Total # of pages (don't have)
      - & currentPage (do have)
      - & if currentPage + 1 > total, return false

 √ TODO(7): Make it PRETTY! :D
  - √ That was relaxing/satisfying
  - ? I'm intrigued by the potential of using css classes dynamically in the JS, but am already throwing myself into scss land. I'd rather pick one strategy than split hairs, but I want to do more research on this.

 √ TODO(8): Review naming conventions
  - √ BEM standards in scss
  - √ JS vars/funcs/Comps

 √ TODO( LAST ): Review and document the top portion of this README and review comments


## Additional Improvements
There were things I thought of that I was unable to get to. Let's document them for future ambitions.

- Utilize debounce to limit calls to the API on search input. It fires with every entry, which makes me cry. This was attempted, but removed mid-development to eliminate variables while debugging.
- If a user types in a search query, then erases everything, the cards should go back to their initial state. This is likely due to how the query is being triggered specifically.
- Color maps could be utilized in colors.scss. It's something I like to do to establish color relationships. It also has the bonus of keeping things organized and, in the long term, is easier to keep color scope small.
- Fading the cards in on load one by one is something I really wanted, but I needed to focus on the core requirements rather than get caught up in shiny things.
- Sort Feature. I'm a big fan of effects like Isotope, it would be really interesting to filter by type or deck. Again. Shiny features. Way out of scope for this, but it's where my heart longs to be.
- Continuous Integration. I started this off working through a Docker -> Git -> Circle CI -> AWS deployment in mind. It's been a workflow I've been chipping away at before all this in my spare time. It was clear I was spending too much time on ironing this deployment pipeline out rather than the task, so I had to put my toys away. I'd really like to resume that, though, so remnant files remain.
