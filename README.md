# Chromecast Webpage Viewer

Display a full screen webpage on Chromecast

## Notes

Based off [CastHelloText-chrome](https://github.com/googlecast/CastHelloText-chrome).

Uses a proxy to allow sites which don't allow being displayed in an iframe. The html is loaded (following redirects) and the base of the iframe is set to the final url. See `proxy.php` for the code.

## Development

The `applicationId` defined within the code is for a published app which should work with all Chromecasts.
To work with this locally you can use this id but it will only work with the `receiver.html` file hosted on github pages.
To use your own receiver you need to signup to and register an app with [Google Cast SDK Developer Console](https://cast.google.com/publish/).

## TODO

- [ ] Sender
  - [ ] Display current url of Chromecast
  - [ ] Update current webpage
  - [ ] Clear webpage
- [ ] Receiver
  - [ ] Display initial page (include url of sender)
  - [ ] Listen for urls to display
  - [ ] Send current url to Receivers upon connection
  - [ ] Build URL (check for protocol)
- [ ] Catch errors
  - [ ] Some pages aren't able to be display in iframes
  - [ ] Urls which are broken
- [ ] Docs for running locally
