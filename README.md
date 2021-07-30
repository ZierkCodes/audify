# VetNet

VetNet is a messenger app made to connect veterans and engineer a social support network. Veterans all over the U.S. struggle to find adequate employment, mental health resources, housing, and other basic necessitities. With VetNet, they can find others who are able to offer help. This MVP contains the very basic features needed to get started.

### Getting Started

[Check Out VetNet Live](https://vetnet-gz.herokuapp.com/)

To get started, please visit the website above. VetNet uses the [Lighthouse API](https://developer.va.gov/), provided by VA.gov, to verify the status of our memebers. The API for this demo is currently in Sandbox mode. Please refer to the sandbox accounts when verifying.

[Sandbox Test Accounts for Veteran Verification APIs](https://github.com/department-of-veterans-affairs/vets-api-clients/blob/master/test_accounts/verification_test_accounts.md)

**Initial Planning**

This project was initially planned to be a messenger app for music enthusiasts, as evidenced by the planning materials in this [Trello board](https://trello.com/b/bIQnzJDD/audiphy-for-spotify). There were a few problems why a pivot was required, but the most important was the fundamental breakdown of Spotify's API. Since Spotify doesn't get paid for each song that is played through their API, usage is heavily discouraged. It is updated frequently to stay ahead of Passport Strategies, and new users are required to be whitelisted. I wanted to make something useful that everyone could use, so with the help of one of my veteran friends, we quickly pivoted to VetNet.

VetNet included much of the original technical design, aside from a few differences.

### Screenshots

VetNet was designed with a mobile-first approach in mind. Next steps include implementing Ionic to bring this app to native mobile platforms, which is why we started with a mobile web-app (as opposed to a desktop web-app). I also began to experiment with some accessibility features, such as large text, high contrasts, and focused outlines.

<p float="left">
<img src="https://i.imgur.com/iA9EmHK.png" width="200">
<img src="https://i.imgur.com/Gm1GpYn.png" width="200">
<img src="https://i.imgur.com/KfoHhU3.png" width="200">
<img src="https://i.imgur.com/svGre9C.png" width="200">
<img src="https://i.imgur.com/wC0SD7Y.png" width="200">
<img src="https://i.imgur.com/B2VjRI6.png" width="200">
 </p>

### Technologies Used

VetNet is a mobile web application built with:
- Node.js
- Express
- Socket.io
- Google Oauth
- VA Lighthouse API
- JavaScript

### Next Steps

Beyond the initial MVP, there are a few additional ticket items to complete before launch. These will include:
- Obtaining authorization from the VA to gain access to the live API.
- Integrating Friends and Private Messaging
- Displaying Verified Status in Chats
- Integrating Ionic into the Project to export to mobile devices.

**Known Bugs**
- Sometimes the initial custom Branch dropdown does not updated the selected branch.
- The input masking for the social security field does not work correctly.
