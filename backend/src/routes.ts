//importing modules
import express from 'express';
import { GameController } from './GameController';
import { onPlayerReadyController } from './actions/onPlayerReady/OnPlayerReadyController';
import { onPlayerSitController } from './actions/onPlayerSit/OnPlayerSitController';

//initiating the router
export const router = express.Router();

router.post('/', GameController.createGame);

router.post('/playerReady', (req, res) => {
  onPlayerReadyController.execute(req, res);
});

router.post('/playerSit', (req, res) => {
  onPlayerSitController.execute(req, res);
});

router.post('/playerStand', GameController.playerStand);

router.post('/playerFold', GameController.playerFold);

router.post('/playerCheck', GameController.playerCheck);

router.post('/playerCall', GameController.playerCall);

router.post('/playerRaise', GameController.playerRaise);

router.post('/test', (req, res) => {
  console.log('test');
  res.send({ title: 'GeeksforGeeks' });
});
