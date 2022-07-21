# Scheduler

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 14.0.2.

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The application will automatically reload if you change any of the source files.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via a platform of your choice. To use this command, you need to first add a package that implements end-to-end testing capabilities.

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI Overview and Command Reference](https://angular.io/cli) page.

Problems faced:

Problem 1:
- Icon or any Module does not show on HTML 
Answer 1:
- add a "<div>"

Problem:
- Get data from nested JSON
Solution:
- https://stackoverflow.com/questions/45712214/angular2-get-nested-json-data

- Only accepts specific value in interface
- https://bobbyhadz.com/blog/typescript-allow-specific-strings


Hover Effect
https://codepen.io/samishchandra/pen/ANgOKb

https://codepen.io/ycw/pen/gqYEeY

https://codepen.io/wal_toor/pen/JvRyvv

https://stackoverflow.com/questions/69128548/css-on-hover-image-half-slide-up


Time Difference
https://stackoverflow.com/questions/27561809/difference-between-two-times-in-am-pm-format-in-javascript

Uses for Span
https://stackoverflow.com/questions/18521152/how-to-set-two-different-font-sizes-in-the-same-p

Host angular on AWS
https://www.youtube.com/watch?v=23UepoxHT_c&ab_channel=CloudGuru

JSON Serverless Restful API
https://github.com/pharindoko/json-serverless

AWS Tutorial for creating REST API
https://docs.aws.amazon.com/apigateway/latest/developerguide/api-gateway-create-api-from-example.html

JSON splice to remove array
https://love2dev.com/blog/javascript-remove-from-array/

//Connect to AWS

    //Deploy HTML website on AWS S3
    https://www.youtube.com/watch?v=TLwMumqyGEQ&t=339s&ab_channel=JavaTechie 

    //Setting up AWS Lambda and AWs API Gateway
    https://www.youtube.com/watch?v=X5dM2rlOKfw&t=0s&ab_channel=CompleteCoding

    //Setting up AWS DynamoDB
    https://www.youtube.com/watch?v=pp-5u6LB9K8&ab_channel=CompleteCoding

    //Get all items from AWS DynamoDB
    https://stackoverflow.com/questions/10450962/how-can-i-fetch-all-items-from-a-dynamodb-table-without-specifying-the-primary-k

    //Routing issue (Error when page is routed)
    https://www.youtube.com/watch?v=LLhAuUM0iU0&t=906s&ab_channel=AngularKenya

    //My Code in Lambda Function
    const aws = require('aws-sdk');
    const dynamo = new aws.DynamoDB.DocumentClient();

    exports.handler = async (event) => {
        // TODO implement

        var params = {
            TableName: "timeslots", // give it your table name 
        };

        const record = await dynamo.scan(params).promise();


                
        const response={
            statusCode:200,
        body:JSON.stringify(record.Items),
        };
        return response;

                
    };

//Filter OR Query format for AWS API Gateway
https://stackoverflow.com/questions/56501637/aws-lambda-and-dynamo-db-how-to-filter-the-result-of-scan-by-multiple-parameter

//Website hosting
https://adamtheautomator.com/aws-s3-static-ssl-website/#Prerequisites

//Scale entire website with css
https://stackoverflow.com/questions/1156278/how-can-i-scale-an-entire-web-page-with-css