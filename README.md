# DB Instance Stopper Using Serverless

## Summary
A mini nodeapp to Start/Stop DB on demand as well as setup scheduled instance stop cron.

## About
We often use heavy DB instances for our app with costs us a lot if left running for a complete month. I ran into such a problem while working on a project and didn't find any reliable and ready to use scheduled jobs that can turn off your DB instance.

So, this AWS lambda serverless stack was made. It currently runs the `stopDB` function in every 12 hours to shut down the RDS instance. You can change that by editing `stopDB.events.schedule` in `serverless.yaml`.

This app also provides APIs to start/stop DB instance on demand.

## Running the app

### Pre-requisites
- [Nodejs v10+](https://nodesource.com/blog/installing-node-js-tutorial-using-nvm-on-mac-os-x-and-ubuntu/) should be installed.
- AWS account with admin IAM access. Please check your IAM user has [AdministratorAccess policy](https://console.aws.amazon.com/iam/home?#/policies/arn:aws:iam::aws:policy/AdministratorAccess$jsonEditor) assigned.
- serverless should be installed using `npm i serverless -g`

### Configure Serverless

After installing serverless, you can configure serverless with below command:

```
serverless config credentials --provider aws --key <your_access_key> --secret <your_access_key_secret>
```

**Note**: If you have multiple AWS profiles in your local machine, please open `~/.aws/config` file and check which profile you want to use with `--profile` flag in above command.

### Deploy Lambda methods

Run the below commands to package the methods and deploy the stack supporting our lambda function:

```
npm i
serverless deploy
```

## Using the app

### APIs

Once you hit `serverless deploy` command, you will get the API routes printed on terminal.
You can hit following routes:
- Start the instance: `/start?instanceId=your_rds_instance_id`
- Stop the instance: `/stop?instanceId=your_rds_instance_id`

If you don't pass instanceId in query parameter, the app will take id from env variable.

### Configuring CRON to auto shut RDS instance
- It currently runs the `stopDB` function in every 12 hours to shut down the RDS instance.
- You can change that by editing `stopDB.events.schedule` in `serverless.yaml`.

## Billing considerations

Although the lambda execution charges are really less, but do consider that it would charge something to host these lambda functions per month. As per my understanding, it should not cost more than $ 2.00 / month in any AWS region even with cron rate set to once per 10 minutes.
But you can make sure to check the resources created by the cloudformation stack in your AWS console.
