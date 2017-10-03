import { useStrict } from 'mobx';
import config from './config';
import redditStore from './redditStore';
import reddits from './reddits';
import post from './post';

useStrict(true);

const store = {
  config,
  reddits,
  redditStore,
  post,
};
export default store;
