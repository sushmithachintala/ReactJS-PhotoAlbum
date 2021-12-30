# Test

## Challenges

### Photo album

Use:

1. ReactJS
2. Your favourite tools for state management, UI framework and HTTP requests
3. JSON Placeholder (https://jsonplaceholder.typicode.com/guide/) as a data source

Implement a photo album which reads the items from https://jsonplaceholder.typicode.com/albums/1/photos

Render the photos in a 12 column grid for desktop or 2 column on Mobile devices (you choose the breakpoint or rely on your framework)

When a photo is clicked, change view to display just that image filling the browser window, and allow the user to swipe between images (or click a corresponding arrow)

When a user is on a single photo and copies the browser url, sharing it with another user, the second user should see the same photo as the first.

### Uploader

Display a form, with a single file input field which uploads files to s3 (you will need your own amazon account)

Accept mp4 video files up to 50MB. Display an error to the user if the file is over 50MB. Display a progress bar during upload.

### Authentication UX

Given an application which has many API calls which require authentication and therefore may at any point return Unauthorized (401), how would you structure your UI code so that the user will always be redirected to the login page if this occurs? Please sketch an example - feel free to build upon the photo album case from above.

## Submitting your answer

1. Checkout this repository
2. Make a new branch for your work
3. Submit a pull request with your submission
4. Email us a link to the pull request

## Tips

- Automated tests are fundamental to successful software projects (we expect to see some)
- Using libraries, frameworks, and copied examples is fine, but you will be expected to explain your choices. So if in doubt, it may for example, be better to use your own implementation than using a library you do not fully understand.
- Linting and other checks are up to you....
