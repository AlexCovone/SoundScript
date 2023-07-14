# SoundScript - Breaking the Language Barrier

SoundScript is a full stack web application built for the non-profit Be the Change Generation. 

The application addresses the language barrier and enables seamless communication across languages by transcribing spoken words into text in the user's desired language.

**Live Website:** [Coming Soon]

![Feature Section for SoundScript](https://github.com/AlexCovone/SoundScript/assets/98838825/cec3079a-179a-4120-8188-f2851c349065)

## How It's Made

**Tech Used:** JavaScript, Node.js, Microsoft Cognitive Services, Express, MongoDB, EJS, TailwindCSS, Passport.js.

SoundScript's codebase is structured using the Model-View-Controller architecture paradigm. 

### **Translation** 

SoundScript leverages the capabilities of Microsoft Azure Cognitive Services to enhance its translation capabilities.

Users are able to select from 15 languages for their desired translation. Through the integration of Microsoft Azure Cognitive Services, the spoken words are instantly translated into the target language text, ensuring seamless and accurate real-time translation.

The application offers a selection of 15 languages for translation. By choosing the source and target languages, users can effortlessly speak in their chosen source language and witness real-time translation into the desired target language. 

For logged-in users, the application provides the ability to save translations to their personal history. This allows users to conveniently access and refer back to their translations at any time through their profile.

Saved translations will be displayed on the user's profile with key details such as the translated text, source language, target language, and the date of the translation. This allows users to easily identify and reference their saved translations with all the necessary information.

### **Registration**

![Login Page](https://github.com/AlexCovone/SoundScript/assets/98838825/927ddb3e-b8d5-4196-98e1-8ccfcd95d46d)

SoundScript is designed to be accessible to all users, regardless of whether they choose to create an account and log in or simply use the application without authentication.

For users who choose to create an account, they are presented with two authentication options:

1. Google OAuth: Users can log in using their Google account. This authentication method is implemented using Passport.js and its Google OAuth 2.0 strategy.

2. Local Strategy: Users have the option to create a local account using their email address and a custom password. This allows them to register directly with the application using their own credentials, providing a secure and personalized authentication method.

## Optimizations
As time permits, there are additional optimizations, improvements, and additional features that will be added to SoundScript. 

Additional features and optimizations include:

* Application will be migrated to a React-based framework.
* Additional authentication strategies will be implemented (e.g. Twitter, Apple, Microsoft, etc).
* Users will have the option to opt-in and showcase their translations in the 'Recent Translation' category to share their multilingual communication achievements.
* Users will be able to customize their preferred source and target languages.


## Lessons Learned
* Leverage Microsoft Azure Cognitive Services.
* Implement multi-part authentication strategies.
* Maintain consistent communication with Be the Change Generation throughout the design and development process.
* Provide detailed design briefs, including goals, and target audience.
* Consistently sought feedback from other developers in both front-end and back-end development, while actively searching for best practices.
