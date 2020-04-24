# HIGHSPOT Coding Challenge
- API
- Infinite Scroll
- Search

# FRAMEWORK
- framework: React

# DEPENDENCIES
- react-infinite-scroll-component
- axios

# CAPTAIN'S LOG
√ TODO(1): limiting the number of API results firing on load to 20; URL params aren't working in the app, but are in postman
  √ There was a second param to setEffect that needed adding.

√ TODO(2): Handle results loading vs End Message
  √ empty term fires END message 
  √ invalid term fires END message
  √ valid term loads results
  ! scrolling to the end of a limited result range, the loading icon still appears

- TODO(3): Fix the loading icon appearing when a user scrolls to the end of results
  - Is there a way to check if the query is returning derpy? That could be a convenient solution.
  - (need to get total number of page results)
    - Total # of pages (don't have)
    - currentPage (do have)
    - if currentPage + 1 > total, return false

√ TODO(3): Create an input that passes a param to the query
√ TODO(4): Have that query passed into the rendered gallery

- TODO(5): Rendering of the gallery needs to be managed (load, input)
  ! Simply updating the query isn't enough, since that would append results rather than replace them
    - Try conditionals to track what's happening and wipe the gallery & re-render if the input is updated
      - Probably a matter of tracking State, actually

- TODO(?): If the input is empty, it should switch to default scroll/browsing

- TODO(?): Make it PRETTY! :D