---
output:
  word_document: default
  pdf_document: default
  html_document: default
---

# PLIT 2.0 manual

## Starting Up the Project

When in a developent environemtn such as a local computer use the command `npm run nodemon` which will call nodemon to automatically run the frontend and backend concurrently. To run the two manually open two terminal windows and from the outermost view of the project type `npm start` and then in the second window type the same command but from the client directory.

## Purpose

Plit is a project that contains several tools for the procurement and logistics department at the MBTA. The original PLIT was written in angular and used a MEAN stack. Plit 2.0 is the transition from angular to react.

This project is closely connect to other projects such as the pipe also known as Project-Ducktape which is how we get the data from FMIS into our database.

This project mainly resides on Github because it has not been deployed to AWS.

## Main Features

EarlyWarning Automation. Uploaded files should be in CSV format. Edit the column that contains `wo_nbr` to be a string rather than a number because leading 0's get removed otherwise. The report generated will still be correct if this is not done but database will have data that is wrong.
[<https://provider.www.upenn.edu/computing/da/bo/webi/qna/iv_csvLeadingZeros.html]>
To update the data coming from FMIS go to Project-Ducttape on silver box and type `sh tape-early-warning.sh both local` this will update dev and prod locally. This updates the `EARLY_WARNING` collection on silver box only.

Bid tracking. Bid Number resets each year. Note: If you test by adding a bid, reset the count collection in MongoDB Manually or the next bid created/added will have the wrong number.

Contract Tracking and number assignment.

Login/Logout system with Private routes.

## Unused/unfinished Features

The Backend was taken from PLIT and supports several features that are not being used check the backend for APIs that have already been created so avoid rewriting code.

### Franks Emails

There are 3 experimental branches titled mail.

They are all missing emails and passwords (needed to send on behalf of a user) so they should be inserted to make it work.

Frank needs to send emails to a list of vendors from a query in FMIS called `CM_PO_OPN_BY_BU_BY_DATE_FS`. This query is a copy of the main query `PO_OPN_BY_BU_BY_DATE_FS` and was created for testing purposes.

There is a script that was added to project-ducttape that gets vendor IDs from this query but not vendor emails as they are not a part of this particular query. Adding email information to the FMIS query and editing the python data insertion script to also insert the email would be a good place to pick up this project from.

These scripts while a part of ducttape are neither in the documentation nor in Ohio, nor are they handled by Cron. They reside on silverBox. Other than this they follow the conventions and structure of Project-Ducttape so reading the documentation for that Project (titled Pipe by Mickey Guo) may be helpful.

`tape-po-missing-6.sh` is the shell file that executes the corresponding selenium and data insertion scripts.

Note: The network blocks Nodemailer.

## TroubleShooting

If the report breaks or doesn't act like its supposed to its most likely the data that has changed. The query(FMIS) is unlikely to change. We have notified Molly (person who sends the excel to be uploaded) to be as consistent as possible but if problems do occur this is a likely source. The following is what the names of the Excel file (from molly) should be and if they're included in the early warning report:

| Variable Names       | Included?     |
| -------------        |:-------------:|
| wo_nbr               | yes           |
| status               | yes           |
| Project_ID           | yes           |
| Project_Name         | yes           |
| Executing_Department | yes           |
| Director             | yes           |
| Project_Manger       | yes           |
| WO_date_approved     | yes           |
| wo_descr             | no            |
| cntrc_nbr            | no            |
| grant_id             | no            |

## Project Strucuture

## Testing

Testing is not being used within this project as of 6/11/2019.

### Temporary Files

There are a few files that may show up in git as untracked under a path similar to: server/csv/temporary/909d8c7f8f0211f86c6f7bfff7b0b2c3. These files are from the EarlyWarning report and its data from the uploaded csv file. They do not matter and adding or committing these files will give you issues within git and version control.

### client

Houses frontend.

Src is React/Redux. Some Variables may not need to be in Redux but were placed there for learning purposes if a refactor is need feel free.

### `Server/`

This is the backend it is almost entirely identicle to angulars backend aside from some additions for newer features. Features that are not being used may be supported in the backend. If it exists on PLIT the backend should be the same.

### `Public/`

This is what is used for the view on PLIT most of the view has been removed since angular is not used in this project. But the backend makes use of trello cards for the trello(rubikdata3.com/trello) feature on old PLIT which was created to help ray manage work loads.

## Data origins and dependance on Ducttape

Aside from the upload the other data resides in FMIS. The early warning query is called using selenium and downloaded and then inserted into the database via python scripts. All the files needed for this data pull are referenced in the tape-early-warning.sh shell file within the ducttape folder on silverback.

For the early warning report there are two collections. forestExcel and EARLY_WARNING. forestExcel takes the uploaded file information and EARLY_WARNING takes the early warning data from fmis.

## Deployment

Do not use nodemon when deploying it causes too many server restarts that we don't want once the site is live.

## Contact

This Project is mainly built by the co-op team of Spring 2019. Reach out to magana.c@husky.neu.edu if you have any questions
