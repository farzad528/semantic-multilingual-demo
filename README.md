# Azure Cognitive Search - Semantic search Multilingual Demo
**DISCLAIMER: This app is not for production use and is strictly for customers to demo how to search over multilingual search indexes using Semantic search.**

This is a repository built with NextJS that provides a user-friendly interface for querying a multilingual index with semantic search. The goal of this project is to make it easier for users to find the information they need, no matter what language they speak or what type of search they perform.

You can find a live demo [here](https://semantic-search-demo-web.azurewebsites.net/)

## Features
- User-friendly interface for querying a multilingual index
- Language selection 
- Semantic search, making it easier for users to find relevant information
- Built with NextJS and Tailwind CSS for fast and efficient performance


## Getting Started
### Prerequisites
- Azure Cognitive Search Service (S1 or greater)
- Enrolled in a Semantic Plan
- Semantic Configuration's for each language you wish to search
- Multilingual fields (e.g. title_en, content_en, title_fr, content_fr); See [Create an index for multiple languages in Azure Cognitive Search](https://learn.microsoft.com/en-us/azure/search/search-language-support)
- Node (I'm using version 16.x)

Once you've met all the pre-requisites, you'll need to follow these steps:
1. Clone this repository to your local machine using ```git clone https://github.com/farzad528/semantic-multilingual-demo.git```
2. Change into the newly created directory using ```cd [your directory here]```
3. Install the required dependencies by running ```npm install``` or ```yarn install```
4. Configure variables
    4.1 Create a .env file in the folder root with the following info:
    ```
    SERVICE_NAME=your-search-service-name
    API_KEY=your-api-key
    INDEX_NAME=your-index-name
    API_VERSION=2021-04-30-preview
    ```
**Note:** you must use the 2021-04-30-preview version or greater to use the Semantic search features.
5. Start the development server by running ```npm run dev``` or ```yarn dev```.
6. Open your browser to http://localhost:3000 to view the user interface for querying the multilingual index with semantic search.

## Conclusion
I hope you find this repository useful for querying your multilingual index with semantic search. If you have any questions or suggestions, please feel free to open an issue and I'll be happy to help.
## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js/) - your feedback and contributions are welcome!

For additional links, please visit the list of available query languages: [List of supported languages for Semantic search](https://learn.microsoft.com/en-us/rest/api/searchservice/preview-api/search-documents#querylanguage)

## Contributing
If you'd like to contribute to this repository, please feel free to do so! There are many ways to contribute, such as fixing bugs, improving the documentation, or adding new features. To get started, simply fork this repository and make your changes. When you're ready, submit a pull request and I'll take a look.

## Conclusion
I hope you find this repository useful for querying your multilingual index with semantic search. If you have any questions or suggestions, please feel free to open an issue and I'll be happy to help.
## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js/) - your feedback and contributions are welcome!

For additional links, please visit the list of available query languages: [List of supported languages for Semantic search](https://learn.microsoft.com/en-us/rest/api/searchservice/preview-api/search-documents#querylanguage)
