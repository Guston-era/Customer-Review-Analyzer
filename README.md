# Customer Review Analyzer

"Customer Review Analyzer" is a tool to analyze customers content collected via web forms .

## The key features are:

- Flexibility to add more metrics(i.e strings contained in the comments)
- Concurrency management
- Accurate analysis of comments

## Built With

- [typescript](https://www.typescriptlang.org/) for strong type-checking
- [Node](https://nodejs.org/) for providing the built in methods for file processing

### Prerequisites

The basic requirements for building the executable are:

- Have VSCode or other text editor installed. [Link to download VSCode](https://code.visualstudio.com/download)
- Have Node installed. [Link to download node](https://nodejs.org/en/download/)
- Have git installed.[Link to download git](https://git-scm.com/downloads)
- Create a github repository.

## Getting Started

To get a local copy up and running follow these simple example steps.

### Cloning the project

```
git clone  https://github.com/Guston-era/Customer-Review-Analyzer.git

```

```
cd <Your-Build-Directory>

```

## Getting the dev dependencies

To get all package modules required to build the project run:

```
npm install or `yarn`
```

## Running in dev env

To run the program in dev mode, run this command in your cli

```
npm run start:dev
```

This should print the report to the console. The report is printed twice, the first one is a quick nerdy one, the second one is the descriptive part, but they are all the same.

![image](https://user-images.githubusercontent.com/84548265/200873507-b89cb57e-b020-4b21-a343-63273ae17fce.png)


## Adding metrics
Go to the/src/constants/index.ts and add a string to the array, for the metric you want
![image](https://user-images.githubusercontent.com/84548265/200874327-f3f14c7e-01c5-4816-82d5-4ca949cb3b7e.png)



## Running in prod env

To run the program to prod, run this command in your cli

```
npm run start
```

This compiles to the build folder.

👤 **Gustone Alwanga**

- GitHub: [@githubhandle](https://github.com/Guston-era)

- LinkedIn: [LinkedIn](https://linkedin.com/in/gustone-alwanga-1a09ba14b/)

## Show your support

Give a ⭐️ if you like this project!

## Acknowledgments

Ikhokha⭐️
