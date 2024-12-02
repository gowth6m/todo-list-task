#!/usr/bin/env node
import * as cdk from 'aws-cdk-lib';
import 'source-map-support/register';

import { FrontendStack } from '../lib/frontend-stack';

const defaultAccountID = '831926597563';
const defaultRegion = 'us-east-1';
const defaultStage = 'dev';

const accountID = process.env.ACCOUNT_ID || defaultAccountID;
const region = process.env.REGION || defaultRegion;
const stage = process.env.STAGE || defaultStage;

const stackName = `FrontendStack-${stage}`;

const app = new cdk.App();
new FrontendStack(app, stackName, {
  env: {
    account: accountID,
    region: region,
  },
  stage: stage,
  stackName: stackName,
  description: `Frontend stack for ${stage} stage`,
});
