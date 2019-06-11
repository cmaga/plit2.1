---
output:
  word_document: default
  pdf_document: default
  html_document: default
---

# PLIT 2.0 manual

## Starting Up the Project

When in a developent environemtn such as a local computer use the command `npm run nodemon` which will call nodemon to automatically run the frontend and backend concurrently. To run the two manually open two terminal windows and from the outermost view of the project type `npm start` and then in the second window type the same command but from the src directory.

## Purpose

Plit is a project that contains several tools for the procurement and logistics department at the MBTA. The original PLIT was written in angular and used a MEAN stack. Plit 2.0 is the transition from angular to react.

This project is closely connect to other projects such as the pipe also known as Project-Ducktape which is how we get the data from fmis into our database.

This project mainly resides on Github because it has not been deployed to AWS.

## TroubleShooting

If the report breaks or doesn't act like its supposed to its most likely the data that has changed. The query is unlikely to change. But the uploaded is external and likely to cause any issues. We have notified Molly to be as consistent as possible but if problems do occur this is a likely source. If multiple projects break and the data wont refresh the issue most likely is with pipeline as this depends on it to update. 

## Project Strucuture

### Temporary Files

There are a few files that may show up in git as untracked under a path similar to: server/csv/temporary/909d8c7f8f0211f86c6f7bfff7b0b2c3. These files are from the EarlyWarning report and its data from the uploaded csv file. They do not matter and adding or committing these files will give you issues within git and version control.

### Testing

Testing is not being used within this project as of 6/11/2019.

### client

This is where the frontend Lives and src entirely in React with Redux.

Redux is also used. There may be data/variables that do not need to be in the Redux store but was put there for learning purposes. Feel free to refactor if needed.

authentication is used for determining if a user is allowed to view a page or not. If a route requires identifcation to be visited a component (the parent component) is passed to the Private route component in the App.js file.

The BidNumber is ready for deployment but the backend is set up so that if you add a new bid number the count for the current year will begin. That means that if it is tested before deployment to ensure that it is working properly the count will have to be adjusted and reset so that the next time a bid number is added it will start counting from one.

EarlyWarning is a report that was originally generated manually using excel and access. This report is just a view generated in a similar manner using an uploaded document that used to be done by someone name forest so this information is often referred to as forest's. The file needs to be uploaded as CSV. There is also an issue with csv/excel. When it is saved any number that starts with 0 has its zeroes removes. Excel believes they are not neccessary. This is mainly an issue with Work order numbers. The solution to this is to tell excel that the work order column contains strings not numbers and then excel will not change the data. The feature supports either a number work order or a string work order. Uploading the excel file as is will still work but for example a Work order number of 0812 will show up as 812 in the report. This is likely to cause confusion as that is not the correct work order number.

Franks Emails: This project was brought to a halt because scott wanted vendor emails to be on FMIS so that all of our data could have just one source. There are scripts on silverback that make the data pull for the items that we want to email for to follow up on. Only vendor ID is pulled. Also nodemailer was being used to send emails and they are blocked on the local network but this should not be an issue when sending emails after deployment on AWS.

[<https://provider.www.upenn.edu/computing/da/bo/webi/qna/iv_csvLeadingZeros.html]>

### `Server/`

This is the backend it is almost entirely identicle to angulars backend aside from some additions for newer features. Features that are not being used may be supported in the backend. If it exists on PLIT the backend should be the same.

### `Public/`

This is what is used for the view on PLIT most of the view has been removed since angular is not used in this project. But the backend makes use of trello cards for the trello(rubikdata3.com/trello) feature on old PLIT which was created to help ray manage work loads.

## Data origins and dependance on Ducttape

Aside from the upload the other data resides in FMIS. The early warning query is called using selenium and downloaded and then inserted into the database via python scripts. All the files needed for this data pull are referenced in the tape-early-warning.sh shell file within the ducttape folder on silverback.

For the early warning report there are two collections. forestExcel and EARLY_WARNING. forestExcel takes the uploaded file information and EARLY_WARNING takes the early warning data from fmis.

## Deployment

There are some concerns and problems that are likely to arise upon deployment. The first one being that you may want a new amazon instance.

Nodemon if you're not familiar automatically restarts the server when changes in the backend are detected. When in development on a local machine the server should be started with "nmp run nodemon" and this concurrently runs the react and express portions of the project. When deployed the server should not be started this way because there is a part of the backend that is responsible for the trello view mentiond in the Public portion of the documentation in line 40. This portion of the backend is able to rewrite a specific part of the backend that can be found in the left over public folder from angular. Nodemon detects these changes and restarts. This is not an issue in development but upon deployment would be inconvenient to users and could cause errors.

Data Origins: For development silverback was tunneled into and the data pull scripts were created. Running the early warning shell file with the options both and local ex: sh tape-early-warning.sh both local will update both the dev and prod databases and local will keep the update to silverback. This is important becuase the scripts DO NOT EXIST on ohio and the data pull is not yet automatically done by cron. This is because this project was not deployed to AWS server yet. When this happens all of the data fetching scripts should be brought over as well. Pleas see the Pipe.md documentation on pipeline before doing this to fully understand the structure of the project.

## Contact

This Project is mainly built by the co-op team of Spring 2019. Reach out to magana.c@husky.neu.edu if you have any questions
